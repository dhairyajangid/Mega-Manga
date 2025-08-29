const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/signin',(req,res)=>({
    
}))

app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
})

