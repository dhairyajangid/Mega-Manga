const express = require('express');
const userRouter = require('./User');
const uploadRouter = require('./upload');

const router = express.Router();

router.use("/User",userRouter);
router.use('/upload', uploadRouter);

module.exports = router;
