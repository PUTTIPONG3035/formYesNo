import React, { useEffect, useState } from 'react';
import HeaderWeb from './component/HeaderWeb'
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import axios from 'axios'


const Profile = () => {
    const user = {
        location: 'Thailand only',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.',
        avatarUrl: 'https://static.printler.com/cache/c/8/8/e/6/2/c88e62cb33a7b6e20b60af964d362a10883a43a1.jpg', // URL to the user's profile picture
        phone: '+66 99-999-9999',
      };
     const [name, setName] = useState('')
     const [email, setEmail] = useState('')
      const [tabValue, setTabValue] = React.useState(0);
        axios.defaults.withCredentials = true;
    
      const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
      };

      useEffect(() => {
        axios
          .get('http://localhost:3001')
          .then((result) => {
            console.log(result.data);
            if (result.data.auth === false) {
              navigate('/login');
            }
            console.log(result);
    
            const username = result.data.decodedToken.name;
            const email = result.data.decodedToken.email;
            setName(username);
            setEmail(email)
          })
          .catch((err) => console.log(err));
    
     
    
    
      }, []);


    return (
        <>
            <HeaderWeb />

            <Box sx={{ flexGrow: 1, padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card sx={{ maxWidth: 345 }}>
            <CardContent>
              <Avatar alt={user.name} src={user.avatarUrl} sx={{ width: 150, height: 150, margin: 'auto' }} />
              <IconButton>
                <EditIcon />
              </IconButton>
              <Typography variant="h5" gutterBottom>{name}</Typography>
              <Typography variant="body1" gutterBottom>Email: {email}</Typography>
              <Typography variant="body1" gutterBottom>Location: {user.location}</Typography>
              <Typography variant="body1" gutterBottom>Phone: {user.phone}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={8}>
          <Card sx={{ flexGrow: 1 }}>
            <CardContent>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="About" />
                <Tab label="Contact" />
              </Tabs>
              <Box sx={{ marginTop: 2 }}>
                {tabValue === 0 && (
                  <Typography variant="body1">{user.bio}</Typography>
                )}
                {tabValue === 1 && (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ mr: 1 }} />
                        <Typography variant="body1">{user.phone}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <EmailIcon sx={{ mr: 1 }} />
                        <Typography variant="body1">{email}</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Paper sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                        <LocationOnIcon sx={{ mr: 1 }} />
                        <Typography variant="body1">{user.location}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
        </>


    )
}

export default Profile