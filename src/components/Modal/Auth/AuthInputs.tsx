import { authModalState } from '@/src/atoms/authModalAtom';
import { useRecoilValue } from "recoil";
import { Flex } from '@chakra-ui/react';
import React from 'react';
import LogIn from './LogIn';
import SignUp from './SignUp';

type AuthInputsProps = {};

const AuthInputs:React.FC<AuthInputsProps> = () => {
    const modalState = useRecoilValue(authModalState);

    return (
        <Flex>
            {modalState.view === "login" && <LogIn />}
            {modalState.view === "signup" && <SignUp />} 
        </Flex>
        )
}
export default AuthInputs;