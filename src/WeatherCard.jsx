import React, {useEffect,useState} from "react";
import { Forecast } from "./Forcast";
import WWWApi from "./WWWAPI";


export const WeatherCard = ({location}) =>{

    const [currConditions, setCurrConditions] = useState()
    const [forecast, setForecast] = useState()
    const [weatherCondition, setWeatherCondition]= useState()
    const [precipitation, setPrecipitaion] = useState()

    
    useEffect(()=>{
        const getWeatherInfo = async () => {
            const res = await WWWApi.getForecast(location.coordinates[1],location.coordinates[0])
            setCurrConditions(res.shift().values)
            setForecast(res)
          }
        getWeatherInfo()
    },[location]) 
    
  
    useEffect(()=>{
        const convertWeatherCode = async () =>{
            if(currConditions){
            const code = currConditions.weatherCode
            const weather = await WWWApi.convertCode(code)
            setWeatherCondition(weather.data)
            const precipitaionCode = currConditions.precipitationType
            const precipitaion = await WWWApi.convertCode(precipitaionCode)
            setPrecipitaion(precipitaion.data)
            }
        }
        convertWeatherCode()
    }, [currConditions])
     
    console.log("CURRCONDITIONSSET",currConditions)
    return(
   currConditions?
      <div className="weatherCard">
            <div>
                <h3>{(location.name).toUpperCase()}</h3>
                <p className="fs-5 text">{currConditions.temperature}&deg;</p>
                <p>{weatherCondition}</p>
            </div>

            <div className="text-center">
            <p>Wind Speed <i className="bi bi-wind"></i> {currConditions.windSpeed} mph</p>
            <p>{currConditions.precipitationProbability}% chance of {precipitation}</p>  
            </div>

           
            {forecast.map((f) =>
            <Forecast conditions={f}/>
            )}
        </div>
     : <h1>Loding...</h1>
    )
}

