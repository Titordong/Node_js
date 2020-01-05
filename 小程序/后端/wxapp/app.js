const express=require('express');
var exesql=require('./exesql');
var exe=new exesql;
const app=express();
var bodyParser = require('body-parser');
 
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/re',(req,res,next)=>{
	var mysql=require('mysql');
	var connection=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:"123456",
		database:'demo'
	});
		
	connection.connect();
	var sql="SELECT *FROM event";
	connection.query(sql, function (error, results) {
	  	if (error) throw error;
		console.log('search once');
		res.send(results);
		res.end();
	});
});
app.use('/login',(req,res,next)=>{
  var sql="SELECT * FROM Info WHERE Name='"+req.query['Name']+"'";
  var promise=exe.query(sql);//exe.getMe(id);
	promise.then(function(results,field){
     	res.send(results);
      	res.end();
		//console.log(results);
	},function(err){
		console.log(err);
	})
});
app.use('/getme',(req,res,next)=>{
	id=JSON.parse(req.query['id']);
  	console.log(id)
  	var sql="SELECT *FROM List WHERE id="+id;
  	var promise=exe.query(sql);//exe.getMe(id);
	promise.then(function(results,field){
     	res.send(results);
      	res.end();
		//console.log(results);
	},function(err){
		console.log(err);
	})
});
app.use('/getwork',(req,res,next)=>{
 
  str=req.query['Name'];
  var sql="SELECT *FROM Personal_list WHERE Name='"+str+"'";
  var promise=exe.query(sql);//exe.getWork(str);
  promise.then(function(results,fiels){
    res.send(results);
    res.end();
  },function(err){
    console.log(err);
  })
});
app.use('/send',(req,res,next)=>{
	console.log(typeof(req.query['list']));
	data=JSON.parse(req.query['list']);
	console.log(data);
	var str="";
	for(var i=0;i<6;i++){
		for(var j=0;j<7;j++){
			if(data[i*10+j]==1)
              str=str+'1';
          	else str=str+'0';
		}
		
	}
  	console.log(str);
  var sql="UPDATE List SET Classlist= '"+str+"' WHERE id="+req.query['id'];
	var promise=exe.query(sql);//exe.setMe(req.query['id'],str);;
	promise.then(function(results,field){
     	//res.send(results);
      	res.end();
		//console.log(results);
	},function(err){
		console.log(err);
	})
	/*res.send("good");
	res.end();*/
});
app.use('/getUserList',(req,res,next)=>{
	
	/*var mysql=require('mysql');
	var connection=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:"123456",
		database:'ArrangeManage'
	});*/
  	var sql="SELECT *FROM Info";
  	var promise=exe.query(sql);//exe.getUserList();
	promise.then(function(results,field){
     	res.send(results);
      	res.end();
      	
		//console.log(results);
	},function(err){
		console.log(err);
	})
  	/*return ;
	connection.connect();
	var sql="SELECT *FROM Info";
	connection.query(sql, function (error, results) {
	  	if (error) throw error;
		console.log('get User List');
		res.send(results);
		res.end();
	});*/
});
app.use((req,res,next)=>{
	res.write('response ');
	res.end();
});	
var port=7777;
app.listen(port,function(){
	console.log('Server is running');
});
