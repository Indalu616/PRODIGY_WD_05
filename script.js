const searchBtn = document.getElementById("search");

const city = document.getElementById("city-name");
const HumidityInfo = document.getElementById("humid");
const cityName = document.getElementById("city");
const weatherInfoBox = document.getElementById("info");
const Loader = document.getElementById("loader");
const Sky = document.getElementById("sky");
const messageText = document.getElementById("err");
const messageBox = document.getElementById("message");

searchBtn.addEventListener("click", getData);
city.addEventListener("input", () => {
  weatherInfoBox.style.display = "none";
  messageBox.style.display = "none";
});

function getData() {
  const city_name = city.value;

  const API_KEY = "d81452bff2cf574a23e7b55689f83463";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) =>
      getTemperature(
        data.main.temp,
        data.name,
        data.main.temp,
        data.weather[0].description
      )
    )
    .catch((err) => displayErr(err));
  //
}
function getTemperature(temp, CityName, Humid, sky) {
  weatherInfoBox.style.display = "block";
  weatherInfoBox.style.transform = `translateY(0%)`;
  weatherInfoBox.style.opacity = 1;
  city.value = "";
  cityName.innerText = `${CityName}`;

  const tempCelcius = temp - 273.15;
  const temperature = document.getElementById("temp");
  temperature.innerText = `${tempCelcius.toFixed(2)} °C`;
  HumidityInfo.innerText = `${Humid}`;
  Sky.innerText = `${sky}`;
}
function displayErr(err) {
  city.value = "";
  if (err) {
    messageBox.style.display = "block";
    messageText.innerText = "Please enter a valid city name !";
  }
}
