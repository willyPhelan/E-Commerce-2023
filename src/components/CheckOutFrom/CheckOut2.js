import { Paper, Typography } from "@mui/material";
import { makeStyles, Step, StepLabel, Stepper } from '@material-ui/core';
import { useState } from "react";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Confirmation from "./Confirmation";
import { useStateValue } from "../StateProvider";

const useStyles = makeStyles((theme) => ({ 

  appBar: { 
    position: 'relative',
},
layout: { 
    width: 'auto', 
    marginLeft: theme.spacing(2), 
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]:{
        width: 600,
        marginLeft: 'auto', 
        marginRight: 'auto'
    },
},
paper: { 
    marginTop: theme.spacing(3), 
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2) ,
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)] : {
        marginTop: theme.spacing(6),
        marginBottom: theme.spacing(6),
        padding: theme.spacing(3), 
    },
},
stepper: { 
  padding: theme.spacing(3,0,5),
},
buttons: {
  display: 'flex' ,
  justifyContent: 'flex-end',
},
button: {
  marginTop: theme.spacing(3), 
  marginLeft: theme.spacing(1)
}
}))





const CheckOut2 = () => {

  const classes = useStyles() ;
  const [{paymentMessage}, dispatch] = useStateValue()
  const steps = ['Shipping address', 'Payment details', 'Confirmation'] ;
  const [activeStep, setActiveStep] = useState(0) ;

  const nextStep = () => { 
      setActiveStep((prevActivestep) => prevActivestep + 1)
  }


  const backStep = () => { 
    setActiveStep((prevActivestep) => prevActivestep - 1)
}

const Form = () => 
  activeStep === 0 ? <AddressForm nextStep={nextStep} backStep={backStep}/> : <PaymentForm nextStep={nextStep} backStep={backStep}/>
 // componente Form dentro de ortro componente (Checkout2)

    return (
      <>
      <main  className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component='h1' variant='h4' align="center">
          Checkout
        </Typography>
        <Stepper activeStep={activeStep} className={classes.stepper}>
          {steps.map(step => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        { activeStep === steps.length ? (<Confirmation message={paymentMessage}/>) : (<Form/>)}
     
      </Paper>

     
      
        
      </main>
      </>
    )
  }
  
  export default CheckOut2