import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import { useStateValue } from './StateProvider';
import { actionTypes } from '../reducer';
import accounting from 'accounting';



const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345, 
  },
  action: {
    marginTop: '1rem',
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
  },
  cardActions: { 
display: 'flex' ,
justifyContent: 'space-between' ,
textAlign: 'center'
  },

  CardRating: {
    display: 'flex'
  }
 
  
  
}));



export default function CheckoutCard ({products: {id, name, productType, image, price, rating, description}}) {

  const classes = useStyles() ;
  const [expanded, setExpanded] = React.useState(false);
  const [{basket}, dispatch] = useStateValue() ;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const removeItem = () => dispatch({
    type: actionTypes.REMOVE_ITEM, 
    id,}
  )


  return (
    <Card className={classes.root}>
      <CardHeader 
      action={
          <Typography //Typography es un component de Material UI//
          className={classes.action}
          variant='h5'
          color='textSecondary'>
          {accounting.formatMoney(price)}
          </Typography>
        }
        title={name}
        subheader="In Stock"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="img"
        title={name}
      />

     <CardActions disableSpacing className={classes.cardActions}>
    <div className={classes.CardRating}>
          {Array(rating)
          .fill()
          .map((_,i) => (
            <p>&#11088;</p>
          ))}
          </div>

          <IconButton>
          <DeleteIcon fontSize='large' onClick={removeItem}/>
          </IconButton>

         </CardActions>
       
    </Card>
  );
} 