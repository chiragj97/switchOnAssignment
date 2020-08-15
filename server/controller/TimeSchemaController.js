const router = require('express').Router();
const Time = require('../models/TimeSchema');

router.get('/add_data', (req, res) => {
  let data = { deadCount: Math.floor(Math.random() * 10 + 4) };
  const time = new Time(data);
  time
    .save()
    .then(function (time) {
      res.send(time);
    })
    .catch(function (err) {
      res.status(400).json('Error:' + err);
    });
});

router.get('/get_data', (req, res) => {
  Time.find()
    .sort({ createdAt: -1 })
    .limit(19)
    .then((time) => res.json(time))
    .catch((err) => err.status(400).json('Error' + err));
});

router.delete('/delete', (req, res) => {
  Time.deleteOne()
    .then((time) => res.json(time))
    .catch((err) => err.status(400).json('Error' + err));
});

module.exports = router;
