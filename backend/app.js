const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

const API_KEY = "tERDfJv0mzZ9H4xZSvlGDg7yKMQXjXhb";
const BASE_URL = "https://financialmodelingprep.com/api/v3/income-statement";
const SORT_BY = ["revenue", "net_income", "date"];
const SORT_ORDER = ["desc", "asc"];

app.get("/financial-data/:ticker", async (req, res) => {
  const ticker = req.params.ticker;
  console.log("Route hit: /financial-data/" + ticker);
  try {
    const url = `${BASE_URL}/${ticker}?period=annual&apikey=${API_KEY}`;
    console.log("URL: " + url);
    const response = await axios.get(url);
    let data = response.data;

    // console.log("Data: " + JSON.stringify(data));

    // Get filter parameters from query string
    const {
      start_date,
      end_date,
      min_revenue,
      max_revenue,
      min_net_income,
      max_net_income,
      sort_by,
      sort_order,
    } = req.query;

    // Filter data based on date range
    if (start_date && end_date) {
      data = data.filter(
        (item) => item.date >= start_date && item.date <= end_date
      );
    }

    // Filter data based on revenue range
    if (min_revenue && max_revenue) {
      data = data.filter(
        (item) => item.revenue >= min_revenue && item.revenue <= max_revenue
      );
    }

    // Filter data based on net income range
    if (min_net_income && max_net_income) {
      data = data.filter(
        (item) =>
          item.netIncome >= min_net_income && item.netIncome <= max_net_income
      );
    }

    // Sort data
    if (SORT_BY.includes(sort_by) && SORT_ORDER.includes(sort_order)) {
      data.sort((a, b) =>
        sort_order === "desc"
          ? b[sort_by] - a[sort_by]
          : a[sort_by] - b[sort_by]
      );
    } else {
      console.log(
        "Invalid sort parameters. Default sorting by date in ascending order applied."
      );
      data.sort((a, b) => a.date.localeCompare(b.date)); // Default sort
    }

    // Filter and map data to only include specified columns
    const filteredData = data.map((item) => ({
      Date: item.date,
      Revenue: item.revenue,
      NetIncome: item.netIncome,
      GrossProfit: item.grossProfit,
      EPS: item.epsdiluted, // Assuming 'epsdiluted' is the field for EPS
      OperatingIncome: item.operatingIncome,
    }));

    res.json(filteredData);
  } catch (error) {
    console.error(`Error fetching financial data for ${ticker}:`, error);
    res.status(500).send("Error fetching financial data");
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
