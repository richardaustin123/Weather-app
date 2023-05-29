const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

function fetchData() {
    const APIKey = 'fed7f82cdec4067920e477da5fda7c31';
    const city = searchInput.value;

    if (city === '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.png';
                    document.body.style.backgroundImage = 'linear-gradient(to bottom right, #ffffff, #f8b500)';
                    document.querySelector('.container').style.boxShadow = '#e4cc8a 0px 3px 8px';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    document.body.style.backgroundImage = 'linear-gradient(to bottom right, #757F9A, #D7DDE8)';
                    document.querySelector('.container').style.boxShadow = 'grey 0px 3px 8px';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    document.body.style.backgroundImage = 'linear-gradient(to bottom right, #ffffff, #c9eeff)';
                    document.querySelector('.container').style.boxShadow = '#c0d8e9 0px 3px 8px';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    document.body.style.backgroundImage = 'linear-gradient(to bottom right, #ffffff, #f1d588)';
                    document.querySelector('.container').style.boxShadow = '#e4cc8a 0px 3px 8px';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    document.body.style.backgroundImage = 'linear-gradient(to bottom right, #dce8f0, #9796f0)';
                    document.querySelector('.container').style.boxShadow = '#a2a0e4 0px 3px 8px';
                    break;

                default:
                    image.src = '';
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';
        });
}

search.addEventListener('click', fetchData);

searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        fetchData();
    }
});

let overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

// Function to update the background and overlay
function updateBackground(weather, gradient) {
  image.src = 'images/' + weather.toLowerCase() + '.png';
  
  // Apply the new background gradient
  document.body.style.backgroundImage = gradient;
  
  // Apply the new overlay opacity
  overlay.style.opacity = 1;
}

// Function to fade out the overlay
function fadeOutOverlay() {
  overlay.style.opacity = 0;
}
