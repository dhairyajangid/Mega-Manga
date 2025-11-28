import rateLimit from 'express-rate-limit';

const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    msg: "Too many signin attempts, try again after 15 minutes"
  },
  standardHeaders: true,
  legacyHeaders: false
});

export default signinLimiter;
