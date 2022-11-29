import React from 'react'
import {Center, VStack, Heading, Text} from '@chakra-ui/react'

const NotFoundPage = () => {
  return (
    <Center h="100%">
        <VStack>
            <Heading size="4xl" color="gray.600">404</Heading>
            <Text>You are not supposed to be here...</Text>
        </VStack>
    </Center>
  )
}

export default NotFoundPage