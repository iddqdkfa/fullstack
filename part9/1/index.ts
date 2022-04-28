import express from 'express';const app = express();
import bmi from './bmi';

app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack');
});

app.get('/bmi', (req, res) => {
    if(req.query.weight === undefined || req.query.height === undefined){

        res.status(400).send(JSON.stringify({
  error: "malformatted parameters"
}));
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ weight: req.query.weight, height: req.query.height, "bmi": bmi(Number(req.query.height), Number(req.query.weight))  }));
  });

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});