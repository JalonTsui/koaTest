const Router = require("koa-router");
const streamRouter = new Router({ prefix: "/creatiAi" });
const fs = require('fs')
const path = require('path')

const parentPath = path.join(__dirname, '..');
const targetPath = path.join(parentPath,'html')

streamRouter.get("/ads", async (ctx) => {
    try{
        const filePath = path.join(targetPath, 'test2.html')
        const htmlContent = await fs.promises.readFile(filePath, 'utf-8')
        ctx.type = 'html'
        ctx.body = htmlContent;
    }catch(err){
        console.log(err)
    }
});

module.exports = streamRouter;