import React,{useEffect,useContext} from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Context} from './context';

const App = () =>{

   const {state:{error},dispatch} = useContext(Context)

  useEffect(()=>{
    if(error){
      toast(error)
      dispatch({
        type:"ERROR",
        payload:null
      })
    }
  },[error,dispatch])

  return (
    <BrowserRouter>
        <Navbar />
        <ToastContainer />
        <Route component={Home} path='/' exact/>
    </BrowserRouter>
  );
}

export default App;
