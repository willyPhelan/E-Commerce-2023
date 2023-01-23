import './App.css';
import Navbar from './components/Navbar'; 
import CheckoutCard from './components/CheckoutCard'
import Products from './components/Products';
import CheckoutPage from './components/CheckoutPage';
import Product from './components/Product';
import { Routes, BrowserRouter, Route } from 'react-router-dom' ;
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import { useEffect } from 'react';
import {auth} from './Firebase' ;
import { actionTypes } from './reducer';
import { useStateValue } from './components/StateProvider';

import CheckOut2 from './components/CheckOutFrom/CheckOut2'

function App() {

  const [{user}, dispatch] = useStateValue() ;

useEffect(() => { //use efect se utiliza para escuchar cambios en una variable por ejemplo un estado
auth.onAuthStateChanged((authUser) => { 
  console.log(authUser) ; 
  if (authUser) { 
    dispatch({
      type: actionTypes.SET_USER, 
      user: authUser  
    })
  }
})

}, [])

  return (

    <BrowserRouter>
    <div className="App">
     <Navbar/>

      <Routes>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/checkout-page' element={<CheckoutPage/>}/>
        <Route path='/' element={<Products/>}/>
        <Route path='/checkout2' element={<CheckOut2/>}/>
      </Routes>
     
     </div>
    </BrowserRouter>
  );
}



export default App;

