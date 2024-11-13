import { BrowserRouter, Route, Routes} from 'react-router-dom'
import ProtectedRoute from '../src/Components/ProtectedRoute'
import Register from "../src/Components/SignUp"
import Login from './Components/Login'
import Todo from './Components/Todo'


const App = ()=><div>
    
    <BrowserRouter>
    <Routes>
    <Route  path = "/login" element= {<Login/>}/> 
      <Route  path = "/" element= {<ProtectedRoute><Todo/></ProtectedRoute>} />
      <Route path = "/register" element ={<Register/>}/>
    </Routes>
    </BrowserRouter>
</div>

export default App