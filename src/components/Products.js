import * as React from 'react';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@material-ui/core';
import Product from './Product';
import products from '../Product-Data';


const useStyles = makeStyles((theme) => ({ 

    root: {
        flexGrow: 1, 
        padding: theme.spacing(3)
    },

    paper: { 
        padding: theme.spacing(2),
        textAlign: 'center', 
        color: theme.palette.text.secondary, 
    },
}))


export default function Products() {

    const classes = useStyles()

  return (
    <div className={classes.root}>

      <Grid container spacing={3}>
        {products.map(p => (
            <Grid item xs={12} sm={6} md={4} lg={3}>
            <Product key={p.id} products={p}/>
          </Grid>
        ))}
        </Grid>
    </div>
  );
}


