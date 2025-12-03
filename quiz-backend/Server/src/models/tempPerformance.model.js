import mongoose from 'mongoose';
import { string } from 'zod';

const tempSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    currentQuestion: {
        type: Number,
        default: 0,
    },
    score: {
        type: Number,
        default: 0,
    },
    timeTaken: {
        type: String,
        default: 0,
    },
    timeStarted: {
        type: String,
        default: 0,
    },
    timeFinished: {
        type: String,
        default: 0,
    },
    answers: [
        {
            question: {
                type: String,
                default: '',
            },
            correctAnswer: {
                type: String,
                default: 'Not answered yet',
            },
        },
    ],
});

const tempPerformance = mongoose.model('tempPerformance', tempSchema);

export default tempPerformance;
