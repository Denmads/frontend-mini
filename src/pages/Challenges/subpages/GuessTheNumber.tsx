import React, {useState, useRef, useEffect} from 'react'
import {Center, Card, CardBody, CardHeader, Heading, Text, VStack, Button, Input, Flex, Box, FormControl, Switch, FormLabel, InputGroup, InputLeftAddon, HStack, useToast, CardFooter} from '@chakra-ui/react'
import {intInput} from '../../../utilfuncs'

type GameState = "new-game" | "playing" | "ended"

const GuessTheNumber = () => {

    const [gameState, setGameState] = useState<GameState>("new-game");
    const [gameSettings, setGameSettings] = useState<GameSettings>({
        min: 0,
        max: 100,
        maxGuessEnabled: false,
        maxGuesses: 10
    });
    const [playSettings, setPlaySettings] = useState<PlaySettings>({...gameSettings, randomNumber: 0})
    const [gameStats, setGameStats] = useState<GameStats>({
        hiddenNumber: -1,
        numberOfGuesses: -1,
        won: false});

    const startGame = (gameSettings: GameSettings) => {
        setGameSettings(gameSettings);
        let num = Math.floor((Math.random() * (gameSettings.max - gameSettings.min)) + gameSettings.min);
        setPlaySettings({...gameSettings, randomNumber: num});
        setGameState("playing");
    }

    const endGame = (stats: GameStats) => {
        setGameStats(stats);
        setGameState("ended");
    }

    const reset = () => {
        setGameSettings({
            min: 0,
            max: 100,
            maxGuessEnabled: false,
            maxGuesses: 10
        });
        setGameState("new-game");
    }

    return (
        <Center h="100%">
            {gameState === "new-game" && <NewGameForm startGame={startGame} defaultSettigns={gameSettings} />}
            {gameState === "playing" && <PlayGame settings={playSettings} endGameFunction={endGame}/>}
            {gameState === "ended" && <GameEnded stats={gameStats} resetFunc={reset}/>}
        </Center>
    )
}

interface NewGameProps {
    defaultSettigns: GameSettings;
    startGame: (settings: GameSettings) => void;
}

const NewGameForm = (props: NewGameProps) => {

    const [gameSettings, setGameSettings] = useState<GameSettings>(props.defaultSettigns);
    const [enableUpperBound, setEnableUpperBound] = useState(props.defaultSettigns.maxGuessEnabled);

    const onSettingChange = (element: HTMLInputElement, setting: "min" | "max" | "maxGuesses") => {
        let val = intInput(element.value);
        if (val === undefined) element.value = gameSettings[setting] + "";
        else setGameSettings({...gameSettings, [setting]: val});
    }

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
                                <Input bg="white" defaultValue={props.defaultSettigns.min} onBlur={(event => onSettingChange(event.target!, "min"))}/>
                            </InputGroup>
                            <InputGroup>
                                <InputLeftAddon bg="gray.300">Max</InputLeftAddon>
                                <Input bg="white" defaultValue={props.defaultSettigns.max} onBlur={(event => onSettingChange(event.target!, "max"))}/>
                            </InputGroup>
                        </Flex>
                    </Box>
                    <Box width="100%">
                        <FormControl display="flex" alignItems="center">
                            <FormLabel htmlFor='guess-upper-bound' mb="0">
                                Maximum number of guesses?
                            </FormLabel>
                            <Switch id="guess-upper-bound" isChecked={enableUpperBound} onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                                                                                                                    setGameSettings({...gameSettings, maxGuessEnabled: event.target.checked});
                                                                                                                                    setEnableUpperBound(event.target.checked);
                                                                                                                                }}/>
                        </FormControl>
                        {
                            enableUpperBound && <InputGroup width="50%">
                                <InputLeftAddon bg="gray.300">Max Guesses</InputLeftAddon>
                                <Input bg="white" defaultValue={props.defaultSettigns.maxGuesses} onBlur={(event => onSettingChange(event.target!, "maxGuesses"))}/>
                            </InputGroup>
                        }
                        <Center mt="4rem">
                            <Button variant="solid" colorScheme="green" onClick={() => props.startGame(gameSettings)}>Start</Button>
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
    maxGuessEnabled: boolean;
    maxGuesses: number;
}

