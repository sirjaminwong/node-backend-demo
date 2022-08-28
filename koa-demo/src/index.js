const Koa = require('koa');
const app = new Koa();

const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const responseTimeMiddleWare = async (ctx, next) => {
  const start = Date.now();

  await next();
  const ms = Date.now() - start;
  console.log('responseTime', `${ms}ms`);
  ctx.set('X-Response-Time', `${ms}ms`);
}

app.use(responseTimeMiddleWare);
app.use(async ctx => {
  await sleep(1000);
  ctx.body = 'Hello Koa';
});


const port = 3001;
app.listen(port, ()=> {
  console.log(`koa app listening at http://localhost:${port}`)
});


  //执行下一个中间件,待后续的中间件逻辑都执行完毕后,再执行当前中间next后的逻辑,待所有中间件都执行完毕之后再,send最终的response
