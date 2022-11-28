import {Link} from 'react-router-dom';
import {Heading, Text} from '@chakra-ui/react'

const Logo = () => {
  return (
    <Link to="/">
        <Heading as="h3" size="md" sx={{textTransform: "uppercase", lineHeight: 1, color: "blue.700"}}>Frontend Mini</Heading>
        <Text fontSize="sm">By Mads Jensen</Text>
    </Link>
  )
}

export default Logo