interface PlaySettings extends GameSettings {
    randomNumber: number;
}

interface WrongGuess {
    guess: number;
    error: "high" | "low"
}

const PlayGame = (props: {settings: PlaySettings, endGameFunction: (stats: GameStats) => void}) => {

    const toast = useToast();

    const inputRef = useRef<HTMLInputElement>(null);

    const [guess, setGuess] = useState<number | undefined>(undefined);
    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [guessLog, setGuessLog] = useState<WrongGuess[]>([]);

    const addToLog = (guessed: number) => {
        let g = {
            guess: guessed,
            error: guessed < props.settings.randomNumber ? "low" : "high"
        } as WrongGuess;
        setGuessLog([g, ...guessLog])
    }

    const guessNumber = () => {
        if (guess === undefined) return;

        if (guess < props.settings.min || guess > props.settings.max) {
            toast({
                title: "Guess Outside Range",
                status: "error",
                duration: 3000
            });
            return;
        }

        if (guess === props.settings.randomNumber) {
            let stats: GameStats = {
                hiddenNumber: props.settings.randomNumber,
                numberOfGuesses: numberOfGuesses,
                won: true
            };
            props.endGameFunction(stats);
        }
        else {
            addToLog(guess);
            setNumberOfGuesses(numberOfGuesses + 1);
            setGuess(undefined);
            inputRef.current!.value = "";
        }
    }

    const onInputChanged = (element: HTMLInputElement) => {
        let val = intInput(element.value);
        if (val === undefined) element.value = guess + "";
        else setGuess(val);
    }

    useEffect(() => {
        if (props.settings.maxGuessEnabled && numberOfGuesses === props.settings.maxGuesses) {
            let stats: GameStats = {
                hiddenNumber: props.settings.randomNumber,
                numberOfGuesses: numberOfGuesses,
                won: false
            };
            props.endGameFunction(stats);
        }
    }, [numberOfGuesses]);

    return (
        <VStack justifyContent="flex-start" height="100%" padding="2rem">
            {/* Input */}
            <Card bg="gray.100">
                <CardHeader>
                    <Heading size="lg">Guess the Number</Heading>
                    <Text>Between <b>{props.settings.min}</b> and <b>{props.settings.max}</b></Text>
                </CardHeader>
                <CardBody>
                    <HStack spacing="0">
                        <Input bg="white" borderRightRadius="0" onBlur={(event) => onInputChanged(event.target!)} ref={inputRef}/>
                        <Button variant="solid" colorScheme="teal" borderLeftRadius="0" onClick={guessNumber}>Guess</Button>
                    </HStack>
                    {props.settings.maxGuessEnabled && <Text>Guess left: {props.settings.maxGuesses - numberOfGuesses}</Text>}
                </CardBody>
            </Card>
            {/* Guess History */}
            <Card width="100%" bg="gray.100">
                <CardHeader>
                    <Heading size="md">Guess Log</Heading>
                </CardHeader>
                <CardBody>
                    <VStack spacing="1rem">
                        {guessLog.map(wg => <Text><b>{wg.guess}</b> was too <b>{wg.error.toUpperCase()}</b></Text>)}
                    </VStack>
                </CardBody>
            </Card>
        </VStack>
    )
}

interface GameStats {
    hiddenNumber: number;
    numberOfGuesses: number;
    won: boolean;
}

const GameEnded = (props: {stats: GameStats, resetFunc: ()=>void}) => {

    return (
        <Card bg="gray.100">
            <CardHeader>
                <Heading size="lg">{props.stats.won ? "Congrats you guessed the number!" : "You did not guess the number!"}</Heading>
            </CardHeader>
            <CardBody>
                <Text>The number was <b>{props.stats.hiddenNumber}</b></Text>
                <Text>You used {props.stats.won ? props.stats.numberOfGuesses + " number of guesses." : "all of you guesses."}</Text>
            </CardBody>
            <CardFooter>
                <Button variant="solid" colorScheme="teal" onClick={props.resetFunc}>Start Over</Button>
            </CardFooter>
        </Card>
    )
}

export default GuessTheNumber