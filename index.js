// index.js
var server=require('./server');
var router=require('./router');
// server.start(router.route);
var fs=require('fs');
console.log('ready for open');
fs.stat('input.txt',function(err,stats){
	if(err){
		console.error(err);
	}
	console.log(stats);
	console.log('read finish');
	console.log("is file?"+stats.isFile());
})