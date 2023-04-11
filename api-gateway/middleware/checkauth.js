// exports.authentication = async(req , res , next)=>{
//     console.log(req.headers);
//     next();
// }
const authentication = async(req , res , next)=>{
    if(req.headers.token && req.headers.token != ''){
        next()
    }else{
        res.setHeader('content-type','application/json');
        res.statusCode = 401;
        res.end(JSON.stringify({status:401,message:'Authentication fail'}))
    }
  
}
module.exports=authentication
