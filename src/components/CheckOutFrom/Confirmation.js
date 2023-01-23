import { Button, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Confirmation = ({message}) => {
  return (
    <React.Fragment>
      <Typography variant='h6'>Thank you for choosing us! </Typography>
    <Button component={Link} to='/' variant='outlined' type='button'>Back to Home Page</Button>
    </React.Fragment>
  )
}

export default Confirmation
