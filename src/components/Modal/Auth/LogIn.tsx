import { AuthModalState } from '@/src/atoms/authModalAtom';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';

type LogInProps = {

};

const LogIn: React.FC<LogInProps> = () => {
    const setAuthModalState = useSetRecoilState(AuthModalState);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });

    //Firebase logic
    const onSubmit = () => {

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
                _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500",}}
                required name='email' placeholder='email' type="email" mb={2} onChange={onChange} />
            <Input fontSize="10pt" _placeholder={{ color: "gray.500" }} bg="gray.200"
                _hover={{ bg: "white", border: "1px solid", borderColor: "blue.500", }}
                _focus={{ outline: "none", bg: "white", border: "1px solid", borderColor: "blue.500",}} 
                required name='password' placeholder='password' type="password" mb={2} onChange={onChange} />
            <Button type='submit' width="100%" height="36px" mt={2} mb={2}>Log In</Button>
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
    )
}
export default LogIn;