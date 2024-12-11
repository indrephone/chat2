import express from "express";
import { MongoClient } from "mongodb";
import cors from 'cors';
import 'dotenv/config';
import { v4 as generateID } from 'uuid';
import bcrypt from 'bcrypt';

const app = express();
const corsOptions = {
  origin: `http://localhost:${process.env.FRONT_PORT}`
};
const PORT = process.env.SERVER_PORT;
const DB_CONNECTION = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.${process.env.CLUSTER_ID}.mongodb.net/`;

app.use(express.json());
app.use(cors(corsOptions));

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));

// users routes
// get all, užkraunant
app.get('/users', async (req, res) => {
    const client = await MongoClient.connect(DB_CONNECTION);
    try {
      const data = await client.db('real_chat').collection('users').find().toArray();
      res.send(data);
    } catch(err) {
      res.status(500).send({ error: err })
    } finally {
      // jei client vis dar gyvas
      client?.close(); // nutraukia BackEnd'o ryšį su DB
    }
  });

  