const { request, response } = require('express');
const express = require('express');
const app = express();
app.use(express.json());

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((n) => n.id)) : 0;
  return maxId + 1;
};
let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/', (request, response) => {
  response.send('<h1>Hello, pussy!</h1>');
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (!body.content) {
    return response.status(404).json({
      error: 'content missing',
    });
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };
  persons = persons.concat(note);
  response.json(note);
});

app.get('/api/persons/', (request, response) => response.json(persons));

app.get('/api/persons/:id', (request, response) => {
  let id = Number(request.params.id);
  const note = persons.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.get('/api/info', (request, response) => {
  response.send(`<h1>Phonebook has info for ${persons.length} people
  </h1>
  <p>${new Date()}</p>`);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((note) => note.id !== id);

  response.status(204).end();
});
const PORT = 3001;
app.listen(PORT);
console.log(`The server is running on port ${PORT}`);
