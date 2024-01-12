import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthUserData } from "redux/auth.selector";
import { logOutThunk } from "redux/authSlice";

export const UserMenu = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectAuthUserData);
    console.log(user)
    

    const onLogOut = () => {
        dispatch(logOutThunk());
    };

    return (
        <Box>
            <Flex gap={5} mb={2}>
                <Image src={user.avatarURL} alt="avatar" />
                <Flex direction={"column"}>
                <Text color='white' fontWeight='700'>Welcome, {user.name}</Text>
                    <Text color='white'>Tariff: {user.subscription}</Text>
                    <Button
                type="button"
                onClick={onLogOut}
                colorScheme='pink'
                _activeLink={{ bg: "white", color: '#e81c8c' }}
                >Log Out
            </Button>
                </Flex>
            </Flex>
            
        </Box>
        
    )
} 