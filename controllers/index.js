const mysql = require('../mysql/index.js');

var fn_hello = async (ctx, next) => {
    var name = ctx.params.name;
    ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};
// 查询hez数据库

var test = async (ctx, next) => {
    await next();
    let request = ctx.request;
    let _sql = `SELECT * FROM upload`
    let data = await mysql.query(_sql);
    console.log(ctx.query);
    // console.log(request);
    // console.log(request.origin);
    // console.log(request.href);
    ctx.body = data;
    /*  let findHez1 = function () {
        let _sql = `SELECT * FROM upload`
        return mysql.query(_sql)
    } 
    let data = await findHez1();
    */
}
module.exports = {
    'GET /hello/:name': fn_hello,
    'GET /test': test
};