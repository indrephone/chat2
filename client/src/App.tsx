import { Routes, Route} from 'react-router-dom';
import BaseOutlet from './components/outlets/BaseOutlet';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Profile from './components/pages/Profile';

const App = () => {
   
   return (
    <Routes>
      
    <Route path="/login" element={<Login />}/> 
    <Route path="/register" element={<Register />}/>  

     <Route path='/' element={ <BaseOutlet/>}>
     <Route path="/profile" element={<Profile />} />
     </Route>

    </Routes>
  )
}

export default App
