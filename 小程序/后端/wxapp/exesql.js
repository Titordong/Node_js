function exesql(){
	var pool;//good
	var mysql=require('mysql');
	/*var connection=mysql.createConnection({
		host:'localhost',
		user:'root',
		password:"123456",
		database:'ArrangeManage'
	});*/
	var options={
		host:'localhost',
		user:'root',
		password:"123456",
		database:'ArrangeManage'
	};
	this.init=function(){	
		connection.connect();
		console.log('init');
	};
    function hasUser(results) {
        if(results.length == 0) {
            return {err: 1, msg: "此用户名不存在"};
        }
        else {
            return results;
        }
    }

	this.getUser = function(callback){
	    return getUserList(callback);
	}
	this.getUserList=function(){
		pool=mysql.createPool(options);
		var sql="SELECT *FROM Info";
		return new Promise(function(resolve,reject){
			pool.getConnection(function(err,conn){
				if(err){
					reject(err);
				}
				else {
					conn.query(sql,null,function(err,results,field){
						conn.release();
						if(err){
							reject(err);
						}
						else resolve(results,field);
					})
				}
			})
				
		});
		
		// var tag=0;
		// connection.query(sql, function (error, results) {
	 //  		if (error) throw error;
	 //  		else {
	 //  			var res = hasUser(results)
	 //        	callback(res);
	 //        }
		// 	// console.log(typeof(results));	
		// 	// return 111;
		// 	// return JSON.stringify(results);
		// });
	};
	this.getMe=function(id){
      	pool=mysql.createPool(options);
		var sql="SELECT *FROM List WHERE id="+id;
		return new Promise(function(resolve,reject){
			pool.getConnection(function(err,conn){
				if(err){
					reject(err);
				}
				else {
					conn.query(sql,null,function(err,results,field){
						conn.release();
						if(err){
							reject(err);
						}
						else resolve(results,field);
						console.log('get me');
					})
				}
			})
				
		});
	};
	this.sleep=function(time){
		setTimeout(function(){
		},time);
	}
    this.query=function(sql){
      	pool=mysql.createPool(options);
		return new Promise(function(resolve,reject){
			pool.getConnection(function(err,conn){
				if(err){
					reject(err);
				}
				else {
					conn.query(sql,null,function(err,results,field){
						conn.release();
						if(err){
							reject(err);
						}
						else resolve(results,field);
					})
				}
			})
				
		});
    }
	this.setMe=function(id,str){
      	pool=mysql.createPool(options);
		var sql="UPDATE List SET Classlist= '"+str+"' WHERE id="+id;
		return new Promise(function(resolve,reject){
			pool.getConnection(function(err,conn){
				if(err){
					reject(err);
				}
				else {
					conn.query(sql,null,function(err,results,field){
						conn.release();
						if(err){
							reject(err);
						}
						else resolve(results,field);
						console.log('update me');
					})
				}
			})
				
		});
	};
  this.getWork=function(str){
    	pool=mysql.createPool(options);
		var sql="SELECT *FROM Personal_list WHERE Name='"+str+"'";
		return new Promise(function(resolve,reject){
			pool.getConnection(function(err,conn){
				if(err){
					reject(err);
				}
				else {
					conn.query(sql,null,function(err,results,field){
						conn.release();
						if(err){
							reject(err);
						}
						else resolve(results,field);
						console.log('getWork');
					})
				}
			})
		})
	};
	this.close=function(){
		connection.end();
		console.log('close');
	};
};
function get(){
	exe=new exesql();
	var promise=exe.getUserList();
	promise.then(function(results,field){
		console.log(results);
	},function(err){
		console.log(err);
	})
}

// exe.init();


// exe.getMe(1);
// exe.setMe(1,"110");
// exe.close();
module.exports=exesql;
