const express = require("express");
const app = express();

app.use(express.json());

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/info", (req, res) => {
  const time = new Date();
  const html = `<div><p>Phonebook has info for ${persons.length} people</p><p>${time}</p></div>`;
  res.send(html);
});

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  const person = persons.find((person) => person.id === id);

  if (person) res.json(person);
  else res.status(404).end();
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  // if (!body.content) {
  //   return response.status(400).json({
  //     error: 'content missing'
  //   })
  // }

  console.log(req.body)

  const person = {
    id: Math.round(Math.random() * 1000000),
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  res.json(person);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);

  persons = persons.filter((person) => person.id !== id);

  res.status(204).end();
});

const PORT = 3001;
app.listen(3001, () => {
  console.log(`Example app listening on port ${PORT}`);
});
