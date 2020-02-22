const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('../../weather-app/utils/geocode');
const forecast = require('../../weather-app/utils/forecast');

const app = express(); //store express application
const port = process.env.PORT || 3000;          // will get port form environment if exist , if not get port 3000

//routes
//app.com
//app.com/help
//app.com/about

//handlebar: help us to use static and render dynamic

// app.get('', (req,res) =>{       //Now is just running on localhost with the port number localhost:3000
//     res.send('Hello express');  // this send is sending back the information to the browser
// });


const publicDirectoryPath = path.join(__dirname,'../public');
const viewaDirectoryPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname,'../templates/partials');

console.log(publicDirectoryPath);

//set handlebar engine and templates location
app.set('view engine', 'hbs');
app.set("views",viewaDirectoryPath);    //set path for templates render pages

//Cach dang ky partial part
// app.set('partials', partialPath); khong phai cach nay
//have to run nodemon instead of node to reset the server, if not the server will be not reset.
hbs.registerPartials(partialPath);

//setup static derectory to serve
app.use(express.static(publicDirectoryPath));   //Save the ROOT webserver -> the default path for the app


//
// app.get('/help.html', (req, res) =>{             //another browse
// //     res.send([{                              //sending back json object
// //         name:'Phuoc',
// //         age:45
// //     },
// //         {name:'Nhoel',
// //         age:55}]);
//  });
//
// app.get('/about.html', (req,res) => {
//    //res.send("<h1>About</h1>");     //in practice we dont write code like this
// });

app.get('', (req,res) => {
    res.render('index',{
        tittle: 'Weather',
        name: 'Nghia Quang',
        name:"Phuoc Quang Index"
    })
});

app.get('/about', (req,res) => {
    res.render('about', {
        tittle: "About",
        song: "This is all about.",
        name:"Phuoc Quang ABout"
    })
});

app.get('/help', (req,res) => {
    res.render('help', {
        tittle: "Help",
        help: "Please help me",
        name:"Phuoc Quang Help"
    })
});



app.get('/weather', (req,res) => {
    if(!req.query.address){
        res.send("This is not query address.")
    }else {
        const countryName = req.query.address;
        //geocode(countryName,(error, data) => {
        geocode.geocode(countryName,(error, {lattitude, longitude, location} )=> {
            if(error){
                return res.send({error});
            }else{
                forecast.forecast(lattitude,longitude,location ,(error,forecastData) => {
                    if(error){
                        return res.send({error});
                    }else{
                        res.send({
                            forecast: forecastData,
                            address: countryName
                        })
                    }
                })
            }
        });

        //console.log(req.query.address);
        //const countryName = req.query.address;
        // res.send({
        //     forecast: 'It is snowing',
        //     location: countryName
        // })
    }

});

app.get('*',(req,res) => {
    res.render('errorpage',{
        tittle:'ERROR',
        name:'Phuoc Quang'
    })
});







//app need to listen an specific port
app.listen(port ,()=> {
    console.log('http://localhost:' + port);
});
//---> keep staying up and runing until we stop it (ctrC)


