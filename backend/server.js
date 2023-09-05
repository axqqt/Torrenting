const express = require("express");
const app = express();
const cors = require("cors");
const axios = require("axios");
const bodyParser = require("body-parser");
const RateLimiter = require("express-rate-limit");
require("dotenv").config();

const searchLimit = RateLimiter({
  windowMs: 1000,
  max: 5,  
});

app.use(express.json());
app.use(cors({ origin: true }));
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json({ extended: true, limit: "30mb" }));
app.use("/main", searchLimit);

app.get("/main", async (req, res) => {
  const { query_term, qual, limit } = req.query;

  try {
    const r = await axios
      .get(
        `https://yts.mx/api/v2/list_movies.json?query_term=${query_term}&quality=${qual}&limit=${limit}`
      )
      .then((r) => {
        res.json(r.data.data.movies);
      })
      .catch((e) => {
        return res.status(e.response.status).json(e.response.data);
      });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});



app.get("/test", async (req, res) => {
  try {
    const response = await axios.get(
      `https://yts.mx/api/v2/list_movies.json?query_term=terrifier`
    );

    res.json(response.data.data.movies);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

/*
app.get("/reviews", async (req, res) => {
  try {
    const r = await axios
      .get(`https://yts.mx/api/v2/movie_reviews.json?movie_id=10`)
      .then((r) => {
        res.json(r.data);
      })
      .catch((e) => {
        return res.status(e.response.status).json(e.response.data);
      });
  } catch (error) {
    console.log(error.message);
  }
});
*/

async function start() {
  try {
    app.listen(
      5000 || process.env.PORT,
      console.log(`Server Up on port 5000 or ${process.env.PORT}`)
    );
  } catch (error) {
    console.log(error.message);
  }
}

start();
