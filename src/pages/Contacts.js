
import { FormContact } from "components/FormContact/FormContact"; 
import { ContactList } from "components/ContactList/ContactList"; 
import { SearchFilter } from "components/SearchFilter/SearchFilter"; 
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchContacts } from "redux/contactsSlice";  
import { Toaster } from 'react-hot-toast';
import { Box, Text } from "@chakra-ui/react";
import { FavoriteFilter } from "components/FavoriteFilter/FavoriteFilter";


export default function Contacts() {
    const dispatch = useDispatch();
 
    useEffect(() => {
        dispatch(fetchContacts());
    }, [dispatch]);

    return (
      <Box bg='green.100' pb={6}>
        <Text as='h1'
        fontSize={40}
        fontWeight={900} textAlign='center'
        fontFamily='cursive'
        color='#e81c8c'
        mb={7}
        pt={7}>
          Add contact
        </Text>
        <FormContact />
        <Text as='h1'
        fontSize={40}
        fontWeight={900} textAlign='center'
        fontFamily='cursive'
        color='#e81c8c'
        mb={7}
          pt={7}>Contact List</Text>
        <Box display='flex' justifyContent='center' mb={5}>
          <FavoriteFilter />
        </Box>
        <SearchFilter />
        <ContactList />
        <Toaster
          position="top-right"
          reverseOrder={false}/>
      </Box>
    )
};