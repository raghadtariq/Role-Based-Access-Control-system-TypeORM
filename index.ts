import './config.js';
import express from "express";
import cors from 'cors';

import dataSource from "./db/dataSource.js";
import usersRouter from './routers/userrouter.js';
import permissionrouter from './routers/permissionrouter.js';
import rolerouter from './routers/rolerouter.js'
import { authenticate } from './middleware/auth/authenticate.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:3000"
}));

app.use(express.json());
app.use('/users',  usersRouter);
app.use('/roles' , rolerouter );
app.use('/permissions' ,  permissionrouter );

app.use((err: any, req: any, res: any, next: any) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500).send(err);
});

app.get("/", (req, res) => {
  res.send("Server UP !");
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});

export default app;