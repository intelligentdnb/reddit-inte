import { collection, deleteDoc, doc, getDocs, query, where, writeBatch } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState, useRecoilValue } from 'recoil';
import { communityState } from '../atoms/communitiesAtom';
import { Post, postState, PostVote } from '../atoms/postsAtom';
import { auth, firestore, storage } from '../firebase/clientApp';

const usePosts = () => {
    const [user] = useAuthState(auth);
    const [postStateValue, setPostStateValue] = useRecoilState(postState);
    const currentCommunity = useRecoilValue(communityState).currentCommunity;

    const onVote = async (post: Post, vote: number, communityId: string) => {

        // check for a user => if not, open auth modal

        try {

            const { voteStatus } = post;
            const existingVote = postStateValue.postVotes.find(vote => vote.postId === post.id);

            const batch = writeBatch(firestore);
            const updatedPost = { ...post };
            const updatedPosts = [...postStateValue.posts];
            let updatedPostVotes = [...postStateValue.postVotes];
            let voteChange = vote;

            if (!existingVote) {
                // create a new postVote document
                const postVoteRef = doc(collection(firestore, "users", `${user?.uid}/postVotes`));

                const newVote: PostVote = {
                    id: postVoteRef.id,
                    postId: post.id!,
                    communityId,
                    voteValue: vote
                };

                batch.set(postVoteRef, newVote);

                //add/subtract 1 to/from post.voteStatus
                updatedPost.voteStatus = voteStatus + vote;
                updatedPostVotes = [...updatedPostVotes, newVote];

            } else { // Existing vote - they have voted on the post before

                const postVoteRef = doc(firestore, "users", `${user?.uid}/postVotes/${existingVote.id}`)

                if (existingVote.voteValue === vote) { //Removing their vote (up => neutral OR down 0> neutral)
                    //add/subtract 1 to/from post.voteStatus
                    updatedPost.voteStatus = voteStatus - vote;
                    updatedPostVotes = updatedPostVotes.filter(vote => vote.id !== existingVote.id);
                    // delete the postVote document
                    batch.delete(postVoteRef);
                    voteChange *= -1;
                } else { //Flipping their vote (up => down OR down => up)
                    // add/subtract 2 to/from post.voteStatus
                    updatedPost.voteStatus = voteStatus + 2 * vote;

                    const voteIdx = postStateValue.postVotes.findIndex(vote => vote.id === existingVote.id);

                    updatedPostVotes[voteIdx] = {
                        ...existingVote,
                        voteValue: vote,
                    };
                    //updating the existing postVote document
                    batch.update(postVoteRef, {
                        voteValue: vote,
                    });
                    voteChange = 2 * vote;
                }
            }
            // update our post document in firebase
            const postRef = doc(firestore, "posts", post.id!);
            batch.update(postRef, { voteStatus: voteStatus + voteChange });
            await batch.commit();

            // update state with updated values
            const postIdx = postStateValue.posts.findIndex(item => item.id === post.id)
            updatedPosts[postIdx] = updatedPost;
            setPostStateValue(prev => ({
                ...prev,
                posts: updatedPosts,
                postVotes: updatedPostVotes,
            }));

        } catch (error) {
            console.log("onVote error", error)
        }
    };

    const onSelectPost = () => { };

    const onDeletePost = async (post: Post): Promise<boolean> => {
        try {
            //check if image,delete if exists
            if (post.imageURL) {
                const imageRef = ref(storage, `posts/${post.id}/image`);
                await deleteObject(imageRef);
            };
            //delete post document from firestore
            const postDocRef = doc(firestore, "posts", post.id!);
            await deleteDoc(postDocRef);
            //update recoil state
            setPostStateValue(prev => ({
                ...prev,
                posts: prev.posts.filter(item => item.id !== post.id)
            }));
            return true;
        } catch (error) {
            return false;
        }
    };

    const getCommunityPostVotes = async (communityId: string) => {
        const postVotesQuery = query(collection(firestore, "users", `${user?.uid}/postVotes`), where("communityId", "==", communityId));
        const postVoteDocs = await getDocs(postVotesQuery);
        const postVotes = postVoteDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPostStateValue(prev => ({
            ...prev,
            postVotes: postVotes as PostVote[],
        }));
    };

    useEffect(() => {
        if(!user || !currentCommunity?.id) return;
        getCommunityPostVotes(currentCommunity.id);
    }, [user, currentCommunity]);

    return {
        postStateValue,
        setPostStateValue,
        onVote,
        onSelectPost,
        onDeletePost,
    };
};
export default usePosts;