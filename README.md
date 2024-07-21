# Node.js MongoDB Aggregate Demo

This project demonstrates a Node.js backend application using Express and MongoDB, showcasing advanced aggregation queries and RESTful API design.

## Features

- Express.js server setup
- MongoDB connection and aggregation queries
- RESTful API endpoints for sales data analysis
- Error handling and logging
- Environment variable configuration
- Basic authentication middleware

## Prerequisites

- Node.js (v14 or later)
- MongoDB (v4 or later)

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/toniilic/nodejs-mongodb-aggregate-demo.git
   cd nodejs-mongodb-aggregate-demo
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
   ```
   MONGODB_URI=mongodb://localhost:27017/sales_db
   PORT=3000
   ```

## Running the Application

Start the server:
```
npm start
```

The server will be running on `http://localhost:3000` (or the port specified in your .env file).

## API Endpoints

- GET `/api/sales-by-product`: Retrieve sales data aggregated by product
- GET `/api/top-selling-products`: Retrieve top selling products
- POST `/api/add-sale`: Add a new sale record

## Testing

Run the test suite:
```
npm test
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
