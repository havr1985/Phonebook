import { useDispatch } from "react-redux"
import { favoriteContacts, fetchContacts } from "redux/contactsSlice"

const { useRadio, Box, useRadioGroup, HStack } = require("@chakra-ui/react")

function RadioCard(props) {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='1px'
        borderRadius='md'
        boxShadow='md'
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}


export function FavoriteFilter () {
    const options = ['All contacts', 'Favorite contacts'];
    const dispatch = useDispatch()

    const handleChange = (value) => {
        if (value === 'Favorite contacts') {
            dispatch(favoriteContacts())
        }
        if (value === 'All contacts') {
            dispatch(fetchContacts())
        }

    }

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'All contacts',
    onChange: handleChange,
  })

  const group = getRootProps()

  return (
    <HStack {...group}>
      {options.map((value) => {
        const radio = getRadioProps({ value })
        return (
          <RadioCard key={value} {...radio}>
            {value}
          </RadioCard>
        )
      })}
    </HStack>
  )
}

