const express = require('express') ; //estas 3 librerias hay que instalarlas 
const Stripe = require('stripe') ; 
const cors = require('cors') ; 

const stripe = new Stripe('sk_test_51MSSndEI5h9tDYDGhNqqMdHAvLoSAM88ej6Nn58vkfHd4PLCEaU1O3ZOuPhDpL49OPdESxF7fxfvrWgd6rcXzB5100GuJsVhk3')

const app = express() ;

// middleware

app.use(cors({origin: 'http://localhost:3000'}))
app.use(express.json())

app.post('/api/checkout2', async (req, res) => {
    console.log(req.body)
    const {id, amount} = req.body ; 

    try { 
        const payment = await stripe.paymentIntents.create({
            amount, 
            currency: 'USD', 
            description: 'Basket of products', 
            payment_method: id,
            confirm: true 
        })
        console.log(payment)
        return res.status(200).json({message: 'Successful payment'})

           } catch(error){
                    return res.json({message: error.raw.message})
    }
})


app.listen(3001, () => console.log('Server listening port', 3001)) //en que puerto se escucha el servidor