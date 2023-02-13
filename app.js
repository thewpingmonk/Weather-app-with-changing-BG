//select element
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notification");




//app data
const weather = {};

weather.temperature = {
    unit: "celsius"
}

const kelvin = 273;
const key = "4216f559be8570e098926f693a581168";

//check if browser support geo location
if('geolocation' in navigator)
{
    navigator.geolocation.getCurrentPosition(setPosition , showError);
}
else
{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Browser doesn't support Geolocation</p>";
}
//user location
function setPosition(position)
{
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude , longitude);
}

//show error
function showError(error)
{
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

//get weather
function getWeather(latitude , longitude)
{
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
        .then(function(response)
        {
            let data = response.json();
            return data;
        })
        .then(function(data){
                weather.temperature.value = Math.floor(data.main.temp - kelvin);
                weather.description = data.weather[0].description;
                weather.iconId = data.weather[0].icon;
                weather.city = data.name;
                weather.country = data.sys.country;
        })
        .then(function(){
            displayWeather();
        });
}

//display weather
function displayWeather()
{
    iconElement.innerHTML = `<img src = "icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
    console.log(window.screen.width);
    if(window.screen.width <= 1500)
    document.body.style.backgroundImage = `url("mobile/${weather.iconId}.jpg")`;
    else
    document.body.style.backgroundImage = `url("background/${weather.iconId}.jpg")`;
}
//C to F
function ctof(temp)
{
    return (temp * 9/5) + 32;
}
//when user click
tempElement.addEventListener("click" , function(){
    if(weather.temperature.value === undefined) return;

    if(weather.temperature.unit == "Celsius")
    {
        let fahrenheit = ctof(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        tempElement.innerHTML = `${fahrenheit} °<span>F</span>`;
        weather.temperature.unit = "Fahrenheit";
    }
    else
    {
        tempElement.innerHTML = `${weather.temperature.value} °<span>C</span>`;
        
        weather.temperature.unit = "Celsius";
    }
});