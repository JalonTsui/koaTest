const Router = require("koa-router");
const Stream = require("stream");
const homeRouter = new Router({ prefix: "/stream" });
homeRouter.post("/test", async (ctx) => {
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new Stream.PassThrough();
  ctx.status = 200;
  let x = 1;
  let eventId = 1;
  const time = setInterval(() => {
    eventId++;
    const event = `event: message\n`;
    const id = `id: ${eventId}\n`;
    const retry = `retry: 10000\n`;
    const data = `data: ${JSON.stringify({
      message: "Hello, world!",
      eventId,
      event: "message",
      answer: `${x}`,
    })}\n\n`;
    stream.write(event + id + retry + data);
    console.log("x===>>>", x);
    x++;
  }, 1000);
  setTimeout(() => {
    // console.log(x);
    clearInterval(time);
    // stream.write("data: " + `${x}` + "\n\n");
    // throw new Error('123')
  }, 10000);
  ctx.body = stream;
});

homeRouter.get("/stream", async (ctx) => {
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    // 'Connection': 'keep-alive',
    "Content-Encoding": "identity",
  });
  ctx.body = "123";
});

homeRouter.post("/test", async (ctx) => {
  ctx.body = "this is post /home/test";
});

module.exports = homeRouter;

