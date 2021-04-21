const express=require("express");
const mysql=require("mysql");
const bodyparse =require("body-parser");
const cors=require("cors");
const port=process.env.PORT || 3002;

var db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: "restapi"
});
db.connect();
const app=express();
app.use(bodyparse.json());
app.use(cors());
app.use(bodyparse.urlencoded({
    extended:true
}));

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
});

app.get("/",(req,res)=>{
    return res.send({error:true,message:'hello'})
});

app.get("/info",(req,res)=>{
    db.query('SELECT * FROM user',(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data'});
    });
});
app.post("/adduser",(req,res)=>{
    let fname=req.body.fname;
    let mname=req.body.mname;
    let lname=req.body.lname;
    console.log(fname+" "+mname+" "+lname);
    if(!fname && !mname && !lname){
        return res.status(400).send({error: true, message: "please provide information"});
    }
    db.query('INSERT INTO user(fname,mname,lname) value(?,?,?)',[fname,mname,lname],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data added'});
    });
});

app.put("/update",(req,res)=>{
    let id=req.body.id;
    let fname=req.body.fname;
    let mname=req.body.mname;
    let lname=req.body.lname;
    console.log(fname+" "+mname+" "+lname);
    if(!id ||!fname || !mname || !lname){
        return res.status(400).send({error: true, message: "please provide full information"});
    }
    db.query('UPDATE  user SET fname=?,mname=?,lname=? WHERE id=?',[fname,mname,lname,id],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data updated'});
    });
});

app.delete("/delete",(req,res)=>{
    let id=req.body.id;
    
    //console.log(fname+" "+mname+" "+lname);
    if(!id){
        return res.status(400).send({error: true, message: "please provide full information"});
    }
    db.query('DELETE FROM user WHERE id=?',[id],(error,results,fields)=>{
        if(error)throw error;
        return res.send({error:false,data: results,message: 'Complete data deleted'});
    });
});



