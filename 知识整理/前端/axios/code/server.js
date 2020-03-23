const app=require('express')();
app.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.writeHead(200,{'Content-Type':'text/json;charset=utf-8'});
    next();
})
app.get("/",function(req,res){
  res.end('hello');
})
app.get("/api/loginIn",function(req,res){
  res.end('你已经登录');
})
app.get("/api/loginOut",function(req,res){
  res.end('你已经登出');
})
app.get("/api/shopList",function(req,res){
  res.end('这是一个商品列表');
})
app.listen(9002);