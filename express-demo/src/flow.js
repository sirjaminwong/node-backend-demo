app.use(function middleware1(req, res, next) {
  console.log('middleware1 开始')
      // next()
      (function (req, res, next) {
          console.log('middleware2 开始')
              // next()
              (function (req, res, next) {
                  console.log('middleware3 开始')
                      // next()
                      (function handler(req, res, next) {
                          res.send("end")
                          console.log('end')
                      })()
                  console.log('middleware3 结束')
              })()
          console.log('middleware2 结束')
      })()
  console.log('middleware1 结束')
})