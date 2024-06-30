
import React, { useEffect, useState } from 'react';

import HeaderWeb from './component/HeaderWeb'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import axios from 'axios';


const CreateQuestion = () => {
    const [value, setValue] = useState(0);

    const [dataQuestion, setDataQuestion] = useState([]);
    const [dataAssessment, setDataAssessment] = useState([]);
    const [condition, setCondition] = useState(true);
    const [conditionAssessment, setConditionAssessment] = useState(true);
    const [formData, setFormData] = useState({
        name: '',
        questions: [] // Initialize with an empty question
    });

    const [formDataAssessment, setFormDataAssessment] = useState({
        name: '',
        assessments: []
    })
    useEffect(() => {
        if (value == 0) {
            const name = "DragonBall"
            console.log(name)
            axios.get('http://localhost:3001/create', { params: { name } })
                .then(result => {
                    // console.log(result.data.questionData.question);
                    const dataQ = result.data.questionData.question
                    const dataA = result.data.questionData.assessment
                    setDataQuestion(dataQ)
                    setDataAssessment(dataA)

                })
                .catch(err => console.log(err));

        }


    }, [value]);


    const iconStyle = {
        fontSize: "50px",
        display: "flex",
        // margin: "auto",
        cursor: "pointer",

    };
    const iconStyleNone = {
        fontSize: "50px",
        display: "flex",
        cursor: "pointer",
        color: "grey", // Color when there is no value
    };

    const handleChangeForm = (event, index) => {
        const { value } = event.target;
        if (value) {
            setCondition(true)
        }


        setFormData(prevState => {
            const newQuestions = [...prevState.questions];
            newQuestions[index] = value; // อัปเดตคำถามที่ index ที่ระบุ
            return { ...prevState, questions: newQuestions };
        });

        console.log(formData.questions)

    };

    const handleChangeFormAssessment = (event, index) => {
        const { value } = event.target;
        if (value) {
            setConditionAssessment(true)
        } 


        setFormDataAssessment(prevState => {
            const newAssessments = [...prevState.assessments];
            newAssessments[index] = value; // อัปเดตคำถามที่ index ที่ระบุ
            return { ...prevState, assessments: newAssessments };
        });

        console.log(formDataAssessment.assessments)

    };

    const handleChangeData = (event, index) => {
        const { value } = event.target
        setDataQuestion(prevState => {

            const newQuestions = [...prevState]
            newQuestions[index] = value;
            return newQuestions;
        })
    }

    const handleChangeDataAssessment = (event, index) =>{
        const {value} = event.target
        setDataAssessment(prevState =>{
            const newAssessments = [...prevState]
            newAssessments[index] = value;
            return newAssessments;
        })
    }
    const handleSubmit = (event, nameQues) => {
        event.preventDefault();

        // ดึงข้อมูลคำถามจาก state formData

        const questionsArray = formData.questions.map(question => question.trim());
        const assessmentsArray = formDataAssessment.assessments.map(assessment => assessment.trim());

        // console.log(assessmentsArray)
        // console.log(questionsArray)

        for (let i = 0; i < questionsArray.length; i++) {
            dataQuestion.push(questionsArray[i])
        }
        for (let i = 0; i < assessmentsArray.length; i++){
            dataAssessment.push(assessmentsArray[i])
        }

        console.log(dataAssessment)

        console.log(dataQuestion)

        // สร้าง object ข้อมูลที่จะส่งไปยังเซิร์ฟเวอร์
        const formDataObject = {
            name: nameQues,
            questions: dataQuestion,
            assessments : dataAssessment
        };

        axios.post('http://localhost:3001/create', { formDataObject })
            .then(result => {
                console.log(result);
                window.location.reload();
            })
            .catch(err => console.log(err));
    };


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    const textFieldsQuestionOld = dataQuestion.map((question, index) => (
        <div key={index} style={{ display: "flex", gap: '2em' }}>
            <TextField
                fullWidth
                label={`Question ${index + 1}`}
                variant="outlined"
                value={question}
                onChange={(e) => handleChangeData(e, index)}
                required
            />

            <RemoveCircleRoundedIcon style={iconStyle} onClick={() => handleRemoveQuestion(index, "old", "Folk")} />
        </div>
    ));
    const textFieldsQuestionNew = formData.questions.map((question, index) => (
        <div key={index} style={{ display: "flex", gap: '2em' }}>
            <TextField
                fullWidth
                label={`Question`}
                variant="outlined"
                value={question}
                onChange={(e) => handleChangeForm(e, index)}
                required
            />
            <RemoveCircleRoundedIcon style={iconStyle} onClick={() => handleRemoveQuestion(index, "new", question)} />

        </div>
    ));

    const textFieldsAssessmentNew = formDataAssessment.assessments.map((assessment, index) => (
        <div key={index} style={{ display: "flex", gap: '2em' }}>
            <TextField
                fullWidth
                label={`Assessment`}
                variant="outlined"
                value={assessment}
                onChange={(e) => handleChangeFormAssessment(e, index)}
                required
            />
            <RemoveCircleRoundedIcon style={iconStyle} onClick={() => handleRemoveAssessment(index, "new", assessment)} />

        </div>
    ));


    const textFieldsAssessmentOld = dataAssessment.map((assessment, index) => (
        <div key={index} style={{ display: "flex", gap: '2em' }}>
            <TextField
                fullWidth
                label={`Assessment ${index + 1}`}
                variant="outlined"
                value={assessment}
                onChange={(e) => handleChangeDataAssessment(e, index)}
                required
            />
            <RemoveCircleRoundedIcon style={iconStyle} onClick={() => handleRemoveAssessment(index, "old", assessment)} />

        </div>
    ));
    const handleCreateQuestion = () => {
        const isAnyQuestionEmpty = formData.questions.some(question => question.trim() === '');
        console.log(isAnyQuestionEmpty)
        if (isAnyQuestionEmpty) {
            // If any question is empty, set condition to false and exit
            setCondition(false);
            return;
        }
        setFormData(prevState => ({
            ...prevState,
            questions: [...prevState.questions, ''] // เพิ่มคำถามใหม่เข้าไปใน array
        }));
    };

    const handleError = () => {
        console.log("don't have word")
    }


    const handleRemoveQuestion = (index, year, question) => {
        if (year === "old") {

            setDataQuestion(prevState => {
                const newDataQuestion = [...prevState];
                newDataQuestion.splice(index, 1);
                console.log(newDataQuestion)
                return newDataQuestion;
            });
            // Update textFieldsQuestionOld here (e.g., using filter)
        } else {
            setFormData(prevState => {
                const newQuestions = [...prevState.questions];
                newQuestions.splice(index, 1);
                console.log(newQuestions)
                return { ...prevState, questions: newQuestions };
            });
            setCondition(true)
            // Update textFieldsQuestionNew here (e.g., using filter)
        }
    };

    const handleRemoveAssessment = (index, year, assessment) => {
        if (year === "old") {

            setDataAssessment(prevState => {
                const newDataAssessment = [...prevState];
                newDataAssessment.splice(index, 1);
                console.log(newDataAssessment)
                return newDataAssessment;
            });
            // Update textFieldsQuestionOld here (e.g., using filter)
        } else {
            setFormDataAssessment(prevState => {
                const newDataAssessment = [...prevState.assessments];
                newDataAssessment.splice(index, 1);
                return { ...prevState, assessments: newDataAssessment };
            });
            // Update textFieldsQuestionNew here (e.g., using filter)
            setConditionAssessment(true)

        }
    }


    const handleCreateAssessment = () => {
        const isAnyAssessmentEmpty = formDataAssessment.assessments.some(assessment => assessment.trim() === '');
        console.log(isAnyAssessmentEmpty)
        if (isAnyAssessmentEmpty) {
            // If any question is empty, set condition to false and exit
            setConditionAssessment(false);
            return;
        }

        setFormDataAssessment(prevState => ({
            ...prevState,
            assessments: [...prevState.assessments, ''] // เพิ่มคำถามใหม่เข้าไปใน array
        }));

    }



    return (
        <>
            <HeaderWeb />
            <Grid container spacing={0} style={{}}>
                <Grid item xs={12}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="DragonBall" />
                        <Tab label="REBORN" />
                        <Tab label="SENSAIYA" />
                    </Tabs>
                </Grid>
                <Grid item xs={12}>
                    <Typography component="div" role="tabpanel" hidden={value !== 0}>
                        <Box p={3} sx={{ justifyContent: 'space-between' }}>
                            <form onSubmit={(e) => handleSubmit(e, "DragonBall")} style={{ display: 'flex', gap: '20px', width: '100%' }}>
                                <Box sx={{ width: '50%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 'auto', padding: '50px' }}>
                                        {textFieldsQuestionOld}
                                        {textFieldsQuestionNew}
                                        <Box sx={{ display: 'flex', margin: 'auto' }}>
                                            <AddCircleRoundedIcon style={condition ? iconStyle : iconStyleNone} onClick={condition ? handleCreateQuestion : handleError} />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ width: '50%' }}>
                                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: 'auto', padding: '50px' }}>
                                        {textFieldsAssessmentOld}
                                        {textFieldsAssessmentNew}

                                        <Box sx={{ display: 'flex', margin: 'auto' }}>
                                            <AddCircleRoundedIcon style={conditionAssessment ? iconStyle : iconStyleNone} onClick={conditionAssessment ? handleCreateAssessment : handleError} />
                                        </Box>
                                    </Box>
                                </Box>
                            </form>

                            {/* Place the Submit button outside the form */}
                            <Button type="submit" variant="contained" color="primary" onClick={(e) => handleSubmit(e, "DragonBall")} style={{ margin: 'auto', display: 'flex', fontSize: '20px' }}>
                                Submit
                            </Button>
                        </Box>




                    </Typography>
                    <Typography component="div" role="tabpanel" hidden={value !== 1}>
                        <Box p={3}>
                            Tab 2 content
                        </Box>
                    </Typography>
                    <Typography component="div" role="tabpanel" hidden={value !== 2}>
                        <Box p={3}>
                            Tab 3 content
                        </Box>
                    </Typography>
                </Grid>
            </Grid>

        </>
    )
}

export default CreateQuestion