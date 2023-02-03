import React from 'react';
import { authModalState } from '@/src/atoms/authModalAtom';
import { Button } from '@chakra-ui/react';
import { useSetRecoilState } from "recoil";

const AuthButtons: React.FC = () => {
    const setAuthModalState = useSetRecoilState(authModalState);
    return (
        <>
            <Button variant="outline" height="28px" margin="2px"
                display={{ base: "none", sm: "flex" }}
                width={{ base: "70px", md: "110px" }}
                onClick={() => setAuthModalState({open: true, view: "login"})}
            >
                Log In
            </Button>
            <Button height="28px" margin="2px"
                display={{ base: "none", sm: "flex" }}
                width={{ base: "70px", md: "110px" }}
                onClick={() => setAuthModalState({open: true, view: "signup"})}
            >
                Sign Up
            </Button>
        </>
    )
}
export default AuthButtons;