from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all domains on all routes

API_KEY = "tERDfJv0mzZ9H4xZSvlGDg7yKMQXjXhb"
BASE_URL = "https://financialmodelingprep.com/api/v3/income-statement"
SORT_BY = ["revenue", "net_income", "date"]
SORT_ORDER = ["desc", "asc"]

@app.route('/financial-data/<ticker>', methods=['GET'])
def get_financial_data(ticker):
    url = f"{BASE_URL}/{ticker}?period=annual&apikey={API_KEY}"
    params = request.args.to_dict()
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch data'}), 500
    
    data = response.json()

    # Filter and sort the data
    data = filter_and_sort_data(data, params)
    # Map data to only include specified columns
    filtered_data = [
        {
            "Date": item["date"],
            "Revenue": item["revenue"],
            "NetIncome": item["netIncome"],
            "GrossProfit": item["grossProfit"],
            "EPS": item.get("epsdiluted", None),
            "OperatingIncome": item["operatingIncome"]
        }
        for item in data
    ]

    return jsonify(filtered_data)

def filter_and_sort_data(data, params):
    # Implement filtering based on passed params
    data = filter_by_date_range(data, params.get('start_date'), params.get('end_date'))
    data = filter_by_value_range(data, 'revenue', params.get('min_revenue'), params.get('max_revenue'))
    data = filter_by_value_range(data, 'netIncome', params.get('min_net_income'), params.get('max_net_income'))

    # Sort data
    sort_by = params.get('sort_by', 'date')
    sort_order = params.get('sort_order', 'asc')
    data.sort(key=lambda x: x.get(sort_by, 0), reverse=(sort_order == 'desc'))
    
    return data

def filter_by_date_range(data, start_date, end_date):
    if start_date and end_date:
        return [item for item in data if start_date <= item['date'] <= end_date]
    elif start_date:
        return [item for item in data if start_date <= item['date']]
    elif end_date:
        return [item for item in data if item['date'] <= end_date]
    return data

def filter_by_value_range(data, key, min_val, max_val):
    if min_val and max_val:
        return [item for item in data if float(min_val) <= float(item[key]) <= float(max_val)]
    elif min_val:
        return [item for item in data if float(min_val) <= float(item[key])]
    elif max_val:
        return [item for item in data if float(item[key]) <= float(max_val)]
    return data

if __name__ == '__main__':
    app.run(debug=True, port=3001)
