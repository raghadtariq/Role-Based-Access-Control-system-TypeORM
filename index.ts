import express from "express";
import usersrouter from './routers/user.js'; 
import { authenticate } from './middleware/auth/authenticate.js';
import dataSource,  { initDB } from "./db/dataSource.js";
import logger from 'morgan';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/users' , authenticate, usersrouter );

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