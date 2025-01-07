import React, { useState } from "react";
import axios from "axios";
import FinancialDataTable from "./FinancialDataTable";

function App() {
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    if (!ticker) {
      // alert("Please enter a ticker symbol");
      // return;
      setTicker("AAPL");
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `http://localhost:3001/financial-data/${ticker}`
      );
      setData(response.data);
    } catch (err) {
      setError("Failed to fetch data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Financial Data Viewer</h1>
      <input
        type="text"
        value={ticker}
        onChange={(e) => setTicker(e.target.value)}
        placeholder="Enter ticker symbol (e.g., AAPL)"
      />
      <button onClick={fetchData} disabled={loading}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>
      {error && <p>{error}</p>}
      <FinancialDataTable data={data} />
    </div>
  );
}

export default App;
