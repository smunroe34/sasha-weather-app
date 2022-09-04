let now = new Date();
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

let date = now.getDate();
let hour = now.getHours();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
if (hour < 10) {
  hour = "0" + hour;
}

h1.innerHTML = `${day}, ${month} ${date}`;
h2.innerHTML = `${hour}:${minutes}`;

let apiKey = "dc55516602874d9b155a4733747850c9";
let city = "france";
let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric`;

function changeCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-text-input");

  let h3 = document.querySelector("h3");
  if (cityInput.value) {
    h3.innerHTML = `${cityInput.value}`;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&units=metric&appid=${apiKey}`
      )
      .then(showTemperature);
  } else {
    alert("Please enter a city");
  }
}
let searchForm = document.querySelector("#form-input");
searchForm.addEventListener("submit", changeCity);

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("h4");
  temperatureElement.innerHTML = `${temperature} ℃`;
  let description = document.querySelector("#status");
  description.innerHTML = response.data.weather[0].description;
}

function submit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input").value;
  changeCity(city);
}
let form = document.querySelector("#form-input");
form.addEventListener("submit", changeCity);

axios.get(`${apiURL}&appid=${apiKey}`).then(showTemperature);

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
function getPosition(position) {
  let apiKey = "dc55516602874d9b155a4733747850c9";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showCurrentTemperature);
}

function showCurrentTemperature(response) {
  let h3 = document.querySelector("h3");
  h3.innerHTML = `${response.data.name}`;

  showTemperature(response);
}

let currentButton = document.querySelector("#currentbutton");
currentButton.addEventListener("click", getCurrentPosition);

//C to F
//function convertToFahrenheit(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector(".temperature");
//temperatureElement.innerHTML = 78;
//}

//function convertToCelsius(event) {
//event.preventDefault();
//let temperatureElement = document.querySelector(".temperature");
//temperatureElement.innerHTML = 23;
//}
//let fahrenheitLink = document.querySelector("#fahrenheit-link");
//fahrenheitLink.addEventListener("click", convertToFahrenheit);

//let celsiusLink = document.querySelector("#celsius-link");
//celsiusLink.addEventListener("click", convertToCelsius);

//


