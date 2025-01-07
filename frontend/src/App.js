import React, { useState, useEffect } from "react";
import axios from "axios";
import FinancialDataTable from "./FinancialDataTable";

function App() {
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState("AAPL");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Filtering states
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [minRevenue, setMinRevenue] = useState("");
  const [maxRevenue, setMaxRevenue] = useState("");
  const [minNetIncome, setMinNetIncome] = useState("");
  const [maxNetIncome, setMaxNetIncome] = useState("");

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://dhruvamzaveri.pythonanywhere.com/financial-data/${ticker}`,
        {
          params: {
            start_date: startDate,
            end_date: endDate,
            min_revenue: minRevenue,
            max_revenue: maxRevenue,
            min_net_income: minNetIncome,
            max_net_income: maxNetIncome,
            sort_by: sortField,
            sort_order: sortOrder,
          },
        }
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to trigger fetchData on component mount
  useEffect(() => {
    fetchData();
  }, [ticker]); // Empty dependency array means this effect will only run once, after initial render

  return (
    <div>
      <p style={{ fontSize: "2em", fontWeight: 600, textAlign: "center" }}>
        Financial Data Viewer
      </p>

      {/* <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter ticker symbol (e.g., AAPL)"
      />
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button> */}
      <div style={{ margin: "auto", width: "fit-content", padding: "10px" }}>
        <div style={{ marginBottom: "10px", width: "fit-content" }}>
          <label>Start Date: </label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px", width: "fit-content" }}>
          <label>End Date: </label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div style={{ marginBottom: "10px", width: "fit-content" }}>
          <label>Min Revenue: </label>
          <input
            type="number"
            value={minRevenue}
            onChange={(e) => setMinRevenue(e.target.value)}
            placeholder="Min Revenue"
          />
        </div>
        <div style={{ marginBottom: "10px", width: "fit-content" }}>
          <label>Max Revenue: </label>
          <input
            type="number"
            value={maxRevenue}
            onChange={(e) => setMaxRevenue(e.target.value)}
            placeholder="Max Revenue"
          />
        </div>
        <div style={{ marginBottom: "10px", width: "fit-content" }}>
          <label>Min Net Income: </label>
          <input
            type="number"
            value={minNetIncome}
            onChange={(e) => setMinNetIncome(e.target.value)}
            placeholder="Min Net Income"
          />
        </div>
        <div style={{ marginBottom: "10px", width: "fit-content" }}>
          <label>Max Net Income: </label>
          <input
            type="number"
            value={maxNetIncome}
            onChange={(e) => setMaxNetIncome(e.target.value)}
            placeholder="Max Net Income"
          />
        </div>
        <div style={{ marginBottom: "10px", width: "fit-content" }}>
          <label>Sort By: </label>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
          >
            <option value="">Select Field</option>
            <option value="date">Date</option>
            <option value="revenue">Revenue</option>
            <option value="netIncome">Net Income</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px", width: "fit-content" }}>
          <label>Sorting Order: </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Select Order</option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        <button onClick={fetchData}>Apply Filters</button>
      </div>
      {error && <p>{error}</p>}
      <FinancialDataTable data={data} ticker={ticker} />
    </div>
  );
}

export default App;
