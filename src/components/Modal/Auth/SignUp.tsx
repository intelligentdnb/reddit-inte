import { authModalState } from '@/src/atoms/authModalAtom';
import { Input, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from '@/src/firebase/clientApp';
import { FIREBASE_ERRORS } from '@/src/firebase/errors';

const SignUp: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    const [signUpForm, setSignUpForm] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    //firebase react hook
    const [createdUserWithEmailAndPassword, user, loading, userError] = useCreateUserWithEmailAndPassword(auth);

    //Firebase logic
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (error) setError("");
        if (signUpForm.password !== signUpForm.confirmPassword) {
            // set error
            setError("Passwords do not match");
            return
        }
        // passwords match
        createdUserWithEmailAndPassword(signUpForm.email, signUpForm.password);
    };

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => { //purelly tipescrit
        setSignUpForm((prev) => ({
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
            <Input fontSize="10pt" _placeholder={{ color: "gray.500" }} bg="gray.200"
                _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500", }}
                _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500", }}
                required name='confirmPassword' placeholder='confirm password' type="password" mb={2} onChange={onChange} />
                <Text textAlign="center" color="red" fontSize="10pt">
                    {error || FIREBASE_ERRORS[userError?.message as keyof typeof FIREBASE_ERRORS]}
                </Text>
            <Button type='submit' width="100%" height="36px" mt={2} mb={2} isLoading={loading}>Sign Up</Button>
            <Flex fontSize="9pt" justifyContent="center">
                <Text mr={1}>Already a readditor?</Text>
                <Text color="blue.500" fontWeight={700} cursor="pointer"
                    onClick={() => setAuthModalState((prev) => ({
                        ...prev,
                        view: "login",
                    }))}
                >
                    LOG IN
                </Text>
            </Flex>
        </form>
    )
}
export default SignUp;