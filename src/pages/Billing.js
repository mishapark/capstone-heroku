import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Container } from '@material-ui/core';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import StarIcon from '@mui/icons-material/StarBorder';
import { Divider } from '@material-ui/core';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';



function Billing() {
  
  const tiers = [
    {
      title: 'Free',
      price: '0',
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis vulputate neque a lobortis. Integer eu cursus tortor. Cras sit amet enim a lorem tempus faucibus. Vestibulum in diam feugiat, lobortis est id, tincidunt enim. Nullam euismod nisi sit amet orci mattis faucibus. Pellentesque blandit luctus semper. Sed vel feugiat mauris. Duis eget elit a enim porta elementum. Vivamus quis dolor imperdiet, euismod mauris sit amet, euismod tortor. Phasellus mattis turpis ac augue molestie facilisis.        ',
       
      ],
      buttonText: 'Sign up for free',
      buttonVariant: 'outlined',
    },
    {
      title: 'Pro',
      subheader: 'Most popular',
      price: '15',
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis vulputate neque a lobortis. Integer eu cursus tortor. Cras sit amet enim a lorem tempus faucibus. Vestibulum in diam feugiat, lobortis est id, tincidunt enim. Nullam euismod nisi sit amet orci mattis faucibus. Pellentesque blandit luctus semper. Sed vel feugiat mauris. Duis eget elit a enim porta elementum. Vivamus quis dolor imperdiet, euismod mauris sit amet, euismod tortor. Phasellus mattis turpis ac augue molestie facilisis.',
      ],
      buttonText: 'Get started',
      buttonVariant: 'contained',
    },
    {
      title: 'Enterprise',
      price: '30',
      description: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis vulputate neque a lobortis. Integer eu cursus tortor. Cras sit amet enim a lorem tempus faucibus. Vestibulum in diam feugiat, lobortis est id, tincidunt enim. Nullam euismod nisi sit amet orci mattis faucibus. Pellentesque blandit luctus semper. Sed vel feugiat mauris. Duis eget elit a enim porta elementum. Vivamus quis dolor imperdiet, euismod mauris sit amet, euismod tortor. Phasellus mattis turpis ac augue molestie facilisis.',
      ],
      buttonText: 'Contact us',
      buttonVariant: 'outlined',
    },
  ];

  return (
    <Container>
         
      <Box sx={{padding:5}}>
      <Typography variant="h6" gutterBottom sx={{'mt':5}}>
        Payment method
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardName"
            label="Name on card"
            fullWidth
            autoComplete="cc-name"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Card number"
            fullWidth
            autoComplete="cc-number"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="expDate"
            label="Expiry date"
            fullWidth
            autoComplete="cc-exp"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth
            autoComplete="cc-csc"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Remember credit card details for next time"
          />
        </Grid>
      </Grid>
      </Box>
      
    </Container>
  );
}

export default Billing