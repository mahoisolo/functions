const { https, logger } = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51OPhdcLiCZpPONtsWllxC4lRDlwQa5XjGnfDq0XKdI4XjfqWbut4gFyazqSHyKflNg3jZgqxrS4zPwwWUDlvSQKR006eM5IlMu"
);

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (request, response) => response.status(200).send("hello world"));
// app.get("/evangadi", (request, response) => response.status(200).send("evangadi"));
app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment Request Recieved BOOM!!! for this amount >>> ", total);
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  })
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  })
})
exports.api = https.onRequest(app);

// http://127.0.0.1:5001/clone-af08c/us-central1/api
// http://127.0.0.1:5001/clone-af08c/us-central1/api/
