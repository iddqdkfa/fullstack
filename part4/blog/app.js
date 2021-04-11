const mongoose = require('mongoose');
require('express-async-errors')
const config = require('./utils/config');
const middleWare = require('./middleware/middleware')
const blogRouter = require('./controllers/blog');
const usersRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const testingRouter = require('./controllers/reset')

const express = require('express');
const cors = require('cors');
const app = express();


const mongoUrl = config.mongoUrl
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

app.use(cors())
app.use(express.json())
app.use('/api/testing', testingRouter)
app.use('/api/login', loginRouter)
app.use('/api', usersRouter);
app.use(middleWare.tokenExtractor)
app.use('/api', middleWare.userExtractor, blogRouter);

module.exports = app;