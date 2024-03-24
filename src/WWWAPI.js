import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 * Static class tying together methods used to get/send to to the API.
 */

class WWWApi {
  // the token for interactive with the API will be stored here.
//   static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);
   
    const url = `${BASE_URL}/${endpoint}`;
    // const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = method === "get" ? {} : data;

    try {
      return (await axios(({ url, method, data, params}))) ;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get a list of suggested locations based off user input. */

  static async getSuggestions(search) {
    let res = await this.request(`map/suggestions?search=${search}`);
    return res.data.suggestions;
  }

  /** Get coordinates for the searched location by locationID 
   * The locationID is provided with each suggestion
  */

  static async getCoordinates(locationID) {
    let res = await this.request(`map/${locationID}`);
    return res.data.coordinates;
  }

  /** Get 5 day forcast by latitude and longitude coordinates  */

  static async getForecast(lat,lng) {
    let res = await this.request(`weather/forecast?lat=${lat}&lng=${lng}`);
    return res.data.forecast;
  }

  static async convertCode(code){
    let res = await this.request(`weather/codes/${code}`)
    return res
  }

}
// for now, put token ("testuser" / "password" on class)
// JoblyApi.token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//   "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//   "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default WWWApi;