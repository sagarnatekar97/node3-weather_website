const request = require("request")

const forcast=(latitude,longitude,callback)=>{
   
    const url= 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=875649bff1e7222628a0ce0be4c6ea3b&limit=1&units=metric&exclude=currunt'
    request({url,json:true},(error,{body})=>{
        const{humidity}=body.main
        const{temp}=body.main
        const{feels_like}=body.main
        const{description}=body.weather

        if(error){
                    callback("unable to connect with service",undefined);
                }
       else if(body.error){
                    callback("there is some error realted to input of url",undefined);
            
                }
        else{
                  
                    callback(undefined,"there is chance of "+ description  +"  because humdity is:"+humidity+" and currunt temprature is "+temp+" and its feels like"+feels_like)
                   
         }

    })
}

// forcast(0,0,(error,data)=>{

//         console.log("error",error);
//         console.log("data",data);
// })
 module.exports=forcast
