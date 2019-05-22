const Koa = require('koa');
const koaBody = require('koa-body');
const cors = require('koa2-cors');
const pageRouter = require('./routers/page')
let app = new Koa(); // 创建服务器对象

app.listen(4001, () => {
    console.log(`服务器启动在4001端口`);
    // 模板字符串，可以包含换行和嵌入变量
});



app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024 // 设置上传文件大小最大限制，默认2M
    }
}));

// 具体参数我们在后面进行解释
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return "*"
        return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))


app.use(pageRouter.routes());
