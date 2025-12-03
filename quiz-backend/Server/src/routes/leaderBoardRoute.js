import express from 'express';
import bodyParser from "body-parser";
import Performance from '../models/Performance.model.js';  

const app = express();
const router = express.Router();
app.use(bodyParser.json());


router.get('/leaderBoard', async (req, res) => {
    try {
        const leaderboard = await Performance.aggregate([
            {
                $lookup: {
                    from: 'users', // Collection name for User schema
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userDetails'
                }
            },
            {
                $unwind: '$userDetails'
            },
            {
                $project: {
                    username: '$userDetails.username',
                    score: 1,
                    timeTaken: 1
                }
            },
            {
                $sort: {
                    score: -1, // Sort by score in descending order
                    timeTaken: 1 // Sort by timeTaken in ascending order (tiebreaker)
                }
            },
            {
                $limit: 10 // Limit to top 10 users
            }
        ]);

        res.status(200).json({ leaderboard });
    } catch (error) {
        console.error('Error fetching leaderboard:', error);
        res.status(500).json({ message: 'Failed to fetch leaderboard' });
    }
});




export default router;