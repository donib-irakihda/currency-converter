const express = require("express");
const axios = require("axios");

const app = express();

app.get("/convert", async (req, res) => {
  const { amount, currencyFrom, currencyTo } = req.query;
  const apiUrl = `https://api.exchangerate-api.com/v4/latest/${currencyFrom}`;
  try {
    const response = await axios.get(apiUrl);
    const exchangeRates = response.data.rates;
    const result = amount * exchangeRates[currencyTo];
    console.log(`Today's rate: one ${currencyFrom} is equal to ${exchangeRates[currencyTo]} ${currencyTo}`,)
    res.json({ result });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
