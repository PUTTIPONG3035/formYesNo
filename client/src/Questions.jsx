
import React, {useEffect, useState} from 'react'
import HeaderWeb from './component/HeaderWeb'
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardActions, Button, Typography, CardActionArea, CardMedia } from '@mui/material';
import axios from 'axios'

const Questions = () => {
    const [questions , setQuestions] = useState([])
    const navigate = useNavigate()

    const handleLinktoCreate = () =>{
        navigate('/create')
    }

    const handleLinktoQuestionnaire = () =>{
        navigate('/naire')
    }
    

  useEffect(() =>{
        axios.get('http://localhost:3001/question')
        .then(result =>{
            setQuestions(result.data)

        })
        .catch(err =>{
            console.log(err)
        })
  }, [])
  console.log(questions)

  const card = questions.map((question, index) => (
    <div key={index} style={{ display: "flex", gap: '2em' }}>
          <Card sx={{ maxWidth: 345}} className='m-4'>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://imgsrv.crunchyroll.com/cdn-cgi/image/format=auto,width=480,height=720,fit=contain,quality=85/catalog/crunchyroll/35e4ac6339f5fdcc164160a5755790cd.jpe"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {questions[index].name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
             Example 
             <br />
             1. {questions[index].question[0]}
             <br />
             2. {questions[index].question[1]}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleLinktoQuestionnaire} >
          Choose
        </Button>
        <Button size="small" color="primary" onClick={handleLinktoCreate} >
          edit
        </Button>
      </CardActions>
    </Card>
    </div>
));
  return (
    <>
       <HeaderWeb />
      {card}
    </>
  )
}

export default Questions