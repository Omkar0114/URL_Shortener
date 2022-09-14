const express = require('express');
 require('dotenv').config()
const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Server running!');
})


app.listen(PORT, () => {
    console.log('server is running on ' + PORT)
})
