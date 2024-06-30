
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';


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


const Form = () => {
    const [questions, setQuestions] = useState([]);
    const [assessments, setAssessment] = useState([]);
    const [name, setName] = useState("");

    const location = useLocation();
    const selectformData = location.state ? location.state.selectformData : null;

    useEffect(() => {

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

    console.log(selectformData)

    return (

        <TableContainer component={Paper} sx={{ border: '5px solid black' }} >
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
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

                            {assessments.map((assessment, indexA) => (
                                <TableCell scope='row' align='center' key={indexA}>
                                    <input type="checkbox" checked={selectformData[indexQ] === assessment} readOnly />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>


        </TableContainer>
    )
}

export default Form