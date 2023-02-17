import { Community } from '@/src/atoms/communitiesAtom';
import { Post } from '@/src/atoms/postsAtom';
import { auth, firestore } from '@/src/firebase/clientApp';
import usePosts from '@/src/hooks/usePosts';
import { Stack } from '@chakra-ui/react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import PostItem from './PostItem';
import PostLoader from './PostLoader';

type PostsProps = {
    communityData: Community;
};

const Posts: React.FC<PostsProps> = ({ communityData }) => {
    // useAuthState
    const [user] = useAuthState(auth);
    const [loading, setLoading] = useState(false);
    const { postStateValue, setPostStateValue, onVote, onDeletePost, onSelectPost } = usePosts()

    const getPosts = async () => {
        try {
            setLoading(true);
            //get posts for this community
            const postsQuery = query(collection(firestore, "posts"), where("communityId", "==", communityData.id), orderBy("createdAt", "desc"));
            const postDocs = await getDocs(postsQuery);
            // Store in post state
            const posts = postDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setPostStateValue((prev) => ({
                ...prev,
                posts: posts as Post[],
            }));
        } catch (error: any) {
            console.log("getPosts error", error.message)
        }
        setLoading(false);
    };

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            {loading ? (
                <PostLoader />
            ) : (
                <Stack>
                    {postStateValue.posts.map((item, index) => (
                        <PostItem post={item} userIsCreator={user?.uid === item.creatorId} userVoteValue={undefined}
                            onVote={onVote} onSelectPost={onSelectPost} onDeletePost={onDeletePost} key={index} />
                    ))}
                </Stack>
            )}
        </>
    )
}
export default Posts;