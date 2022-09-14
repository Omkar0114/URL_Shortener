const express = require('express');
const connectDB = require('./connectDB/db');
const ShortUrl = require("./models/shortUrl")
const path = require('path')
const cors = require('cors')
require('dotenv').config()
 
const app = express();
const corsOpts = {
  origin: '*',

  methods: [
    'GET',
    'POST',
  ],

  allowedHeaders: [
    'Content-Type',
  ],
}
app.use(cors(corsOpts))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static(path.join(__dirname, 'build')))

const PORT = process.env.PORT || 5000;

connectDB()

app.get('/', async (req,res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.get('/shortUrls', async (req, res) => {
    const shortUrls = await ShortUrl.find().sort('-1')
    res.json({ shortUrls: shortUrls })
  })
  
  app.post('/shortUrls', async (req, res) => {
    const url = await ShortUrl.findOne({originalUrl: req.body.fullUrl});

    if(url){
        res.json({url})
        return;
    }

    await ShortUrl.create({ originalUrl: req.body.fullUrl })
  
    res.json({success: true})
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
