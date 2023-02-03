import { AuthModalState } from '@/src/atoms/authModalAtom';
import { auth } from '@/src/firebase/clientApp';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Flex, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';
import AuthInputs from './AuthInputs';
import OAuthButtons from './OAuthButtons';

const AuthModal: React.FC = () => {
    const [modalState, setModalState] = useRecoilState(AuthModalState);
    const [user, loading, error] = useAuthState(auth);

    const handleClose = () => {
        setModalState((prev) => ({
            ...prev,
            open: false,
        }));
    };

    useEffect(() => {
        if (user) handleClose();
    }, [user]);

    return (
        <>
            <Modal isOpen={modalState.open} onClose={handleClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textAlign="center">
                        {modalState.view === "login" && "Log In"}
                        {modalState.view === "signup" && "Sign Up"}
                        {modalState.view === "resetPassword" && "Reset password"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody display="flex" flexDirection="column" alignItems="center" justifyContent="center" pb={6}>
                        <Flex direction="column" align="center" justify="center" width="70%" >
                            <OAuthButtons />
                            <Text color="gray.500" fontWeight={700} marginBottom={3}>or</Text>
                            <AuthInputs />
                            {/* <ResetPassword /> */}
                        </Flex>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};
export default AuthModal;