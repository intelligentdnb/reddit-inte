import { Button, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import { auth } from '@/src/firebase/clientApp';


const OAuthButtons: React.FC = () => {
    const [signInWithGoogle, user, loading, userError] = useSignInWithGoogle(auth);

    return (
        <Flex direction="column" width="100%" mb={4}>
            <Button variant="oauth" mb={2} isLoading={loading} onClick={() => signInWithGoogle()}>
                <Image src="/images/googlelogo.png" alt="google-logo" height="20px" mr={4} />
                Continue with Google
            </Button>
            <Button variant="oauth">Some other provider</Button>
            {userError && <Text>{userError.message}</Text>}
        </Flex>
        )
}
export default OAuthButtons;