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
      // TODO this is a placeholder and needs to access actual product and user details
      const product = {
        price: 100,
        name: "Test Product",
        image: "https://m.media-amazon.com/images/I/71Td9FZnnFL._AC_SL1010_.jpg",
        pickup: "March 1, 2022 13:00:00",
        dropoff: "March 5, 2022 14:00:00",
        location: "123 Street Toronto, ON, A1A A1A",
        notes: "Go to side of building"
    }

    const user = {
        fname: "Christine",
        lname: "Ebeo",
        email: "ce@mail.ca",
        address: "1 ABC Street, Toronto, ON, B1B B1B",
        phone: "647 123 4567"

    }

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
         <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>

        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Pricing
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. In mollis vulputate neque a lobortis. Integer eu cursus tortor. Cras sit amet enim a lorem tempus faucibus. Vestibulum in diam feugiat, lobortis est id, tincidunt enim. Nullam euismod nisi sit amet orci mattis faucibus. Pellentesque blandit luctus semper. Sed vel feugiat mauris. Duis eget elit a enim porta elementum. Vivamus quis dolor imperdiet, euismod mauris sit amet, euismod tortor. Phasellus mattis turpis ac augue molestie facilisis.


        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={4}
            >
              <Card>
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                    <Typography component="h2" variant="h3" color="text.primary">
                      ${tier.price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      /mo
                    </Typography>
                  </Box>
                  <ul>
                    {tier.description.map((line) => (
                      <Typography
                        component="li"
                        variant="subtitle1"
                        align="center"
                        key={line}
                      >
                        {line}
                      </Typography>
                    ))}
                  </ul>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Divider sx={{'mt':5}}/>
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