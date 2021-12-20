const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3001;
const cors = require('cors');

require('dotenv').config();

const authenticateWithSkimlinks = () => {
  return fetch("https://authentication.skimapis.com/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET,
      grant_type: "client_credentials",
    }),
  })
    .then((response) => response.json())
    .then((response) => response.access_token);
};

const getOffers = (access_token) => {
  console.log("access_token", access_token);
  const params = { access_token, limit: 1000 };
  const urlParams = new URLSearchParams(Object.entries(params));
  return fetch(
    `https://private-anon-ef06874a87-skimlinksmerchantapi.apiary-proxy.com/v4/publisher/147864/offers?` +
      urlParams
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response.has_more);
      return response.offers || [];
    });
};
const coupons = [];
authenticateWithSkimlinks()
  .then(getOffers)
  .then((offers) =>
    offers.map((offer) => {
      console.log(offer);
      coupons.push(offer);
    })
  )
  .then(console.log(coupons))
  .catch(console.error);

app.get("/coupons", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  console.log(coupons);
  return res.send(coupons);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
