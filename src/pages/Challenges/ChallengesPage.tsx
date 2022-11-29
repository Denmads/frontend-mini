import React from 'react'
import ChallengeOverviewPage from './ChallengeOverviewPage'
import {Routes, Route} from 'react-router-dom';
import Counter from './subpages/Counter';
import GuessTheNumber from './subpages/GuessTheNumber';

interface ChallengeInfo {
    url: string;
    element: JSX.Element;
    header: string;
    description: string;
}

const challenges: {[name: string]: ChallengeInfo[]} = {
    "Util": [
        {url: "counter", element: <Counter />,  header: "Counter", description: "A simple counter which can be used to count up and down."},
      ],
    "Games": [
        {url: "guessthenumber", element: <GuessTheNumber />,  header: "Guess The Number", description: "A fun game, where you try to guess the number, that the computer is thinking about."},
    ]
}

const ChallengesPage = () => {
  return (
    <Routes>
        <Route index element={<ChallengeOverviewPage />}/>
        {Object.keys(challenges).map(group => challenges[group].map(info => info.url === "?" ? <></> : <Route path={info.url} element={info.element}/>))}
    </Routes>
  )
}

export {ChallengesPage, challenges}