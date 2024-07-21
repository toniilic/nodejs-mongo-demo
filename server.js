require('dotenv').config();
const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Basic authentication middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader === 'Bearer secret-token') {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

app.use(authenticate);

app.get('/api/sales-by-product', async (req, res) => {
  try {
    const database = client.db("sales_db");
    const sales = database.collection("sales");

    const pipeline = [
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" },
          totalRevenue: { $sum: { $multiply: ["$price", "$quantity"] } }
        }
      },
      {
        $sort: { totalRevenue: -1 }
      }
    ];

    const result = await sales.aggregate(pipeline).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ error: "An error occurred during aggregation" });
  }
});

app.get('/api/top-selling-products', async (req, res) => {
  try {
    const database = client.db("sales_db");
    const sales = database.collection("sales");

    const pipeline = [
      {
        $group: {
          _id: "$product",
          totalQuantity: { $sum: "$quantity" }
        }
      },
      {
        $sort: { totalQuantity: -1 }
      },
      {
        $limit: 5
      }
    ];

    const result = await sales.aggregate(pipeline).toArray();
    res.json(result);
  } catch (error) {
    console.error("Error in aggregation:", error);
    res.status(500).json({ error: "An error occurred during aggregation" });
  }
});

app.post('/api/add-sale', async (req, res) => {
  try {
    const { product, quantity, price } = req.body;
    const database = client.db("sales_db");
    const sales = database.collection("sales");

    const result = await sales.insertOne({ product, quantity, price });
    res.status(201).json({ message: "Sale added successfully", id: result.insertedId });
  } catch (error) {
    console.error("Error adding sale:", error);
    res.status(500).json({ error: "An error occurred while adding the sale" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectToDatabase();
});

// Error handling for unhandled promises
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

module.exports = app; // For testing purposes

