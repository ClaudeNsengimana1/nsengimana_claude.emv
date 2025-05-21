const express=require('express');
const mysql=require('mysql');
const cors=require('cors')
const bodyParser=require('body-parser');
const session = require("express-session");
const app=express();
const port=3000;


app.use(cors({
    origin: 'http://localhost:5173', // my  frontend URL
    credentials: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
    secret: "secret123", // change to your secret
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 } // 1 hour
}));
 

// set viesw engine to ejs
app.set('view engine','ejs');
app.set('views','./views');


const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'CWSMS'
});
db.connect((err)=>{
    if(err){
        console.log('Error connecting to database:', err);
        return;
    }
    else
    console.log('Connected to database');
}
);

app.get('/h',(req,res)=>{
    res.send('Hello World');
});




app.post('/insert',(req,res)=>{
    const {username,userEmail,password}=req.body;
    const sql='INSERT INTO users(username,userEmail,password) VALUES (?,?,?)';
    db.query(sql,[username,userEmail,password],(err,result)=>{
        if(err){
            console.log('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        else{
            console.log('Data inserted successfully');
            res.status(200).send('Data inserted successfully',result);
        }
    }
    );
}
);

//---------select data-----

app.get('/select',(req,res)=>{

    const sql='SELECT * FROM  package ';
    db.query(sql,(err,result)=>{
        if(err){
            console.log('Error selecting data:', err);
            res.status(500).send('Error selecting data');
            return;
        }
        else{
            console.log('Data selected successfully');
            res.status(200).send(result);
        }
    }   
    );
}
);
//------update data in student_record table
 app.put('/update/:PackageNumber',(req,res)=>{
    const PackageNumber=req.params.PackageNumber;

    const sql='UPDATE package SET PackageName=?,PackageDescription=?,PackagePrice=? WHERE PackageNumber=?';
    db.query(sql,[req.body.PackageName,req.body.PackageDescription,req.body.PackagePrice,PackageNumber],(err,result)=>{
        if(err){
            console.log('error to edit',err);
            res.status(500).send('Error updating data');
            return;
        }
        else{
            console.log('Data updated successfully');
            res.status(200).send('Data updated successfully',result);
        }
    }
    );
}); 


 

// ---------add new record in student_record table

app.post('/add',(req,res)=>{
    const {PackageName,PackageDescription,PackagePrice}=req.body;
    const sql='INSERT INTO package (PackageName,PackageDescription,PackagePrice) VALUES (?,?,?)';
    db.query(sql,[PackageName,PackageDescription,PackagePrice],(err,result)=>{
        if(err){
            console.log('Error inserting data:', err);
            res.status(500).send('Error inserting data');
            return;
        }
        else{
            console.log('Data inserted successfully');
            res.status(200).send('Data inserted successfully',result);
        }
    }
    );
});

//---------- DELETE DATA--------

app.delete('/delete/:stId',(req,res)=>{   
    const stId=req.params.stId;
    const sql='DELETE FROM student_record WHERE stId=?';
    db.query(sql,[stId],(err,result)=>{
        if(err){
            console.log('Error deleting data:', err);
            res.status(500).send('Error deleting data');
            return;
        }
        else{
            console.log('Data deleted successfully');
            res.status(200).send('Data deleted successfully',result);
        }
    }
    );
});
  



app.post("/login", (req, res) => {
    const { userEmail, password } = req.body;

    const query = "SELECT * FROM users WHERE userEmail = ? AND password = ?";
    db.query(query, [userEmail, password], (err, data) => {
        if (err) return res.json({ error: "Database error" });
        if (data.length > 0) {
            req.session.user = data[0];
            res.json({ message: "Login successful", user: data[0] });
        } else {
            res.json({ error: "Invalid email or password" });
        }
    });
});

// CHECK IF LOGGED IN
app.get("/check", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

// LOGOUT
app.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid"); // This removes the session cookie
    res.json({ message: "Logged out" });
  });
});





app.listen(port,(console.log(`Server is running on port http://localhost:${port}`)));