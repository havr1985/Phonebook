import { useDispatch } from "react-redux";
import { deleteContacts } from "redux/contactsSlice";
import { Box, Button, Card, CardBody, Text } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

export const ContactListItem = ({ contact: { name, phone, email, _id } }) => {
    const dispatch = useDispatch();
    return (
        <Card as='li' w='100%' bg='#0db59f'>
            <CardBody display='flex'  alignItems='center' justifyContent='space-between'>
                <Text color='white' fontWeight='700' fontSize={30}>NAME: {name}</Text>
                <Box display='flex' gap={40}>
                    <Text fontWeight='700' fontSize={30}>TEL: {phone}</Text>
                    <Text fontWeight='700' fontSize={30}>EMAIL: {email}</Text>
                    
                </Box>
                <Button type="button" onClick={() => dispatch(deleteContacts(_id))} colorScheme='pink'>
                        <DeleteIcon/>
                    </Button>
            </CardBody>
        </Card>
    )
}