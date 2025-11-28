import express from 'express';
import userRouter from './User.js';
import uploadRouter from './upload.js';

const router = express.Router();

router.use('/User', userRouter);
router.use('/upload', uploadRouter);

export default router;
