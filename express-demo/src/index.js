const express = require('express')
const onHeaders = require('on-headers')
const app = express()

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const responseTimeMiddleWare = (req, res, next) => {
  const start = Date.now();

 //Execute a listener when a response is about to write headers.
  onHeaders(res, ()=> {
    const ms = Date.now() - start;
    console.log('responseTime', `${ms}ms`);
    res.setHeader('X-Response-Time', `${ms}ms`)
  })
  next()
}

app.use(responseTimeMiddleWare)

app.get('/', async(req, res) => {
  await sleep(1000)
  res.send('Hello Express!')
})

const port = 3000
app.listen(port, () => {
  console.log(`express app listening at http://localhost:${port}`)
})



// 执行下一个中间件, next之后的代码也会同步执行, 再执行到最后最后一个中间件时,就send response,


