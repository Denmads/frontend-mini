import {useRef} from 'react';
import {Box, HStack, Image, Link, Show, Hide, Center, VStack, IconButton, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure} from '@chakra-ui/react'
import {HamburgerIcon} from '@chakra-ui/icons'
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
    const {isOpen, onOpen, onClose} = useDisclosure();
    const burgerButtonRef = useRef<HTMLButtonElement>(null);

  return (
    <Box w="100%" bg="blue.100" padding="1rem" position="fixed" zIndex="1">
        <HStack justifyContent="space-between" gap="5rem">
            <Logo size={2}/>
            <Show above="md">
                <HStack flexGrow="1">
                    <Center flexGrow="1" gap="1rem" justifyContent="flex-start">
                        {pages.map(p => <Link key={p.url} color="gray.600" fontWeight="semibold" as={RouteLink} to={p.url}>{p.display}</Link>)}
                    </Center>
                    <Link href='https://github.com/Denmads/frontend-mini' isExternal>
                        <Image src="/github.png" alt="Github Repository" maxH="2.5rem"/>
                    </Link>
                </HStack>
            </Show>
            <Hide above="md">
                <IconButton aria-label="Open burger menu" icon={<HamburgerIcon />} ref={burgerButtonRef} onClick={onOpen}/>
                <Drawer isOpen={isOpen} placement="left" onClose={onClose} finalFocusRef={burgerButtonRef} size={["full", "xs"]}>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton />
                        <DrawerHeader><Logo size={2}/></DrawerHeader>
                        <DrawerBody>
                            <VStack gap="1rem" marginTop="2rem">
                                {pages.map(p => <Link key={p.url} color="gray.600" fontWeight="semibold" as={RouteLink} to={p.url} onClick={onClose}>{p.display}</Link>)}
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Hide>
        </HStack>
    </Box>
  )
}

export default Navbar