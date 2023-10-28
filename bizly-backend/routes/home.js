// routes/report.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    return res.json({
    "Bizly-Backend API": "OK",
    "Status Code": 200
})
});

module.exports = router;