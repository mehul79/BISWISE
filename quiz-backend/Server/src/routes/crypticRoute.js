import express from 'express';
import bodyParser from "body-parser";
import { authenticateToken } from '../middleware/authMiddleware.js';
import Performance from '../models/Performance.model.js';
import tempPerformance from '../models/tempPerformance.model.js';
import questions from '../../data/questions.js';

const app = express();
const router = express.Router();
app.use(bodyParser.json());
app.use(express.json()); // Enable JSON request body parsing


class QuestionNode {
    constructor(question, correctAnswer, hint) {
        this.question = question;
        this.correctAnswer = correctAnswer;
    }
};


// Create a linked list of questions
// const question1 = new QuestionNode("What is 2 + 2?", "4", "WTF Bro, Addition is the Answer!");
// const question2 = new QuestionNode("What is the capital of France?", "Paris", "OMG, City of Love");
// const question3 = new QuestionNode("What is the square root of 16?", "4", "Piii Kaaaa Chhhuuuuuuu");
// const question4 = new QuestionNode("What is the largest ocean in the world?", "Pacific Ocean", "Us bro Us");
// const question5 = new QuestionNode("What is the chemical formula for water?", "H2O", "Jal Lijiye Thak Gye Hoge");
// const question6 = new QuestionNode("What is the capital of Japan?", "Tokyo", "Drift baby");
// const question7 = new QuestionNode("What is the name of the largest mountain in the world?", "Mount Everest", "Fateh Kr");
// const question8 = new QuestionNode("What is the chemical symbol for gold?", "Au", "Jese Kutte Rote h");
// const question9 = new QuestionNode("What is the name of the largest river in the world?", "Amazon River", "Apni Dukaan");
// const question10 = new QuestionNode("What is the capital of China?", "Beijing", "Sorry Bro, Archisha ne Answer hi nhi bataya!!");


const questionArr = questions.map(q => new QuestionNode(q.question, q.correctAnswer));


const startQuizQue = [];
var startQuizIsLocked = false;

function randomQuestions(questionArr) {
    const shuffled = questionArr.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10).map(q => ({
        question: q.question,
        correctAnswer: q.correctAnswer,
        hint: null,
    }));
    // console.log(selected);
    return selected;
}

// randomQuestions(questionArr);

router.get('/startQuiz',authenticateToken, async(req, res) => {
    const req_user = req.user;
    console.log("request :",req_user._id);
    if (startQuizIsLocked) {
        startQuizQue.push(req_user);
        console.log("request qued:",req.user._id);
    }
    else{
        startQuizIsLocked = true;
        console.log("request:",req_user._id);

        const result = await startQuiz(req_user);
        res.json(result);
    }

    while (que.length > 0) {
        const next_data = startQuizQue.shift();
        const result_qued = await startQuiz(next_data);
        res.json(result_qued);
    }

    startQuizIsLocked = false;

    
  });

  async function startQuiz(req_user){
    const tempPerform = await tempPerformance.findOne({userId:req_user._id});
    const time = new Date();

    if(!tempPerform){
        await tempPerformance.create({
            userId:req_user._id,
            score:0,
            currentQuestion:0,
            timeStarted:time,
            answers:randomQuestions(questionArr),
        });
    }else{
        await tempPerformance.updateOne({userId:req_user._id},{
            score:0,
            currentQuestion:0,
            timeStarted:time,
            answers:randomQuestions(questionArr),
        });
    }

    return{ message: 'Quiz Started'};
  }

// let currentQuestion = question1; // Track the current question
const questionQue = [];
var questionIsLocked = false;

router.get('/question',authenticateToken, async(req, res) => {
    const req_user = req.user;
    if (questionIsLocked) {
        questionQue.push(req_user);
        console.log("request qued:",req.user._id);
    }
    else{
        questionIsLocked = true;
        console.log("request:",req_user._id);
        const result = await question(req_user);
        res.json(result);
    }
    while (que.length > 0) {
        const next_data = questionQue.shift();
        const result_qued = await question(next_data);
        res.json(result_qued);
    }

    questionIsLocked = false;    
  });

  async function question(req_user){
    const tempPerform = await tempPerformance.findOne({userId:req_user._id});

    if(tempPerform){
        let currentQuestion = tempPerform.currentQuestion;
        if(currentQuestion === 10){
            return { message: 'You\'ve completed the game!' };
        }else{
            return{
                question: tempPerform.answers[currentQuestion].question,
            };
        }
    }else{
        return{ message: 'Quiz not started'};
    }
  }
  
const que = [];
let isLocked = false;

router.post('/answer',authenticateToken, async(req, res) => {
    if (isLocked) {
        que.push({
            req_user:req.user,
            req_body:req.body
        });
        console.log("request qued:",req.user._id);
    }
    else{
        isLocked = true;
        console.log("request:",req.user._id);

        const result = await checkAndResolve({
            req_user:req.user,
            req_body:req.body
        });
        res.json(result);
    }

    while (que.length > 0) {
        const next_data = que.shift();
        const result_qued = await checkAndResolve(next_data);
        res.json(result_qued);
    }

    isLocked = false;
});

async function checkAndResolve(data) {
    const userAnswer = data.req_body.answer.trim(); // Get the user's answer from the request body
    const userAnswered = await tempPerformance.findOne({ userId: data.req_user._id });

    let currentQuestion = userAnswered.currentQuestion;
    const correctAnswer = userAnswered.answers[currentQuestion].correctAnswer.trim();
    const isAnswerCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase();

    try {
        const time = new Date();
        let newScore = userAnswered.score;
        if (isAnswerCorrect) {
            newScore++;
        }

        currentQuestion++; // Move to the next question

        if (currentQuestion >= userAnswered.answers.length) {
            // Quiz completed
            const timeQuizStarted = new Date(userAnswered.timeStarted);
            const timeTaken = time - timeQuizStarted;
            const seconds = Math.floor(timeTaken / 1000).toString();
            const minutes = Math.floor(seconds / 60).toString();
            const hours = Math.floor(minutes / 60).toString();
            const timeTakenStr = `${hours}:${minutes}:${seconds}`;

            await tempPerformance.findOneAndUpdate(
                { userId: data.req_user._id },
                { score: newScore, currentQuestion, timeTaken: timeTakenStr, timeFinished: time }
            );

            // Update the Performance collection
            const findPerformance = await Performance.findOne({ userId: data.req_user._id });
            if (!findPerformance) {
                await Performance.create({
                    userId: data.req_user._id,
                    score: newScore,
                    timeTaken: timeTakenStr,
                    timeFinished: time,
                });
            } else if (
                findPerformance.score < newScore ||
                (findPerformance.score === newScore && findPerformance.timeTaken > timeTakenStr)
            ) {
                await Performance.findOneAndUpdate(
                    { userId: data.req_user._id },
                    { score: newScore, timeTaken: timeTakenStr, timeFinished: time }
                );
            }

            await tempPerformance.findOneAndDelete({ userId: data.req_user._id });
            return { message: 'You\'ve completed the game!' ,score:newScore};
        } else {
            // Update tempPerformance for the next question
            await tempPerformance.findOneAndUpdate(
                { userId: data.req_user._id },
                { score: newScore, currentQuestion }
            );

            if (isAnswerCorrect) {
                return {
                    message: 'Correct answer!',
                };
            } else {
                return {
                    message: `Incorrect answer. The correct answer was "${correctAnswer}".`,
                };
            }
        }
    } catch (err) {
        console.error(err);
        return { message: 'An error occurred while processing your answer. Please try again.' };
    }
}






export default router;