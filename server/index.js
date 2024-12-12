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


// post, sukuriant naują
const checkUniqueUsername = async (req, res, next) => {
  const client = await MongoClient.connect(DB_CONNECTION);
  try {
    const { username } = req.body;
    const { id } = req.params;

    const db = client.db('real_chat');
    const user = await db.collection('users').findOne({ username });

    // Check if the username already exists and is not the current user's username
    if (user && user._id !== id) {
      return res.status(409).send({ errorMessage: 'Username already taken.' });
    }

    // If no duplicates, proceed to the next middleware
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err });
  } finally {
    client?.close();
  }
};

  
// kurti naują vartotoją jeigu unikalus
app.post('/users', checkUniqueUsername, async (req, res) => {
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

// get, kuris grąžina vieną specific pagal email+password
app.post('/users/login', async (req, res) => {
    const client = await MongoClient.connect(DB_CONNECTION);
    try {
      // console.log(req.body);
      const data = await client.db('real_chat').collection('users').findOne({ username: req.body.username });
      // console.log(data);
      if(data === null){ // netinkamas username
        res.status(401).send({ error: 'Vartotojas su tokiu username arba/ir password neegzsituoja.' });
      } else { // buvo surastas pagal username
        const passCheck = bcrypt.compareSync(req.body.password, data.password);
        // console.log(passCheck);
        if(passCheck === false){ // tinkamas username, bet netinkamas password
          res.status(401).send({ error: 'Vartotojas su tokiu username arba/ir password neegzsituoja.' });
        } else { // tinkamas email ir password
          res.send(data);
        }
      }
    } catch(err) {
      console.error(err);
      res.status(500).send({ error: err });
    } finally {
      // jei client vis dar gyvas
      client?.close(); // nutraukia BackEnd'o ryšį su DB
    }
  });
  
  // update username
  app.patch('/users/:id/username', checkUniqueUsername, async (req, res) => {
    const client = await MongoClient.connect(DB_CONNECTION);
    try {
      const { id } = req.params;
      const { username } = req.body;
      const db = client.db('real_chat');
  
      // Check if the user exists
      const user = await db.collection('users').findOne({ _id: id });
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      // Update the username
      await db.collection('users').updateOne(
        { _id: id },
        { $set: { username } }
      );
  
      res.send({ success: 'Username updated successfully' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    } finally {
      client?.close();
    }
  });
  
  // update profileImage
  app.patch('/users/:id/profileImage', async (req, res) => {
    const client = await MongoClient.connect(DB_CONNECTION);
    try {
      const { id } = req.params;
      const { profileImage } = req.body;
      const db = client.db('real_chat');
  
      // Check if the user exists
      const user = await db.collection('users').findOne({ _id: id });
      if (!user) {
        return res.status(404).send({ error: 'User not found' });
      }
  
      // Default image URL
      const defaultProfileImage = "/default_profile_image.svg";
  
      // Update the user's profile image
      await db.collection('users').updateOne(
        { _id: id },
        { $set: { profileImage: profileImage || defaultProfileImage } }
      );
  
      res.send({ success: 'Profile image updated successfully' });
    } catch (err) {
      res.status(500).send({ error: err.message });
    } finally {
      client?.close();
    }
  });
    
  
// update password
app.patch('/users/:id/password', async (req, res) => {
  const client = await MongoClient.connect(DB_CONNECTION);
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.trim() === "") {
      return res.status(400).send({ error: "Password cannot be empty." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const db = client.db('real_chat');

    // Check if the user exists
    const user = await db.collection('users').findOne({ _id: id });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }

    // Update the password
    await db.collection('users').updateOne(
      { _id: id },
      { $set: { password: hashedPassword } }
    );

    res.send({ success: "Password updated successfully" });
  } catch (err) {
    res.status(500).send({ error: err.message });
  } finally {
    client?.close();
  }
});
  