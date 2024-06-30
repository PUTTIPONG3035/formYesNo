const express = require("express")
const router = express.Router();
const QuestionModel = require('../models/Question')
const FormModel = require('../models/Form')

router.get('/question', async (req, res) =>{
    const questionData = await QuestionModel.find()
    console.log(questionData)
    res.json(questionData)
})

router.get('/create', async (req, res) => {
    const {name} = req.query
    console.log(name)
    const questionData  = await QuestionModel.findOne({name})
    console.log(questionData)
    res.json({questionData})
})


router.post("/create", async (req, res) => {
    const { formDataObject } = req.body;
    const name = formDataObject.name;
    const questionNew = formDataObject.questions;
    const assessmentNew = formDataObject.assessments;
    
    try {
        let questionWord = await QuestionModel.findOne({ name });
    
        if (questionWord) {
            // Question already exists, update it
            questionWord.question = [...questionNew];
            questionWord.assessment = [...assessmentNew];
            await questionWord.save();
            res.json({ message: "Question updated successfully" });
        } else {
            // Question doesn't exist, create a new one
            const newQuestion = new QuestionModel({
                name,
                question: questionNew,
                assessment : assessmentNew
            });
            await newQuestion.save();
            res.json({ message: "Question created successfully" });
        }
    } catch (err) {
        console.error("Error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
})

    router.post("/naire", async (req, res) =>{

        const {selectedOptions, name} = req.body
        console.log(selectedOptions)
        console.log(name)
        const newForm = new FormModel({
            name,
            checked : selectedOptions
        })
        console.log(newForm)
        await newForm.save();
        res.json({message : "Created Form"})
    })

exports.router = router