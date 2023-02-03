import { ChevronDownIcon } from '@chakra-ui/icons';
import { Flex, Icon, Menu, MenuButton, MenuList, Text } from '@chakra-ui/react';
import React from 'react';
import { TiHome } from "react-icons/ti";


const Directory: React.FC = () => {

    return (
        <Menu>
            <MenuButton cursor="pointer" padding="0px 6px" borderRadius={4} mr={2} ml={{ outline: "1px solid", outlineColor: "gray.200"}} _hover={{ outline: "1px solid", outlineColor: "gray.200" }} >
                <Flex align="center"justify="space-between" width={{ base: "auto", lg: "200px"}} >
                    <Flex align="center">
                        <Icon fontSize={24} mr={{ base: 1, md: 2 }} as={TiHome} />
                        <Flex display={{ base: "none", lg: "flex"}}>
                            <Text fontWeight={600} fontSize="10pt">Home</Text>
                        </Flex>
                    </Flex>
                    <ChevronDownIcon />
                </Flex>
            </MenuButton>
            <MenuList>
                {/* <Communities /> */} Comunnities
            </MenuList>
        </Menu>
    );
};
export default Directory;