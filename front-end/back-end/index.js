import express from "express";
import rootRouter from "./router/index.js";
import cors from "cors";

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', rootRouter);


app.listen(port, ()=> {
    console.log(`Server running on http:\\localhost:${port}`);
})
.on('error',(err)=>{
    console.error('server failed to start', err.message);
});

export default app;