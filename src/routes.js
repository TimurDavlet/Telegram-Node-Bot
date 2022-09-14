const apiPathWeather = 'https://api.openweathermap.org/data/2.5';

export const routes = {
    weather: (key) => [apiPathWeather, `/weather?lat=45.250884&lon=-75.800257&lang=ru&appid=${key}&units=metric`].join('/')
};
