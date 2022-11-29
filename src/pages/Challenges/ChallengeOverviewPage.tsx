import React from 'react'
import {Heading, Divider, VStack, Wrap, WrapItem} from '@chakra-ui/react';
import ChallengeCard from '../../components/ChallengeCard';

interface ChallengeInfo {
    url: string;
    header: string;
    description: string;
}

const challenges: {[name: string]: ChallengeInfo[]} = {
    "Util": [
        {url: "?", header: "Counter", description: "A simple counter which can be used to count up and down."} ///challenges/counter
    ]
}

const ChallengeOverviewPage = () => {
  return (
    <VStack padding="1rem">
        {Object.keys(challenges).map(group => <VStack key={group} alignItems="flex-start" spacing="1rem" width="100%">
            <Heading as="h3" color="blue.700">{group}</Heading>
            <Divider />
            <Wrap spacing="2rem" width="100%" justify={["center", null, "start"]}>
                {challenges[group].map(info => <WrapItem key={info.url} padding="0.5rem">
                    <ChallengeCard to={info.url} isPlanned={info.url === "?"} header={info.header} description={info.description}/>
                </WrapItem>)}
            </Wrap>
        </VStack>)}
    </VStack>
  )
}

export default ChallengeOverviewPage