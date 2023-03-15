// This line improt and assign it to the express variable .
const express = require('express');
const bodyParser  = require('body-parser');
const request= require('request');
const https = require("https");


// set-up our server to listen on port 3000
const app = express();
// we providing the path of this static files/page to public->css & images
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res)=>{
  res.sendFile(__dirname + "/signup.html");
});

app.post("/",(req, res)=>{

   const firstName = req.body.fName;
   const lastName = req.body.lName;
  const email = req.body.email;
// This is a data object
  const data = {
     members: [
     {
       email_address: email,
       status: "subscribed",
       merge_fields: {
            FNAME: firstName,
            LNAME: lastName
            
       }
     }
   ]
 };
//flatpack JSON
 const jsonData = JSON.stringify(data);
//});
const url = 'https://us13.api.mailchimp.com/3.0/lists/fe9aa458ec';


const options = {

  method: "POST",
  auth: "ankur1:70e04d9d93db3efb2d7211001c61b4ab-us13"
}



const request = https.request(url, options, (response)=>{


if(response.statusCode === 200){
  // res.send("Successfully subscribed!");
  res.sendFile(__dirname + "/success.html");
} else {
  //res.send("There was an error with signing up, please try again!");
  res.sendFile(__dirname + "/failure.html");
}




response.on("data", (data)=>{
  console.log(JSON.parse(data));

    })
  });

request.write(jsonData);
request.end();
});

// its for when we click on try again button we go again form/signup page
app.post("/failure", (req, res)=>{
  res.redirect('/')
})





// staticily, we are use localhost:3000 but when we upload our code into heroku, then it will use its own server
app.listen(3000,()=>{
  console.log("Server is running on port 3000");

});
//API Key -> Name - Signup-page
//70e04d9d93db3efb2d7211001c61b4ab-us13    is a new key
//e60b9d9e51c75c3df31078d788b3fdba-us13    is a old key

 // Audience ID- fe9aa458ec
 //fe9aa458ec
