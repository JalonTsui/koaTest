// http://www.koajs.com.cn/
const Koa = require("koa");
const cors = require("koa2-cors");
const homeRouter = require("./routes/home");
const streamRouter = require("./routes/stream");
const gfastRouter = require('./routes/gfast')
const adsRouter = require('./routes/createAi')
const app = new Koa();
// 自定义中间件
app.use(async (ctx, next) => {
  // 加上await可以保证处理完该中间件再执行下一个
  // console.log('new')
  console.log('require time===>>>', new Date().toLocaleString())
  console.log("origion===>>>", ctx.request.header.referer);
  console.log("url===>>>", ctx.request.url + '\n');
  await next();
  return;
  // koa中为了方便，ctx中的一些alias与ctx.response中属性是等价的true,requires也是一样，具体看官网
  // console.log(ctx.body===ctx.response.body)
  // 想浏览器抛出错误信息
  ctx.throw(400, "hello", { name: "jack" });
  // 获取报文中的cookie参数
  console.log(ctx.cookies.get("name"));
  // 修改
  ctx.cookies.set("name", val);
  // 获取应用实例
  console.log("ctx.app", ctx.app);
  // ctx.state 可以往ctx.state中添加属性，后续的路由都可以访问的该属性
  // 获取请求到的报文
  console.log("ctx", ctx);
  // koa 处理后的request对象
  console.log("ctx.request", ctx.request);
  // koa request
  console.log("ctx.response", ctx.response);
  // 这个是node的request对象
  console.log("ctx.req", ctx.req);
  // node的response
  console.log("ctx.req", ctx.res);
});
// 可以往全局的ctx中添加属性
app.context.mmm = {
  test: "test",
};
// 全局的错误处理函数
app.on("error", (err, ctx) => {
  console.log("err on global error handler", err);
  console.log("err on global error handler --- ctx", ctx);
});

app.use(
  cors({
    // origin: "http://127.0.0.1:3001",
    credentials: true,
  })
);

app.use(homeRouter.routes());

app.use(streamRouter.routes());

app.use(gfastRouter.routes())

app.use(adsRouter.routes())

app.listen(3000, () => {
  console.log("http://127.0.0.1:3000");
});
