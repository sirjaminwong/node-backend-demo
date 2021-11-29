const express = require('express')
const onHeaders = require('on-headers')
const app = express()

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const responseTimeMiddleWare = async(req, res, next) => {

  const start = Date.now();
  
  const ms = Date.now() - start;
  await next()
  console.log('responseTime', `${ms}ms`);
  res.setHeader('X-Response-Time', `${0}ms`)
}

app.use(responseTimeMiddleWare)

app.get('/', async(req, res) => {
  await sleep(1000)
  res.send('Hello Express!, no responseTime')
})

const port = 3002
app.listen(port, () => {
  console.log(`express app listening at http://localhost:${port}`)
})