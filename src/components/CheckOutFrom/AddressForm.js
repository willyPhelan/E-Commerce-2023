import { Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom';
import AddressInput from './AddressInput';
import { useStateValue } from '../StateProvider'; // estas dos lineas se utilizan siempre que quiera hacer un dispatch // +++
import { actionTypes } from '../../reducer';

// voy a utilizar un hook que es necesario instalar llamado UseForm

const AddressForm = ({nextStep, backStep}) => {
  const methods = useForm() ; 
  const [{shippingData }, dispatch] = useStateValue()
  return (
    <>
      <Typography variant='h6' gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(data => {
        console.log(data) ;
        dispatch ({
          type: actionTypes.SET_SHIPPING_DATA,
          shippingData: data
        })  ;
      nextStep() ;
        

      })}>
        <Grid container spacing={3}>
          <AddressInput required name='firstName' label='First Name'/>
          <AddressInput required name='lastName' label='Last Name'/>
          <AddressInput required name='address1' label='Address'/>
          <AddressInput required name='email' label='Email Address'/>
          <AddressInput required name='city' label='City'/>
          <AddressInput required name='PostCode' label='Postal Code'/>
          
        </Grid>
        <div style={{display: 'flex', justifyContent:'space-between', marginTop:'1rem'}}>
        <Button component={Link} to='/checkout-page'>Back to Checkout Page</Button>
        <Button type='submit' variant='contained' color='secondary' >Next</Button>
        </div>
      </form>
      </FormProvider>
    </>
  )
}

export default AddressForm
