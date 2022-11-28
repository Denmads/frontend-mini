import {Box, HStack, Image, Link, Show, Hide, Center} from '@chakra-ui/react'
import {Link as RouteLink} from 'react-router-dom'
import Logo from './Logo'

interface Page {
    display: string,
    url: string
}

const pages: Page[] = [
    {display: "Home", url: "/"},
    {display: "Challenges", url: "/challenges"}
]

function Navbar() {
  return (
    <Box w="100%" bg="blue.100" padding="1rem">
        <HStack justifyContent="space-between" gap="5rem">
            <Logo />
            <Show above="md">
                <HStack flexGrow="1">
                    <Center flexGrow="1" gap="1rem" justifyContent="flex-start">
                        {pages.map(p => <Link color="gray.600" fontWeight="semibold" as={RouteLink} to={p.url}>{p.display}</Link>)}
                    </Center>
                    <Link href='https://github.com/Denmads/frontend-mini' isExternal>
                        <Image src="/github.png" alt="Github Repository" maxH="2.5rem"/>
                    </Link>
                </HStack>
            </Show>
            <Hide above="md">
                Test
            </Hide>
        </HStack>
    </Box>
  )
}

export default Navbar