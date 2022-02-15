import express, { Request, Response } from 'express';
import config from './../config/default';

const app = express()
const port = config.port

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})