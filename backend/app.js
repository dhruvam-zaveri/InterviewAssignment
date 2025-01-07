const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = 3001;

const API_KEY = "tERDfJv0mzZ9H4xZSvlGDg7yKMQXjXhb";
const BASE_URL = "https://financialmodelingprep.com/api/v3/income-statement";
const SORT_BY = ["revenue", "net_income", "date"];
const SORT_ORDER = ["desc", "asc"];

app.use(cors());

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

    if (min_revenue || max_revenue) {
      data = data.filter((item) => {
        const revenue = item.revenue;
        const minCondition = min_revenue ? revenue >= min_revenue : true; // If min_revenue is provided, check if revenue is greater or equal
        const maxCondition = max_revenue ? revenue <= max_revenue : true; // If max_revenue is provided, check if revenue is less or equal
        return minCondition && maxCondition;
      });
    }

    // Filter data based on net income range
    if (min_net_income || max_net_income) {
      data = data.filter((item) => {
        const netIncome = item.netIncome;
        const minCondition = min_net_income
          ? netIncome >= min_net_income
          : true; // If min_net_income is provided, check if netIncome is greater or equal
        const maxCondition = max_net_income
          ? netIncome <= max_net_income
          : true; // If max_net_income is provided, check if netIncome is less or equal
        return minCondition && maxCondition;
      });
    }

    // // Sort data
    // if (SORT_BY.includes(sort_by) && SORT_ORDER.includes(sort_order)) {
    //   data.sort((a, b) =>
    //     sort_order === "desc"
    //       ? b[sort_by] - a[sort_by]
    //       : a[sort_by] - b[sort_by]
    //   );
    // } else {
    //   console.log(
    //     "Invalid sort parameters. Default sorting by date in ascending order applied."
    //   );
    //   data.sort((a, b) => a.date.localeCompare(b.date)); // Default sort
    // }

    // Define default sort parameters
    const defaultSortBy = "date";
    const defaultSortOrder = "asc";

    // Validate and set sort parameters
    const sortBy = SORT_BY.includes(sort_by) ? sort_by : defaultSortBy;
    const sortOrder = SORT_ORDER.includes(sort_order)
      ? sort_order
      : defaultSortOrder;

    // Perform sorting
    data.sort((a, b) => {
      // Handle numeric and string sorting gracefully
      if (typeof a[sortBy] === "number" && typeof b[sortBy] === "number") {
        return sortOrder === "desc"
          ? b[sortBy] - a[sortBy]
          : a[sortBy] - b[sortBy];
      } else {
        return sortOrder === "desc"
          ? b[sortBy].localeCompare(a[sortBy])
          : a[sortBy].localeCompare(b[sortBy]);
      }
    });

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
