const express = require('express');
const knex = require('../database/knex');
const auth  = require('./firebase/firebase')
const { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut } = require("firebase/auth");

function setUpServer() {
  const app = express();

  app.use(express.json());

// signup endpoint
  app.post('/api/signup', async (req, res) => {
    const { username, email, password, timestamp } = req.body;

    try {
      const newUser = await createUserWithEmailAndPassword(auth, email, password);
      const uid = newUser.user.uid;

      await knex('users').insert({ 'username': username, "email": email, 'UID': uid, 'created_at': timestamp });
      res.status(200).send(uid);

    } catch (error) {
      res.status(400).send(error);
    }
  });
// login endpoint
  app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      const uid = user.user.uid;
      res.status(200).send(uid);
    } catch (error) {
      res.status(400).send(error);
    }
  });

  return app;
}
module.exports = setUpServer;