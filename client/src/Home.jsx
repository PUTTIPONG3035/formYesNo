import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Avatar, Container,MenuItem, Tooltip, Menu, IconButton, Box, AppBar, Toolbar} from '@mui/material';
import HeaderWeb from './component/HeaderWeb';



const Home = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
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
        setName(username);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
   <HeaderWeb />
    <Card sx={{ maxWidth: 345}} className='m-4'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://static.printler.com/cache/c/8/8/e/6/2/c88e62cb33a7b6e20b60af964d362a10883a43a1.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" >
          Choose
        </Button>
      </CardActions>
    </Card>
    </>
  );
};

export default Home;
