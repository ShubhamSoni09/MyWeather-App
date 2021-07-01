

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

// 139c5d06aa5c45fb3edc4120ed89940d

const weatherApi = {
    key: "139c5d06aa5c45fb3edc4120ed89940d",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchBox = document.getElementById('searchInput');

//Event Listener function on key press
searchBox.addEventListener('keypress', (event) =>{
    if(event.keyCode == 13){
        console.log(searchBox.value);
        getWeatherReport(searchBox.value);
        document.querySelector('#weatherbody').style.display = 'block';
    }
});


//Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    })
    .then(showWeatherReport);
}
//Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}`;

    let minimummaximum = document.getElementById('maxmin');
    minimummaximum.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min) / ${Math.ceil(weather.main.temp_max)}&deg;C (max)`;

    let weatherType = document.getElementById('weather-head');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date')
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);

    if(weatherType.textContent=='Clear'){
        document.body.style.backgroundImage = "url('images/clear.jpg')";
    }
    else if(weatherType.textContent== 'Clouds' ){
        document.body.style.backgroundImage = "url('images/cloud.jpg')";
    }
    else if(weatherType.textContent=='Rain'){
        document.body.style.backgroundImage = "url('images/rain.jpg')";
    }
    else if(weatherType.textContent=='Snow'){
        document.body.style.backgroundImage = "url('images/snow.jpg')";
    }
    else if(weatherType.textContent=='Haze'){
        document.body.style.backgroundImage = "url('images/haze.jpg')";
    }
    else if(weatherType.textContent=='Sunny'){
        document.body.style.backgroundImage = "url('images/sunny.jpg')";
    }
    else if(weatherType.textContent=='Thunderstorm'){
        document.body.style.backgroundImage = "url('images/thunderstorm.jpg')";
    }
    else if(weatherType.textContent=='Mist'){
        document.body.style.backgroundImage = "url('images/mist.jpg')";
    }
    else{
        document.body.style.backgroundImage = "url('images/bg.jpg')";
    }
}

function dateManage(dateArg){
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date =  dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}) ${year}`;
}

