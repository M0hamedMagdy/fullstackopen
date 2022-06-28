const express = require("express");
const app = express();

const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

app.use(cors());
app.use(express.json());
app.use(express.static("build"));

// Step 7 & 8
morgan.token("body", function (req, res) {
  return JSON.stringify(req.body);
});
app.use(
  morgan(
    ":method :url :status :response-time ms - :res[content-length] :body - :req[content-length]"
  )
);

// let persons = [
//   {
//     id: 1,
//     name: "Arto Hellas",
//     number: "040-123456",
//   },
//   {
//     id: 2,
//     name: "Ada Lovelace",
//     number: "39-44-5323523",
//   },
//   {
//     id: 3,
//     name: "Dan Abramov",
//     number: "12-43-234345",
//   },
//   {
//     id: 4,
//     name: "Mary Poppendieck",
//     number: "39-23-6423122",
//   },
// ];

app.get("/", (req, res) => {
  res.send(
    `<h1 style="
    letter-spacing: 2px;
    inline-size: 100%;
    text-align: center;
    margin-block-start: 50px;
    line-height: 2;
">This is Persons API</h1>`
  );
});

// Step 1
app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons.map((person) => person.toJSON()));
  });
});

//Step 2 ..

app.get("/info", (req, res) => {
  const now = Date();
  Person.find({}).then((persons) => {
    res.send(`
        <div style="
        inline-size: 100%;
        text-align: center;
        margin-block-start: 40px;
        letter-spacing: 1px;
        line-height: 1.5;
         ">
          <h3>
             Phonebook has info for ${persons.length} pepole
          </h3>
          <h4>${now}</h3>
        </div>`);
  });
});

// Step 3

app.get("/api/persons/:id", (req, res, next) => {
  // const id = Number(req.params.id);
  // const person = persons.find((person) => person.id === id);
  // if (person) {
  //   res.json(person);
  // } else {
  //   res.status(404).end();
  // }
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person.toJSON());
      } else {
        res.status(404).end();
      }
    })
    .catch((err) => next(err));
});

// Step 4
app.delete("/api/notes/:id", (req, res, next) => {
  // const id = Number(req.params.id);
  // persons = persons.find((person) => person.id !== id);
  // res.status(204).end();
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

// Step 5 & 6

// const generateId = () => {
//   const ranNum = Math.floor(Math.random() * 1000) + 1;
//   return ranNum + 1;
// };

app.post("/api/persons", (req, res, next) => {
  const body = req.body;

  // Part 6 : The name or number is missing
  // if (!body.name || !body.number) {
  //   return res.status(400).json({
  //     error: "Please Add Name And Number",
  //   });
  //   // Part 6 : The name already exists in the phonebook
  // } else if (Person.find((person) => person.name === body.name)) {
  //   return res.status(400).json({
  //     error: "Name must be unique",
  //   });
  // }

  if (Object.keys(body).length === 0) {
    return res.status(400).json({
      error: "Please Add Name And Number",
    });
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedPerson) => {
      console.log(
        `added ${savedPerson.name} number ${savedPerson.number} to phonebook`
      );
      res.json(savedPerson);
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (req, res, next) => {
  const body = req.body;

  const person = {
    name: body.name,
    number: body.number,
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then((updatedPerson) => {
      res.json(updatedPerson.toJSON());
    })
    .catch((err) => next(err));
});

const errorHandler = (err, req, res, next) => {
  console.err(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }
  next(err);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
