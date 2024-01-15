import { useDispatch, useSelector } from "react-redux";
import { deleteContacts, updateFavorite } from "redux/contactsSlice";
import { Box, Button, Card, CardBody, Divider, Stack, Text } from "@chakra-ui/react";
import { DeleteIcon, StarIcon } from "@chakra-ui/icons";
import { selectContacts } from "redux/contacts.selector";

export const ContactListItem = ({ contact: { name, phone, email, _id, favorite } }) => {
    const dispatch = useDispatch();
    const contacts = useSelector(selectContacts);
    let isFavorite;
    

    const handleFavoriteClick = (_id) => {
        const contact = contacts.find(
            contact => contact._id === _id
        );
        
        if (contact.favorite === false) {
             isFavorite = true;
            const newFavorite = {
                favorite: isFavorite,
            }
            dispatch(updateFavorite([_id, newFavorite]))
        }
            if (contact.favorite === true) {
               isFavorite = false;
                const newFavorite = {
                    favorite: isFavorite,
                }
                dispatch(updateFavorite([_id, newFavorite]))
            }
    }


    return (
        <Card as='li' maxW='sm' bg='#0db59f' >
            <CardBody>
                <Stack  spacing='3'>
                    <Text color='white' fontWeight='500' fontSize={20}>NAME: {name}</Text>
                
                    <Text fontWeight='500' fontSize={20}>TEL: {phone}</Text>
                    <Text fontWeight='500' fontSize={20}>EMAIL: {email}</Text>
                </Stack>
            </CardBody>
            <Divider/>
                <Box display='flex' gap={5} justifyContent='center' pt={4} pb={4}>
                <Button type="button" onClick={() => handleFavoriteClick(_id)} bg='inherit'>
                    <StarIcon color={ favorite ? 'yellow' : 'black'} fontSize={30}/>
                </Button>
                <Button type="button" onClick={() => dispatch(deleteContacts(_id))} colorScheme='pink'>
                    <DeleteIcon/>
                    </Button>
                </Box>
            
        </Card>
    )
}