import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth, firestore } from '@/src/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/src/firebase/errors';
import { User } from 'firebase/auth';
import { setDoc, collection, doc } from 'firebase/firestore';


const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, userCred, loading, userError] = useSignInWithGoogle(auth);

    const createUserDocument = async (user: User) => {
        const userDocRef = doc(firestore, "users", user.uid);
        await setDoc(userDocRef, JSON.parse(JSON.stringify(user)));
    };

    useEffect(() => {
        if(userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred])

    useEffect(() => {
        if (userCred) {
            createUserDocument(userCred.user);
        }
    }, [userCred]);

    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2} isLoading={loading} onClick={() => signInWithGoogle()}>
                <Image src="/images/googlelogo.png" alt="google-logo" height="20px" mr={4} />
                Continue with Google
            </Button>
            <Button variant="oauth">Some other provider</Button>
            {userError && 
            <Text textAlign="center" color="red" fontSize="10pt">
                {FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text>}
        </Flex>
    )
}
export default OAuthButtons;