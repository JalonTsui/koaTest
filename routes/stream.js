const Router = require("koa-router");
const streamRouter = new Router({ prefix: "/stream" });
streamRouter.get("/", async (ctx) => {
  console.log("inTest");
  const returnData = {
    name: "jack",
    age: "18",
  };
  ctx.body = returnData;
  // 要设置返回数据的格式
  ctx.type = "application/json";
});
module.exports = streamRouter;
