const API_KEY = "80d1993378fa9e47ffc9c7fec53fe1d2";
const API_URL = "https://api.openweathermap.org/data/2.5/forecast?lat=8.94823&lon=46.05008&units=metric&appid=" + API_KEY;

fetch(API_URL)
  .then(response => response.json()) 
  .then(data => displayData(data))
  .catch(error => displayError(error))

function displayData(data){
    console.log(data);

    const FORECAST = data.list;
    console.log(FORECAST);
    
    for (let item of FORECAST){
        const DATE_TIME = item.dt_txt;
        const DATE = DATE_TIME.substring(0,10);
        const TIME = DATE_TIME.substring(11,13);
        const TEMP = item.main.temp;
        console.log(DATE, TIME, TEMP);
    }



}

function displayError(error){
    console.log(error);
}