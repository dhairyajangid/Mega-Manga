const express = require('express');
const rootRouter = require('./router/index.js')
const cors = require('cors')

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use('/api/v1', rootRouter);


app.listen(port, ()=> {
    console.log(`Server running on http:\\localhost:${port}`);
})
.on('error',(err)=>{
    console.error('server failed to start', err.message);
});

module.exports = app;