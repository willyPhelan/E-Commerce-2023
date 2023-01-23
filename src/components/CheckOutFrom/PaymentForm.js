
import { Button, CircularProgress, Divider, Typography } from '@mui/material'
import React, { useState } from 'react'
import Review from './Review'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import {actionTypes, getBasketTotal} from '../../reducer' ; 
import { useStateValue } from '../StateProvider';
import {accounting} from 'accounting';
import axios from 'axios'
import Confirmation from './Confirmation'

const stripePromise = loadStripe('pk_test_51MSSndEI5h9tDYDGgrJBNco3UmilG6hYatOrbReEaVBPvipqkyPvdzStmpFmodSDOAqyloEQDCqX4y3tZ3RiyRhm00lEoEpViU')



const CARD_ELEMENT_OPTIONS = { 
  iconStyle: 'solid',
  hidePostalCOde: true,
  style: {
      base: { 
        iconColor: 'rgb(240, 57, 122)',
        color: '#333',
        fontSize: '18px', 
        '::placeholder':{
          color: '#ccc',
        },
      },
      invalid: { 
        color: '#e5424d', 
        ':focus': {
          color: '#0323#38' 
        }
      },
  },
};

const CheckoutForm = ({backStep, nextStep}) => {

  const [{basket, paymentMessage}, dispatch] = useStateValue()  ;
  const stripe = useStripe() ; 
  const elements = useElements() ;
  const [loading, setLoading] = useState(false)

const handleSubmit = async(e) => { 
  e.preventDefault() ;

  const { paymentMethod, error} = await stripe.createPaymentMethod({
    type: 'card', 
    card: elements.getElement(CardElement)
  })

  setLoading(true) ; 
 
  if(!error) {
    const {id} = paymentMethod ; 
    try{
      const {data} = await fetch(
        'http://localhost:3001/api/checkout2', 
        {
        id: id , 
        amount: getBasketTotal(basket) * 100 
      })
      alert(data.message)
      dispatch({
        type: actionTypes.SET_PAYMENT_MESSAGE, 
        paymentMessage: data.message
      })
      if(data.message === 'Succesfull Payment') {
        dispatch({
          type: actionTypes.EMPTY_BASKET,
          basket: []
        })
      }
        elements.getElement(CardElement).clear()
        nextStep()
    }catch(error){
      console.log(error)
      nextStep()
    }
     setLoading(false)
  }
};


  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={CARD_ELEMENT_OPTIONS}/>
      <div style={{display:'flex', justifyContent:'space-between', marginTop: '1rem'}}>
      <Button variant='outlined' onClick={backStep}>Back</Button>
      <Button id='btn' onClick={nextStep} 
      disabled={!stripe}
       type='submit' 
       variant='contained' 
       color='primary' > { loading? (<CircularProgress/>) : (`Pay ${accounting.formatMoney(getBasketTotal(basket), 'US$')}`)} </Button>
      </div>
      </form>

  )
}

const PaymentForm = ({backStep, nextStep}) => {
  return (
    <div>
      <Review/>
      <Divider/>
      <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <CheckoutForm backStep={backStep} nextStep={nextStep}/>
      </Elements>
    </div>

  )
}

export default PaymentForm
