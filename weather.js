let input = document.getElementById('Cityname');
let searchbtn = document.getElementById('searchbtn');
let cityNameElement = document.getElementById('city');
let temp = document.getElementById('temp');
let description = document.getElementById('description');
let humidity = document.getElementById('humidity');
let wind = document.getElementById('wind');
let weatherIcon = document.getElementById('weather-icon');
let apiinfo = [];


searchbtn.addEventListener('click', () => {
  let cityname = input.value.trim().toLowerCase();
  console.log(`API will be called with: ${cityname}`);
  apicall(cityname);
});

const apicall = async(cityname) => {
  // let api='https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid={328a216c69db43686481e36949aae0ee}'
   let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=3ba0e5eedae49070b51c85ad8c30def0&units=metric`

  try{

    const response = await fetch(api);
    const json = await response.json();
    apiinfo.push(json);
    if(apiinfo[0].cod == 404){
      cityNameElement.textContent='City not found';
      return;
    }
    cityNameElement.textContent = `Weather in ${cityname}`
    console.log(apiinfo);
    temp.textContent=`${apiinfo[0].main.temp}°C`
    description.textContent=`${apiinfo[0].weather[0].description}`;
    humidity.textContent=`Humidity: ${apiinfo[0].main.humidity}`
    wind.textContent=`Wind Speed: ${apiinfo[0].wind.speed} km/h`

    const iconCode= json.weather[0].icon;
    const iconUrl=`http://openweathermap.org/img/w/${iconCode}.png`;
    weatherIcon.src=iconUrl;
  }
  catch (error){
    console.log('Error fetching data',error);
  }
};

searchbtn.addEventListener('click', ()=>{
    let cityname = input.value.toLowerCase();
    apicall(cityname);
    input.value = '';
    input.focus();
})





