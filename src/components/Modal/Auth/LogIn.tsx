import { authModalState } from '@/src/atoms/authModalAtom';
import { auth } from '@/src/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/src/firebase/errors';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

type LogInProps = {

};

const LogIn: React.FC<LogInProps> = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const [signInWithEmailAndPassword, user, loading, userError] = useSignInWithEmailAndPassword(auth);


    //Firebase logic
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        signInWithEmailAndPassword(loginForm.email, loginForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { //purelly tipescrit
        setLoginForm((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    return (
        <form onSubmit={onSubmit}>
            <Input fontSize="10pt" _placeholder={{ color: "gray.500" }} bg="gray.200"
                _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500", }}
                _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500", }}
                required name='email' placeholder='email' type="email" mb={2} onChange={onChange} />
            <Input fontSize="10pt" _placeholder={{ color: "gray.500" }} bg="gray.200"
                _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500", }}
                _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500", }}
                required name='password' placeholder='password' type="password" mb={2} onChange={onChange} />
            <Text textAlign="center" color="red" fontSize="10pt">
                {FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
            </Text> {/* typescript*/}
            <Button type='submit' width="100%" height="36px" mt={2} mb={2}>Log In</Button>
            <Flex justifyContent="center" mb={2}>
                <Text fontSize="9pt" mr={1}>
                    Forgot your password?
                </Text>
                <Text
                    fontSize="9pt"
                    color="blue.500"
                    cursor="pointer"
                    onClick={() => setAuthModalState((prev) => ({
                        ...prev,
                        view: "resetPassword",
                    }))}
                >
                    Reset
                </Text>
            </Flex>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>New here?</Text>
                <Text color="blue.500" fontWeight={700} cursor="pointer"
                    onClick={() => setAuthModalState((prev) => ({
                        ...prev,
                        view: "signup",
                    }))}
                >
                    SIGN UP
                </Text>
            </Flex>
        </form>
    );
};
export default LogIn;