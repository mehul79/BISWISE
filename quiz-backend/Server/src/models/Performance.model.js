import { time } from 'console';
import mongoose from 'mongoose';
import { string } from 'zod';

const performanceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
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
});

const Performance = mongoose.model('Performance', performanceSchema);

export default Performance;
