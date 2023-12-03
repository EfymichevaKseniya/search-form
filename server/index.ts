'use strict';
import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const host = 'localhost';
const port = 8000;
const app: Express = express();

type User = {
  email: string
  number?: string
}

const data = JSON.stringify(
  [
    {
      "email": "jim@gmail.com",
      "number": "221122"
    },
    {
      "email": "jam@gmail.com",
      "number": "830347"
    },
    {
      "email": "john@gmail.com",
      "number": "221122"
    },
    {
      "email": "jams@gmail.com",
      "number": "349425"
    },
    {
      "email": "jams@gmail.com",
      "number": "141424"
    },
    {
      "email": "jill@gmail.com",
      "number": "822287"
    },
    {
      "email": "jill@gmail.com",
      "number": "822286"
    }
  ]
)
app.use(cors({
  origin: '*'
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let previousRequestTimeout: NodeJS.Timeout;

app.post('/search', (req: Request, res: Response) => {
  // Simulate a delay of 5 seconds for processing
  previousRequestTimeout && clearTimeout(previousRequestTimeout);

  const { email, number } = req.body;

  // Basic validation
  if (!email) {
    return res.status(400).json({ error: 'Email field is required.' });
  }

  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  if (number && !isValidNumber(number)) {
    return res.status(400).json({ error: 'Invalid Number field' });
  }

  previousRequestTimeout = setTimeout(() => {
    // Simulate data retrieval
    const users = findUsers({ email, number });
    res.json(users);
  }, 5000);
});

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidNumber(number: string) {
  const numberRegex = /^[0-9]+$/;
  return numberRegex.test(number) && number.length === 6;
}

function findUsers({ email, number }: User) {
  let foundedUsers = [];
  if (email && number) {
    foundedUsers = JSON.parse(data).filter((user: User) => user.email === email && user.number === number)
  } else if (email) {
    foundedUsers = JSON.parse(data).filter((user: User) => user.email === email)
  } else {
    foundedUsers = []
  }
  return foundedUsers;
}

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server is running at http://${host}:${port}`);
});
