const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();
const multer = require('multer')
const cors = require('cors');
require('./db/database');
const Users = require('./Model/Modeluser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
const middleware = require('./middleware/middleware');
const auth = require('./middleware/auth');
app.use("/img", express.static("./img"));

app.get('/mytest', auth, function () {
    res.send("this is my first page")
})

// User Register


app.post('/user_register', function (req, res) {

    console.log(req.body);

    var email = req.body.email;
    var password = req.body.password;
    var phonenumber = req.body.phoneNumber;
    var bloodgroup = req.body.bloodGroup;
    var address = req.body.address;
    var age = req.body.age;

    /// variable name : htmlform name

    var User_register = new Users({

        'email': email,
        'password': password,
        'phonenumber': phonenumber,
        'bloodgroup': bloodgroup,
        'address': address,
        'age': age

        // Rows name:  variable name

    });
    User_register.save().then(function () {
        console.log("Successfull");
        res.json("New User Added");
    }).catch(function (e) {
        res.send(e)

    })
});

//login
app.get('/users/me', auth, function (req, res) {
    res.send(req.user);
})

app.post("/login", async function (req, res) {
    const username=req.body.email;
    const password=req.body.password;
    // username  body name
    const user1 = await Users.checkCrediantialsDb(username, password);
    const token = await user1.generateAuthToken();
    res.json({token:token,
        
        

        email:user1.email
    });
    console.log("Login Sucessful.");
 
}
)

app.get("/getuser",function(req,res){
Users.find().then(function(user){

console.log(user)
    res.json(user);
})

})
app.listen(9000);



