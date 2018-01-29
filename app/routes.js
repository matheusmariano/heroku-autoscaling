const express = require('express');
const HomeController = require('./controller/home');
const FibController = require('./controller/fib');

const router = express.Router();

router.get('/', HomeController.index);
router.get('/fib', FibController.calculate);

module.exports = router;
