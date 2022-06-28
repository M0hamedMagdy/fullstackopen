const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3];
const number = process.argv[4];

const url = `mongodb+srv://phonebook:${password}@phonebook.ybcdvd3.mongodb.net/phonebook?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    const person = new Person({
      name: `${name}`,
      number: `${number}`,
    });

    return person.save();
  })
  .then((result) => {
    console.log(`Added ${result.name} number ${result.number} to phonebook`);

    console.log("Phonebook:");
    Person.find({}).then((res) => {
      res.forEach((person) => {
        console.log(`${person.name} ${person.number}`);
      });
      return mongoose.connection.close();
    });
  })
  .catch((err) => console.log(err));
