import express from 'express';
import userRouter from './routers/user.js';
import "reflect-metadata";

import dataSource from "./db/dataSource.js";


var app = express();
const PORT = 3000;

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server Up!')
});

app.use('/users', userRouter);

app.use((req, res) => {
  res.status(404).send("Page does not exist :(");
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
  dataSource.initialize()
});
  
  export default app;
