import React, { useEffect, useState } from 'react'
import HeaderWeb from './component/HeaderWeb'
import { useNavigate } from 'react-router-dom'


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';


const Narie = () => {
    const [questions, setQuestions] = useState([]);
    const [assessments, setAssessment] = useState([]);
    const [name, setName] = useState("");

    const [selectedOptions, setSelectedOptions] = useState([]);
    const navigate = useNavigate()


    const handleRadioChange = (event, questionIndex) => {
        const { name, value } = event.target;

        console.log(value)
        const newSelectedOptions = [...selectedOptions];
        newSelectedOptions[questionIndex] = value;
        setSelectedOptions(newSelectedOptions);
   
        // setSelectedOption(prevState => ({
        //     ...prevState,
        //     [questionIndex]: value
        // }));

    };

    const submitData = (e, selectedOption) => {
        console.log(selectedOption)
        axios.post('http://localhost:3001/naire', {selectedOptions, name})
        .then(result =>{
                console.log(result)
                navigate('/form', { state: { selectformData: selectedOptions } });
        }).catch(err =>{
                console.log(err.message)
        })
       
        
    }

    const cancel = () => {
        navigate('/questions')
    }

    useEffect(() => {
        setSelectedOptions(Array(questions.length).fill(''));
        axios.get('http://localhost:3001/question')
            .then(result => {
                setQuestions(result.data[0].question);
                setAssessment(result.data[0].assessment);
                setName(result.data[0].name)

            })
            .catch(err => {
                console.log(err);
            });
    }, []);


    return (
        <>
            <HeaderWeb />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Questions</TableCell>

                            {assessments.map((row, index) => (
                                <TableCell align='center' key={index}>{row}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {questions.map((row, indexQ) => (
                            <TableRow key={indexQ} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row" align='center'>
                                    {indexQ + 1}. {row}
                                </TableCell>

                                {assessments.map((row, index) => (
                                    <TableCell align="center" key={index} >
                                        <FormControlLabel style={{ marginLeft: '10px' }}
                                            value={row}

                                            control={<Radio />}

                                            checked={selectedOptions[indexQ] === row}
                                            onChange={(event) => handleRadioChange(event, indexQ)}
                                        />
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>


            </TableContainer>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1em', padding: '50px' }}>
                <Button variant="contained" onClick={(e) => { submitData(e, selectedOptions) }}>Submit</Button>
                <Button variant="contained" onClick={cancel}>Cancel</Button>
            </div>

        </>
    );
}

export default Narie;
