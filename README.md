# Financial Data Viewer

A financial data filtering app using data from a single API endpoint. The app will fetch annual income statements for any valid ticker and allow users to filter and analyze key metrics.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have met the following requirements:
* Node.js v20.11.xx or higher is installed on your machine. To verify, run:
  ```
  node -v
  ```

### Installation

Follow these steps to get your development environment running:

1. **Clone the repository**
   ```
   git clone https://github.com/dhruvam-zaveri/InterviewAssignment/
   cd InterviewAssignment
   ```

   If you've downloaded the project as a ZIP file, make sure to unzip it in your desired directory.

2. **Install frontend dependencies**
   Navigate to the frontend directory:
   ```
   cd frontend
   npm install
   cd ..
   ```

3. **Start the application**
   From the root directory:
   ```
   npm start
   ```

### Usage

After starting the application, you can access the frontend by default at `http://localhost:3000`. There is no need to start the backend server as it is deployed on the internet already. Use the following link to access the backend: 
`https://dhruvamzaveri.pythonanywhere.com/financial-data/<ticker>`
E.g. `https://dhruvamzaveri.pythonanywhere.com/financial-data/AAPL`
