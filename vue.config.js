module.exports = {

    devServer: {
        proxy: "http://127.0.0.1:3000",
        port: 8080, //本地端口
        hot: true,
        open: true, //输入npm run server自动打开网页
    }

}