'use strict';

const express = require('express');
const morgan = require('morgan');
const dao = require('./dao.js');
const {check, validationResult} = require('express-validator');
const cors = require('cors');


// Passport-related imports
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');


// init express
const app = new express();
const port = 3001;


// set up middlewares
app.use(express.json());
app.use(morgan('dev'));
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
  credentials: true
}
app.use(cors(corsOptions));


// Passport: set up local strategy
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await dao.getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));

app.use(passport.authenticate('session'));

app.use(express.static('pictures'));

/* ------------------- Routes -------------------*/

// Define routes and web pages

app.get('/api/users', async(req, res) => {
  try {
    const users = await dao.getUsers();
    res.json(users);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('api/users/:email', async(req, res) => {
  try {
    const user = await dao.getUser(req.params.email);
    res.json(user);
  } catch (err) {
    res.status(500).end();
  }
});

app.post('/api/newpage', async(req,res) => {
  try{
    const page = await dao.newPage(req.body);
    res.json(page);
  } catch (err) {
    res.status(500).json(err);
  }
})

app.get('/api/pages', async(req,res) => {
  try{
    const pages = await dao.getallpages();
    res.json(pages);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('/api/pages/published', async(req,res) => {
  try{
    const pages = await dao.getpublishedpages();
    res.json(pages);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('/api/pages/:username', async(req,res) => {
  try{
    const pages = await dao.getpagesbyusername(req.params.username);
    res.json(pages);
    } catch (err) {
      res.status(500).end();
    }
});

app.delete('/api/deletepage', async(req,res) => {
  try{
    const page = await dao.delpage(req.body);
    res.json(page);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/api/updatepage', async(req,res) => {
  try{
    const page = await dao.updatepage(req.body);
    res.json(page);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.get('/api/pictures', async(req,res) => {
  try{
    const pictures = await dao.getPictures();
    res.json(pictures);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('/api/lastid' , async(req,res) => {
  try{
    const id = await dao.lastid();
    res.json(id);
  } catch (err) {
    res.status(500).end();
  }
});

app.get('/api/webname', async(req,res) => {
  try{
    const webname = await dao.getwebname();
    res.json(webname);
  } catch (err) {
    res.status(500).end();
  }
});

app.post('/api/upwebname', async(req,res) => {
  try{
    const webname = await dao.updatewebname(req.body);
    res.json(webname);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST /api/sessions
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        return res.status(401).send(info);
      }
      req.login(user, (err) => {
        if (err)
          return next(err);
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});