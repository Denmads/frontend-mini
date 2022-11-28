import {VStack} from '@chakra-ui/react'
import Navbar from './components/Navbar'
import {BrowserRouter as Router} from 'react-router-dom'

function App() {
  return (
    <Router>
      <VStack>
        <Navbar />
      </VStack>
    </Router>
  )
}

export default App
