const Koa = require('koa');
const app = new Koa();
const fs = require('fs');

// 注意require('koa-router')返回的是函数:
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());
const controller = require('./controllers');
app.use(controller());

// log request URL:
function addMapping(router, mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log(`invalid URL: ${url}`);
        }
    }
}

function addControllers(router) {
    var files = fs.readdirSync(__dirname + '/controllers');
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    });
    for (var f of js_files) {
        console.log(`process controller: ${f}...`);
        let mapping = require(__dirname + '/controllers/' + f);
        addMapping(router, mapping);
    }
}

addControllers(router);
// 在端口3000监听:
app.listen(3000, function () {
    console.log('app started at port 3000...');
});