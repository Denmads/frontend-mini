import {Link} from 'react-router-dom';
import {Heading, Text} from '@chakra-ui/react'

const sizes = ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl"]

const Logo = (props: {size: number}) => {
  return (
    <Link to="/">
        <Heading as="h3" size={sizes[props.size]} sx={{textTransform: "uppercase", lineHeight: 1, color: "blue.700"}}>Frontend Mini</Heading>
        <Text fontSize={sizes[props.size - 1]}>By Mads Jensen</Text>
    </Link>
  )
}

export default Logo