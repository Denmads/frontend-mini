import React, {useState, useRef} from 'react'
import {Center, Card, CardBody, CardHeader, Heading, HStack, IconButton, Input, Grid, GridItem, InputGroup, InputLeftAddon} from '@chakra-ui/react'
import {AddIcon, MinusIcon, RepeatIcon} from '@chakra-ui/icons'

const Counter = () => {

    const [count, setCount] = useState(0);
    const [stepSize, setStepSize] = useState(1);

    const stepRef = useRef<HTMLInputElement>();
    
    const onStepSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let val = stepSize;
        try {
            val = Math.abs(parseInt(event.target.value));
            if(!isNaN(val)) {
                setStepSize(val);
            }
            else {
                val = stepSize;
            }
        }
        catch (err) {
        }
        stepRef.current!.value = val + "";
    }

    return (
        <Center h="100%">
            <Card bg="gray.100">
                <CardHeader><Heading size="lg">Counter</Heading></CardHeader>
                <CardBody>
                    <Grid gap="1rem" maxWidth="17rem"
                        gridTemplateRows="1fr 1fr" gridTemplateColumns="1fr 1fr 1fr 1fr"
                        templateAreas={`"cntDisplay cntDisplay cntDisplay reset"
                                        "step step step step"`}>
                        <GridItem area="cntDisplay">
                            <HStack spacing="0">
                                <IconButton variant="solid" colorScheme="teal" aria-label="Subtract" icon={<MinusIcon />} borderRightRadius="0" onClick={() => setCount(count - stepSize)}/>
                                <Input bg="white" borderRadius="0" width="8rem" isReadOnly value={count}/>
                                <IconButton variant="solid" colorScheme="teal" aria-label="Add" icon={<AddIcon />} borderLeftRadius="0" onClick={() => setCount(count + stepSize)}/>
                            </HStack>
                        </GridItem>
                        <GridItem area="reset" justifySelf="end">
                            <IconButton variant="solid" colorScheme="red" aria-label="Reset" icon={<RepeatIcon />} onClick={() => setCount(0)}/>
                        </GridItem>
                        <GridItem area="step">
                            <InputGroup width="auto">
                                <InputLeftAddon children='Step Size' bg="gray.300"/>
                                <Input bg="white" defaultValue={stepSize} onBlur={onStepSizeChange} ref={stepRef}/>
                            </InputGroup>
                        </GridItem>
                    </Grid>
                </CardBody>
            </Card>
        </Center>
    )
}

export default Counter