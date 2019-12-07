// server.js
// var fs =require('fs');
// var data = fs.readFileSync('input.txt');
// console.log(data.toString());
// var hander=function(err,data){
// 	if(err)return console.error(err);
// 	console.log(data.toString());
// }
// fs.readFile('input.txt',hander);
// // console.log('finsh');
// var events=require('events');
// var eventEmitter=new events.EventEmitter();
// var connectHander=function(){
// 	console.log('connect success');
// 	eventEmitter.emit('data_received');
// }
// eventEmitter.on('connection',connectHander);
// eventEmitter.on('data_received',function(){
// 	console.log('data received success');
// });

// setTimeout(function(){
// 	eventEmitter.emit('connection');
// },200);
// console.log('finsh');
// const buf=Buffer.from('runoob','utf8');
// // console.log(buf);
// console.log(buf.toString('ascii',0,1));
// const str=buf.toJSON();
// console.log(str);
// var buf=Buffer.alloc(100);
// for(var i=0;i<20;i++){
// 	buf[i]=i+97;
// }
// for(var i=0;i<20;i++){
// 	console.log(buf[i]);
// }
// console.log(buf.toString('ascii',0,5));

// const buf=Buffer.from([0x0,0x1,0x2,0x3,0x4,0x5]);
// // console.log(buf.toString());
// const json=JSON.stringify(buf);
// console.log(json);
// const str=JSON.parse(json,(key,value)=>{
// 	return value&&value.type==='Buffer'?
// 		Buffer.from(value.data):
// 		value;
// });
// console.log(str);

var http=require('http');
var url=require('url');
function start(route){
	function onRequest(request,response){
		var pathname=url.parse(request.url).pathname;
		console.log('Request for '+pathname+'received.');
		route(pathname);
		response.writeHead(200,{'Content-Type':"text/plain"});
		response.write('hello world');
		response.end();
	}
	http.createServer(onRequest).listen(5555);
	console.log('Server has started');
}
exports.start=start;

