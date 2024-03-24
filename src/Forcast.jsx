import React, {useState, useEffect} from "react"
import moment from 'moment'
import WWWApi from "./WWWAPI"

export const Forecast = ({conditions}) =>{
    const [weatherCondition, setWeatherCondition]= useState()

    useEffect(()=>{
        const convertWeatherCode = async () =>{
            const code = conditions.values.weatherCode
            const weather = await WWWApi.convertCode(code)
            console.log("WEATHERCODE", weather)
            setWeatherCondition(weather.data)
        }
        convertWeatherCode()
    }, [conditions.values.weatherCode])
    
                

    return(

        <div className="Forecast container text-center ">
            <div className="row">
            <div className="col" key={conditions.startTime}>
                  <p>{moment.utc(conditions.startTime).format('ddd')}</p>
                </div>
                <div className="col"> 
                    <p>{conditions.values.temperature}&deg;</p>
                </div>
                <div className="col">
                  <p>{weatherCondition}</p>
                </div>
               
            </div>
        </div>

    )
}