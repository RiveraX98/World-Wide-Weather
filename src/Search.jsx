import React, {useState} from "react";
import { Form } from "react-router-dom";
import { Button } from "reactstrap";
import WWWApi from "./WWWAPI";


export const Searchbar =({moveToCoordinates})=>{
    const [search , setSearch] = useState("")
    const [suggested, setSuggested] = useState()

      const handleChange = async (e) => {
        //update input value and get suggested locations
        setSearch(e.target.value);
        if(search.length >= 2){
            const res = await WWWApi.getSuggestions(search)
            setSuggested(res)
        }
      };

      const addSuggestionToInput = (text,id) =>{
        //add value to input field and stop showing suggestions
        setSearch(text)
        setSuggested(null)
        searchLocation(text,id)
        console.log("LOCATIONID:",id)
      }

      const searchLocation= async (name,locationID) => {
        //get the coordinates to suggestion clicked 
        const coordinates = await WWWApi.getCoordinates(locationID)
        console.log("SEARCH",search)
        moveToCoordinates({name:name, coordinates:coordinates})
      };

    return(
        <div>
          <Form  className="searchbar" method="get" onSubmit={searchLocation}>
            <div className="row gx-0">
                <input
                className="col-10"
                  type="text"
                  name="location"
                  placeholder="Search Location"
                  value={search}
                  onChange={handleChange}
                />
            
              <div className="col-2">
                <Button color="primary">
                  Search
                </Button>
              </div>
            </div>
          </Form>
          <div className="col-10">
            <div className="suggestions" >
             {suggested?.map((s)=>(
              <div className="suggestion" name={s.name} id={s.mapbox_id} key={s.mapbox_id} onClick={()=>addSuggestionToInput(s.name,s.mapbox_id)}>
              <b>{s.name}</b>
              <p className="fs-6 fw-light">{s.place_formatted}</p>
              </div>
         ))}
         </div>
         </div>
          </div>
    )
}


  