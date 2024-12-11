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
const PORT = process.env.SERVER_PORT || 5500;
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

//   app.post('/users', (req, res) => {
//     console.log('POST /users hit');
//     res.send('Route works!');
//   });
// post, sukuriant naują
const checkUniqueUser = async (req, res, next) => {
    const client = await MongoClient.connect(DB_CONNECTION);
    try {
      const db = client.db('real_chat');
  
      // Check for duplicate username
      const sameUsername = await db.collection('users').findOne({ username: req.body.username });
      if (sameUsername) {
        return res.status(409).send({ errorMessage: 'A user with the same username or password already exists.' });
      }
  
      // Check for duplicate password
      const users = await db.collection('users').find().toArray(); // Fetch all users
      const isPasswordDuplicate = users.some(user =>
        bcrypt.compareSync(req.body.password, user.password) // Compare hashed passwords
      );
  
      if (isPasswordDuplicate) {
        return res.status(409).send({ errorMessage: 'A user with the same username password already exists.' });
      }
  
      // If no duplicates, proceed to the next middleware
      next();
    } catch (err) {
      console.error(err);
      res.status(500).send({ error: err });
    } finally {
      // Close the database connection
      client?.close();
    }
  };
  
  
// kurti naują vartotoją jeigu unikalus
app.post('/users', checkUniqueUser, async (req, res) => {
    const client = await MongoClient.connect(DB_CONNECTION);
    try {
      // console.log('req body', req.body);
      const userToInsert = {
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
        _id: generateID()
      };
      const data = await client.db('real_chat').collection('users').insertOne(userToInsert);
      // console.log('data po inserto', data);
      res.send(userToInsert);
    } catch(err) {
      res.status(500).send({ error: err });
    } finally {
      // jei client vis dar gyvas
      client?.close(); // nutraukia BackEnd'o ryšį su DB
    }
  });

// separate route for login
  app.post('/login', async (req, res) => {
    const client = await MongoClient.connect(DB_CONNECTION);
    try {
      const db = client.db('real_chat');
      const user = await db.collection('users').findOne({ username: req.body.username });
      
      if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        return res.status(401).json({ errorMessage: 'Invalid username or password' });
      }
  
      res.status(200).json(user); // Send back user details (without password)
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    } finally {
      client.close();
    }
  });
  