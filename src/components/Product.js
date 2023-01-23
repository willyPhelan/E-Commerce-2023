import * as React from 'react';
import { makeStyles } from '@material-ui/core';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AddShoppingCart } from '@material-ui/icons';
import accounting from 'accounting'  ;
import { actionTypes } from '../reducer';
import { useStateValue } from './StateProvider';

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
  expand: { 
    transform: 'rotate(0deg)',
    marginLeft: 'auto' , 
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest, }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  
  
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Product({products: {id, name, productType, image, price, rating, description}}) {

  const classes = useStyles() ;
  const [{basket}, dispatch] = useStateValue() ;
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const addToBasket = () => {
    dispatch({
      type: actionTypes.ADD_TO_BASKET,
      item: {
        id: id, 
        name: name, 
        productType: productType, 
        image: image, 
        price: price, 
        rating: rating, 
        description: description, 
      }
    })
  }

  return (
    <Card className={classes.root}>
      <CardHeader 
      action={
          <Typography //Typography es un component de Material UI//
          className={classes.action}
          variant='h5'
          color='textSecondary'>
           {accounting.formatMoney(price, )}
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

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {productType}
        </Typography>
      </CardContent>

      

      <CardActions disableSpacing>

      <IconButton aria-label="add to basket">
          <AddShoppingCart  onClick={addToBasket}/>
      </IconButton>

        <IconButton aria-label="add to favorites" >
          <FavoriteIcon/>
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton>
          {Array(rating)
          .fill()
          .map((_,i) => (
            <p>&#11088;</p>
          ))}
        </IconButton>

        <ExpandMore
          expand={expanded}
           onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
           </ExpandMore>

      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>

        <CardContent>
    <Typography paragraph>{description}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}