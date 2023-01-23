import { Button, makeStyles } from '@material-ui/core';
import React from 'react' ; 
import accounting from 'accounting'
import { useStateValue } from './StateProvider';
import { getBasketTotal } from '../reducer';
import {Link} from 'react-router-dom' 

const useStyles = makeStyles((theme) => ({

    root: { 
        display: 'flex',
        flexDirection: 'column' ,
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '20vh'
    },
    button: { 
        marginTop: '2rem' 
    }

}))

const Total = () => {

const classes = useStyles() ;
const [{basket}, dispatch] = useStateValue() ;

    return (
        <div className={classes.root}>
            <h5> Total Items: {basket?.length}</h5>
           
            <h5> {accounting.formatMoney(getBasketTotal(basket), 'US$')}</h5>

            <Link id='lin' to='/checkout2'>
            <Button className={classes.button} variant='contained' color='secondary'>Check Out</Button>
            </Link>
        </div>

    )

}

export default Total ; 