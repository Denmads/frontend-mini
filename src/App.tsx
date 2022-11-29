import {Flex, Box} from '@chakra-ui/react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home/HomePage'
import NotFoundPage from './pages/404/NotFoundPage'
import {ChallengesPage} from './pages/Challenges/ChallengesPage'

function App() {
  return (
    <Router>
      <Flex direction="column" height="100vh">
        <Navbar />
        <Box flexGrow="1" width="100%" mt="4.5rem">
          <Routes>
            <Route path="/challenges/*" element={<ChallengesPage />}/>
            <Route index element={<HomePage />}/>
            <Route path="*" element={<NotFoundPage />}/>
          </Routes>
        </Box>
      </Flex>
    </Router>
  )
}

export default App
