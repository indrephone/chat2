import { Routes, Route} from 'react-router-dom';
import BaseOutlet from './components/outlets/BaseOutlet';

const App = () => {
   
   return (
    <Routes>
      <Route path='/' element={ <BaseOutlet/>}></Route>
     
    </Routes>
  )
}

export default App
