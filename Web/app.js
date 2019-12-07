// app.js
var express=require('express');
const app=express();
app.use((request,resopnse,next)=>{
	resopnse.write('resopnse from express');
	resopnse.end();
});
const port=5555;
app.listen(port);