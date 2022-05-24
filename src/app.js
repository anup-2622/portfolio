const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");

require("./db/conn"); // here is the connection and schema of the db.
const Contact = require("./models/usercontact");
const async = require("hbs/lib/async");

const port = process.env.PORT || 8000;

const static_path = path.join(__dirname, "../public");
const templates_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", templates_path);
hbs.registerPartials(partials_path);

// console.log(path.join(__dirname , "../public"));

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});

// create a new user in our database
app.post("/contact", async (req, res) => {
  try {
    const users = new Contact({
      Name: req.body.Name,
      Number: req.body.Number,
      Email: req.body.Email,
      Subject: req.body.Subject,
      Message: req.body.Message,
    })

    const registered = await users.save();
    // res.send("message send");
    res.status(201).render("index");

  } catch (error) {
    res.status(400).send(error);
  }
});

app.listen(port, () => {
  console.log(`server is running at post number ${port}`);
});
