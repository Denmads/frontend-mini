import React, {useState} from 'react'
import {Center, Card, CardBody, CardHeader, Heading, Text, VStack, Button, Input, Flex, Box, FormControl, Switch, FormLabel, InputGroup, InputLeftAddon} from '@chakra-ui/react'

const GuessTheNumber = () => {

    const [gameStarted, setGameStarted] = useState(false);
    const [gameSettings, setGameSettings] = useState<GameSettings>({
        min: 0,
        max: 100,
        maxGuesses: -1
    });

    const startGame = (gameSettings: GameSettings) => {
        setGameSettings(gameSettings);
        setGameStarted(true);
    }

    return (
        <Center h="100%">
            {gameStarted ? 
                <PlayGame settings={gameSettings}/> :
                <NewGameForm startGame={startGame} defaultSettigns={gameSettings} />}
        </Center>
    )
}

interface NewGameProps {
    defaultSettigns: GameSettings;
    startGame: (settings: GameSettings) => void;
}

const NewGameForm = (props: NewGameProps) => {

    const [enableUpperBound, setEnableUpperBound] = useState(false);

    return (
        <Card bg="gray.100">
            <CardHeader>
                <Heading size="lg">Guess the Number</Heading>
                <Text fontWeight="semibold">New Game</Text>
            </CardHeader>
            <CardBody>
                <VStack spacing="2rem">
                    <Box>
                        <Flex direction={["column", null, "row"]} gap="1rem">
                            <InputGroup>
                                <InputLeftAddon bg="gray.300">Min</InputLeftAddon>
                                <Input bg="white" defaultValue={props.defaultSettigns.min}/>
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon bg="gray.300">Max</InputLeftAddon>
                                <Input bg="white" defaultValue={props.defaultSettigns.max}/>
                            </InputGroup>
                        </Flex>
                    </Box>
                    <Box width="100%">
                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor='guess-upper-bound' mb="0">
                                Upper bound on number of guesses?
                            </FormLabel>
                            <Switch id="guess-upper-bound" isChecked={enableUpperBound} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEnableUpperBound(event.target.checked)}/>
                        </FormControl>
                        {
                            enableUpperBound && <InputGroup width="50%">
                                <InputLeftAddon bg="gray.300">Max Guesses</InputLeftAddon>
                                <Input bg="white" defaultValue={props.defaultSettigns.maxGuesses != -1 ? props.defaultSettigns.maxGuesses : 10}/>
                            </InputGroup>
                        }
                        <Center mt="4rem">
                            <Button variant="solid" colorScheme="green">Start</Button>
                        </Center>
                    </Box>
                </VStack>

            </CardBody>
        </Card>
    )
}

interface GameSettings {
    min: number;
    max: number;
    maxGuesses: number;
}

const PlayGame = (props: {settings: GameSettings}) => {

    return (
        <></>
    )
}

export default GuessTheNumber