const PORT = 3000;
const HOST = "localhost";
const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");
const db = require("./database");

db.connect();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.use("/", routes);

// axios
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send("Something broke!");
// });
app.use((err, req, res, next) => {
  if (err) {
    // res.redirect("/error");
    res.render("error.pug", { error: err.message });
    console.log(err.message);
  }
});

app.get("/", (req, res) => {
  res.render("index.pug");
});

app.listen(PORT, () => {
  console.log(`Serveur NODE JS démarré sur http://${HOST}:${PORT}`);
});
