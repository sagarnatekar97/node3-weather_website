const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forcast=require('./utils/forecast')
const geocode=require('./utils/geocode')
const cityName=process.argv[2]

const app = express()
const port=process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))
// console.log(publicDirectoryPath);

app.get('', (req, res) => { 
    res.render('index', {
        title: 'Weather',
        name: 'Sagar Natekar'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sagar Natekar'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sagar Natekar'
    })
})

app.get('/weather', (req, res) => {
  
        const cityName=req.query.address
    if (!req.query.address) {
        return res.send({
            error:'you must provide an address'
        })
    }


    geocode(req.query.address,(error,{longitude,latitude,location,country}={})=>{
    
   if(error){

            return res.send({
                error:'unable to find location'
            });
    }

    forcast(latitude,longitude,(error,forcastData)=>{
       

        if(error){
            return res.send({
                error:'forcast not avialable for given location'
            });
        }

        res.send({
            location,forcastData,cityName:req.query.address,country:country
        })
        
})
})
})

app.get('/weather/*',(req,res)=>{

    return res.send("enter valid address")
})


//use route for quarystring understanding
// app.get('/product',(req,res)=>{
//      const name=req.query.name
//     if(!req.query.search){

//         return res.send({
//             error:'there is not search term present wich you get!'
//         })
//     }
    
//     console.log(req.query.search);
//     console.log(req.query.name);
//     res.send({
//         product:[]
//     })

// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port 3000.')
})
