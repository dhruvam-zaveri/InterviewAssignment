import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import FinancialDataTable from "./FinancialDataTable";
// import logo from "./logo.png";
function App() {
  const [data, setData] = useState([]);
  const [ticker, setTicker] = useState("AAPL");
  const [inputTicker, setInputTicker] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

  useEffect(() => {
    fetchData();
  }, [ticker]);

  return (
    <div className="bg-custom-bg bg-cover bg-center">
      {/* <p style={{ fontSize: "2em", fontWeight: 600, textAlign: "center" }} class="text-3xl font-bold underline">
        Financial Data Viewer
      </p> */}
      <header className="bg-[#13486f] text-white py-6 px-8 flex items-center space-x-4">
        {/* Logo Image with larger size */}
        {/* Heading */}
        <h1 className="text-4xl font-bold text-left">Financial Data Viewer</h1>
      </header>
      <div className="flex justify-center items-center my-20">
        <div className="bg-white rounded-lg shadow-lg p-6 w-4/5 max-w-xl">
          <div className="space-y-2">
            <div className="flex items-center space-x-4">
              <label className="w-2/12 font-bold"> Ticker: </label>
              <input
                type="text"
                value={inputTicker}
                className="border p-2 rounded-md flex-1 w-8/12"
                onChange={(e) => setInputTicker(e.target.value.trim())}
                placeholder="Enter ticker symbol (e.g., AAPL)"
              />
              <button
                onClick={(e) =>
                  setTicker(
                    inputTicker !== undefined &&
                      inputTicker !== "" &&
                      inputTicker !== " "
                      ? inputTicker
                      : ticker
                  )
                }
                disabled={loading}
                className="bg-black text-white p-2 rounded-md w-2/12"
              >
                {loading ? <CircularProgress size="1rem" /> : "Go!"}
              </button>
            </div>
            <label className="font-bold">Date:</label>
            <div className="flex items-center space-x-4">
              <div className="w-1/2">
                <label className="w-1/3 font-bold">Start: </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border p-2 rounded-md flex-1 w-2/3"
                />
              </div>
              {/* </div>
            <div className="flex items-center space-x-4"> */}
              <div className="w-1/2">
                <label className="w-1/3 font-bold">End: </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border p-2 rounded-md flex-1 w-2/3 "
                />
              </div>
            </div>
            <label className="font-bold">Revenue:</label>
            <div className="flex items-center space-x-4">
              <div className="w-1/2">
                <label className="w-1/5">Min: </label>
                <input
                  type="number"
                  value={minRevenue}
                  onChange={(e) => setMinRevenue(e.target.value)}
                  placeholder="Min Revenue"
                  className="border p-2 rounded-md flex-1 w-4/5"
                />
              </div>
              {/* </div>
            <div className="flex items-center space-x-4"> */}
              <div className="w-1/2">
                <label className="w-1/5">Max: </label>
                <input
                  type="number"
                  value={maxRevenue}
                  onChange={(e) => setMaxRevenue(e.target.value)}
                  placeholder="Max Revenue"
                  className="border p-2 rounded-md flex-1 w-4/5"
                />
              </div>
            </div>
            <label className="font-bold">Net Income:</label>
            <div className="flex items-center space-x-4">
              <div className="w-1/2">
                <label className="w-1/5">Min: </label>
                <input
                  type="number"
                  value={minNetIncome}
                  onChange={(e) => setMinNetIncome(e.target.value)}
                  placeholder="Min Net Income"
                  className="border p-2 rounded-md flex-1 w-4/5"
                />
              </div>
              {/* </div>
            <div className="flex items-center space-x-4"> */}
              <div className="w-1/2">
                <label className="w-1/5">Max: </label>
                <input
                  type="number"
                  value={maxNetIncome}
                  onChange={(e) => setMaxNetIncome(e.target.value)}
                  placeholder="Max Net Income"
                  className="border p-2 rounded-md flex-1 w-4/5"
                />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/5 font-bold">Sort By:</label>
              <select
                value={sortField}
                onChange={(e) => setSortField(e.target.value)}
                className="border p-2 rounded-md flex-1 w-4/5"
              >
                <option value="">Select Field</option>
                <option value="date">Date</option>
                <option value="revenue">Revenue</option>
                <option value="netIncome">Net Income</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="w-1/5 font-bold">Sorting Order:</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border p-2 rounded-md flex-1 w-4/5"
              >
                <option value="">Select Order</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
            <div className="flex justify-center">
              <button
                onClick={fetchData}
                className="bg-black text-white p-2 rounded-md mt-4 w-1/2"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="justify-center items-center">
        {error && <p>{error}</p>}
        {loading ? (
          <CircularProgress />
        ) : (
          <FinancialDataTable data={data} ticker={ticker} />
        )}
      </div>
      <div className="h-16"></div>
    </div>
  );
}

export default App;
