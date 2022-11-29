import React from 'react'
import {Link as RouteLink} from 'react-router-dom'
import {Card, CardBody, CardHeader, CardFooter, Divider, Text, Heading, Button, Center} from '@chakra-ui/react'

interface props {
    to?: string;
    isPlanned: boolean;
    header: string;
    description: string;
}

const ChallengeCard = (props: props) => {
  return (
      <Card minHeight="15rem" width="20rem" bg={props.isPlanned ? "gray.400" : "gray.100"}>
          <CardHeader>
            <Heading as="h3" size="lg" color={props.isPlanned ? "gray.200" : "gray.600"}>{props.header}</Heading>
            <Divider></Divider>  
          </CardHeader>
          <CardBody><Text noOfLines={5} color={props.isPlanned ? "gray.200" : "gray.600"}>{props.description}</Text></CardBody>
          {props.isPlanned ? 
            <Center padding="1rem"><Text fontWeight="bold" fontSize="lg" color="gray.600">Under Construction</Text></Center> : 
            <CardFooter>
              <RouteLink to={props.to!}><Button colorScheme="facebook" color="gray.100">Go to Challenge</Button></RouteLink>
            </CardFooter>}
      </Card>
  )
}

export default ChallengeCard