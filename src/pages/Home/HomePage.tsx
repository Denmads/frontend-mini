import {Center, Card, CardBody} from '@chakra-ui/react'
import Logo from '../../components/Logo'

const HomePage = () => {
  return (
    <Center h="100%">
      <Card bg="gray.100" variant="outline">
        <CardBody padding="3rem">
          <Logo size={6}/>
        </CardBody>
      </Card>
    </Center>
  )
}

export default HomePage