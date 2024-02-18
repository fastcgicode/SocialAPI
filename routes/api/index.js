const router = require('express').Router();
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/social');
const messagesSchema = new mongoose.Schema({
  name: String,
  message: String
});
const Message = mongoose.model('Message', messagesSchema);

router.get('/api', (req, res) => {
  const messages = Message.find()
    .then(results => {
      const resultDocuments = results.map(result => ({ name: result.name, message: result.message }))
      res.send(JSON.stringify(resultDocuments));
    });
});

router.get('/api/:name', (req, res) => {
  const messages = Message.find({name: req.params.name})
    .then(results => {
      const resultDocuments = results.map(result => ({ name: result.name, message: result.message }))
      res.send(JSON.stringify(resultDocuments));
    });
});

router.get('/', (req, res) => {
  res.render('addmessage');
});

router.post('/addmessage', (req, res) => {
  if (req.body.name && req.body.message) {
    const message = new Message({ name: req.body.name, message: req.body.message });
    message.save();
  }
  res.redirect('/api');
});

module.exports = router;