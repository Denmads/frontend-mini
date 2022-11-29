import React from 'react'
import ChallengeOverviewPage from './ChallengeOverviewPage'
import {Routes, Route} from 'react-router-dom';
import Counter from './subpages/Counter';

interface ChallengeInfo {
    url: string;
    element: JSX.Element;
    header: string;
    description: string;
}

const challenges: {[name: string]: ChallengeInfo[]} = {
    "Util": [
        {url: "counter", element: <Counter />,  header: "Counter", description: "A simple counter which can be used to count up and down."}
    ]
}

const ChallengesPage = () => {
  return (
    <Routes>
        <Route index element={<ChallengeOverviewPage />}/>
        {Object.keys(challenges).map(group => challenges[group].map(info => <Route path={info.url} element={info.element}/>))}
    </Routes>
  )
}

export {ChallengesPage, challenges}