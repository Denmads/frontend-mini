import React from 'react'
import ChallengeOverviewPage from './ChallengeOverviewPage'
import {Routes, Route} from 'react-router-dom';
import Counter from './subpages/Counter';

const ChallengesPage = () => {
  return (
    <Routes>
        <Route index element={<ChallengeOverviewPage />}/>
        <Route path="counter" element={<Counter />}/>
    </Routes>
  )
}

export default ChallengesPage