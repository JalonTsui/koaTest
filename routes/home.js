const Router = require("koa-router");
const Stream = require("stream");
const homeRouter = new Router({ prefix: "/home" });
homeRouter.post("/test", async (ctx) => {
  // console.log(ctx.mmm)
  // ctx.body = 'this is get /home/test'
  // ctx.set('Content-Type', 'text/event-stream');
  // ctx.set('Cache-Control', 'no-cache');
  // ctx.set('Connection', 'keep-alive');
  // let data = '123456788'
  // const { pipeline, Readable } = Stream
  // const readableStream = new Readable({
  //     read() {
  //         this.push(data)
  //         this.push(null)
  //     }
  // })
  // ctx.set('Content-Type', 'text/plain')
  // ctx.set('Transfer-Encoding','chunked')
  // await pipeline(readableStream, ctx.res)
  // readableStream.pipe(ctx.res)
  ctx.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  const stream = new Stream.PassThrough();
  ctx.status = 200;
  // for (let i = 0; i < 100; i++) {
  //     console.log('in')
  //     stream.write('1')
  // }
  // console.log(stream)
  // console.log(stream.pipe(ctx.res))
  // stream.write('data:' + JSON.stringify({ nihao: 123 }) + '\n\n')
  // stream.write('data:' + '\n\n321\n\n' + 'data:' + '123' + '\n\n')
  // stream.write('data:' + '321\n\n' + 'data:' + '123' + '\n\n')
  // stream.write('data:' + '|<newline>' + '\n\n')
  // stream.write('data:' + '|<newline>' + '\n\n')
  // stream.write(JSON.stringify({nihao:123}))
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
  // setTimeout(() => {
  //     stream.write('data:123321\n\n')
  // }, 1000)
  // setInterval(() => {
  //     stream.write(`data: ${new Date()}\n\n`);
  // }, 1000);
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
