const request = require("request")

const forcast=(latitude,longitude,callback)=>{
   
    const url= 'https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&appid=875649bff1e7222628a0ce0be4c6ea3b&limit=1&units=metric&exclude=currunt'
    request({url,json:true},(error,{body})=>{
        const{humidity}=body.main
        const{temp}=body.main
        const{feels_like}=body.main

        if(error){
                    callback("unable to connect with service",undefined);
                }
       else if(body.error){
                    callback("there is some error realted to input of url",undefined);
            
                }
        else{
                   if(humidity>80){
                    callback(undefined,"there is 70% cahnce of rainbecause humdity is:"+humidity+" and currunt temprature is "+temp+" and its feels like"+feels_like)
                   }
                   else if(humidity>60&&humidity<100){
                    callback(undefined,'there is 50% chance of rain because humdity is:'+humidity+" and currunt temprature is "+temp+" and its feels like"+feels_like)
                   }
                   else{
                    callback(undefined,"there is no 0% chance of rainbecause humdity is:"+humidity+" and currunt temprature is "+temp+" and its feels like"+feels_like)
                   }
                }

    })
}

// forcast(0,0,(error,data)=>{

//         console.log("error",error);
//         console.log("data",data);
// })
 module.exports=forcast
