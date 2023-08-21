const Router = require("koa-router");
const streamRouter = new Router({ prefix: "/gfast" });
// import second from '../jsonData/gfast/login.json'

streamRouter.get("/login", async (ctx) => {
    ctx.body = await require('../jsonData/gfast/login.json');
    // 要设置返回数据的格式
    ctx.type = "application/json";
});

streamRouter.get("/login/captcha", async (ctx) => {
    ctx.body = await require('../jsonData/gfast/captcha.json');
    // 要设置返回数据的格式
    ctx.type = "application/json";
});

module.exports = streamRouter;