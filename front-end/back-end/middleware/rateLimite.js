const rateLimit = require('express-rate-limit');
const signinLimiter = rateLimit({
    windowMs:15*60*1000,
    max: 5,
    message:{
        msg: "Too many signin attempt, plz try again after 15 mins"
    },
    standardHearders: true,
    lagacyHearders: false

});
module.exports = signinLimiter;