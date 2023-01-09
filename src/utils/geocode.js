// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const request=require('request')

const geocode=(address,callback)=>{
    if(!address)
    {
        console.log("please provide address");
    }
    else{

        //  const url1='https://api.openweathermap.org/data/2.5/weather?q='+address+'&q='+state_code+'&q='+country_code+'&appid=875649bff1e7222628a0ce0be4c6ea3b&limit=1&units=metrics'
        const url='https://api.openweathermap.org/data/2.5/weather?q='+address+'&appid=875649bff1e7222628a0ce0be4c6ea3b&limit=1&mode='
    request({url,json:true},(error,{body}={})=>{
        
          
         const {lat:latitude,lon:longitude}=body.coord
         const{name:location}=body
         const {country}=body.sys
       
      
        if(error){
            callback("unbale to connect with service",undefined)
        }
        else if(body.coord.length===0){
            callback("there is some input mismatched try another search>",undefined)
        }
        else{
            const data={
                // latitude:response.body.coord.lat
                // ,longitude:response.body.coord.lon
                // ,location:response.body.name
                latitude,longitude,location,country
                
            }
            callback(undefined,data)
        }
    })

    }

    
}



module.exports=geocode








