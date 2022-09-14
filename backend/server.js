const express = require('express');
const connectDB = require('./connectDB/db');
const ShortUrl = require("./models/shortUrl")
 require('dotenv').config()
 
const app = express();

app.use(express.urlencoded({ extended: false }))

const PORT = process.env.PORT || 5000;

connectDB()

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.json({ shortUrls: shortUrls })
  })
  
  app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({ originalUrl: req.body.fullUrl })
  
    res.redirect('/')
  })
  
  app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ shortenedUrl: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)

    shortUrl.save()
  
    res.redirect(shortUrl.originalUrl)
  })

app.listen(PORT, () => {
    console.log('server is running on ' + PORT)
})
