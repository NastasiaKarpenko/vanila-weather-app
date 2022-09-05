function formatDate(timeStamp) {
    let date = new Date(timeStamp);
    let hours = date.getHours();
    if (hours < 10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`
    }

    let days = [
        "Sunday", 
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thursday", 
        "Friday", 
        "Saturday"
    ]
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`
}

function displayForecast(response){
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");

    let days = [ 
    "Tue", 
    "Wed", 
    "Thu", 
    "Fri", 
    "Sat"
] 
let forecastHTML = `<div class = "row">`;
  
    days.forEach(function(day){
        forecastHTML = forecastHTML + `
                    <div class="col-2">
                        <div class="weather-forecast-date">
                        ${day}</div>
                        <img src="http://openweathermap.org/img/wn/04n@2x.png" alt="icon"
                        width="42">
                        <div class="weather-forecast-temperature">
                            <span class="weather-forecast-temperature-max">18°</span>
                            <span class="weather-forecast-temperature-min">12°</span></div>
                    </div>`;
})
                
forecastHTML = forecastHTML + `</div>`
forecastElement.innerHTML  = forecastHTML
//console.log(response.data); Чому додавання цього рядк аруйнує виконання коду

}


function getForecast (coordinates){
    let apiKey = "8a7de93c990a0dc559c3544abf223aef"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&unitas=metric`;
console.log(apiUrl);
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
    let temperatureElement = document.querySelector("#temperature");
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let dateElement = document.querySelector("#date");
    let iconElement = document.querySelector("#icon");


    celsiusTemperature = Math.round(response.data.main.temp);

    temperatureElement.innerHTML = Math.round(response.data.main.temp);
    cityElement.innerHTML = response.data.name;
    descriptionElement.innerHTML = response.data.weather[0].description;
    humidityElement.innerHTML = response.data.main.humidity;
    windElement.innerHTML = Math.round(response.data.wind.speed);
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
    iconElement.setAttribute(
        "src", 
        `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    iconElement.setAttribute(
        "alt",
        response.data.weather[0].description);

        getForecast(response.data.coord)
    }

    function search(city) {
        let apiKey = "8a7de93c990a0dc559c3544abf223aef";
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        axios.get(apiUrl).then(displayTemperature);
        }

    function handleSubmit(event) {
        event.preventDefault();
        let cityInputElement = document.querySelector("#city-input");
        search(cityInputElement.value);
         }

       function  displayFahrenheitTemperature (event){
           event.preventDefault();
            let temperatureElement = document.querySelector("#temperature");
            //remove the active class the celsius list
           let celsiusLink=document.querySelector("#celsius-link");
           let fahrenheitLink=document.querySelector("#fahrenheit-link");
            celsiusLink.classList.remove("active");
            fahrenheitLink.classList.add("active")
            let fahrenheitTemperature = (celsiusTemperature*9)/5+32;
          
           temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
       }
       function displayCelsiusTemperature(event) {
           event.preventDefault();
           let temperatureElement = document.querySelector("#temperature");
          
          let celsiusLink=document.querySelector("#celsius-link");
          let fahrenheitLink=document.querySelector("#fahrenheit-link");
            celsiusLink.classList.add("active");
            fahrenheitLink.classList.remove("active")
            
            temperatureElement.innerHTML = celsiusTemperature;
           console.log(temperatureElement.innerHTML);
       }

    function main() {

let celsiusTemperature = null;
displayForecast();
search("New York");
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);


let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature)

let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature)

         }
