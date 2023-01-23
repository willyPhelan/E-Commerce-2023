import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { makeStyles } from '@material-ui/core';
import './Navbar.css'
import logo from '../assets/logo2.png'
import { ShoppingCart } from '@material-ui/icons';
import { Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from '../Firebase';
import { actionTypes } from '../reducer';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({ 

    root: { 
        flexGrow: 1,
        marginBottom: '7rem', 
      },
    
    menuButton: { 
        marginRight: theme.spacing(2),
    },
    grow: {
        flexGrow: 1,
    },

    button: { 
        marginLeft: theme.spacing(2), 
    },

    title: { 
        flexGrow: 1, 
    
        
    }, 

    news: {
        position: 'absolute' ,
        left: '170px', 
        padding: '1px',
        color: '#3f51b5',
        fontWeight: 'bold'

    
    },

    

    image: { 
        marginTop: '4px',
        marginRight: '10px',
        height: '4rem' ,
        width: '6rem'
    }
}))

export default function Navbar() {

const classes = useStyles() ; 
const [{basket, user}, dispatch] = useStateValue() ;
const navigate = useNavigate() ; 

const handleAuth = () => { 
  if(user) {
    auth.signOut() ; 
    dispatch({
      type: actionTypes.EMPTY_BASKET , 
      basket: [],
    })
    dispatch({
      type: actionTypes.SET_USER, 
      user: null,
    })
  navigate('/')
  }

}

  return (
    <div className={classes.root} >
    <AppBar position="fixed" id='divCont'>
    <Toolbar>
      
          <IconButton
            edge="start"
            aria-label="menu"
            color='inherit'
            className={classes.menuButton}>
            <MenuIcon />
        
          </IconButton>
        

          <div class="v-line2">
            </div>

          
          <Typography variant="h6" id='guest' className={classes.title}>
            Hello {user ? user.email : 'Guest'}
          </Typography>

          

          <div class="v-line">
            </div>

         

          
          <Link to='/'>
            <img id='img' className={classes.image} src={logo} alt='img'/>
          </Link>

            
            <IconButton aria-label='show cart items' color='inherit'>
            <Badge badgeContent={basket?.length} color='secondary'>

            <Link to='/checkout-page'>
            <ShoppingCart fontSize='large' color='primary' className='cart'/>
            </Link>

            </Badge>
            </IconButton>

            <div className={classes.button}>

          <Link className='link' to='/sign-in'>
            <Button onClick={handleAuth}  variant='outlined' color='inherit' className='btn'>
            <strong className='sign'>{user ? 'Sign Out' : 'Sign In'}</strong>
            </Button>
          </Link>

          </div>

      { /* <Link  className='link' to=''>
          <Button color="inherit" className='btn'>Login</Button>
  </Link> */}
        

        </Toolbar>
      </AppBar>
      </div>
  );
}