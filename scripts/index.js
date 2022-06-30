import { createElement } from "../utillity/utillity.js";
const bottomEl = document.getElementById('bottom');
const middleEl = document.getElementById('middle');
const topEl = document.getElementById('top');

const renderBackground = async () => {
    try {
        // const response = await fetch("https://api.unsplash.com/photos/random/?client_id=YWrg_TjOfr5O6pYWkN8DvgB0XH6GGO9JvhI72gk9TTY&orientation=landscape&query=puppy");
        const response = await fetch("https://apis.scrimba.com/unsplash/photos/random/?orientation=landscape&query=puppys");
        const data = await response.json();
        console.log("Unsplashed Data: ")
        console.log(data)
        if (data.hasOwnProperty("errors")) {
            throw Error('Unable to fetch background from Unsplashed');
        }
        const imageUrl = data.urls.regular;
        const authorName = data.user.name
        const nameEl = createElement('p', {text: `By ${authorName}`})
        bottomEl.append(nameEl)
        document.body.style.backgroundImage = `url(${imageUrl})`
    } catch (error) {
        console.error(error);
        document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1597633611385-17238892d086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTY1ODQ4OTI&ixlib=rb-1.2.1&q=80&w=1080)";
    }
}

const renderCrypto = async () => {
    try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
        if (!response.ok) {
            throw Error("No such coin found");
        }
        const { name, image, market_data } = await response.json();
        const cryptoContainer = document.getElementById('crypto');
        const cryptLogo = createElement('img', { class: ['crypto-thumb'], src: image.small })
        const cryptName = createElement('p', {class: ['crypto-name'], text: name})
        const cryptPrice = createElement('p', { class: ['crypto-price'], text: `💰 Current: £${market_data.current_price.gbp}` })
        const cryptHigh = createElement('p', { class: ['crypto-high'], text: `📈 24h High: £${market_data.high_24h.gbp}` });
        const cryptLow = createElement('p', { class: ['crypto-low'],text: `📉 24h Low: £${market_data.low_24h.gbp}` });
        cryptoContainer.append(cryptLogo, cryptName, cryptPrice, cryptHigh, cryptLow)
/*         console.log("Crypto Name: ")
        console.log(name);
        console.log("Crypto Image: ")
        console.log(image.thumb)
        console.log("Crypto Price: ")
        console.log(market_data.current_price.gbp) */
    } catch (error) {
        console.error(error)
    }
}

const renderTime = () => {
    middleEl.replaceChildren();
    const time = new Date().toLocaleTimeString('en-GB', { timeStyle: 'short', hour12: true });
    const timeEl = createElement('p', { id: "time", text: time })
    middleEl.append(timeEl)
}

const renderWeather = async (lat, long) => {
    const weatherContainer = document.getElementById('weather');
    const apiKey = "4c789e1362a1134b1f375090a5f37bb8";
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`);
    const data = await response.json();
    console.log(data);

    const weatherImg = createElement('img', { class: ["weather-img"], src: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` })
    const location = createElement('p', { class: ['weather-location'], text: data.name })
    const currentTemp = createElement('p', { class: ['weather-current'], text: `Feels: ${Math.floor(data.main.temp)}c` });
    const weatherDescription = createElement('p', { class: ['weather-description'], text: `Looks: ${data.weather[0].description}` })

    weatherContainer.append(weatherImg, location, currentTemp, weatherDescription);
}

renderBackground();
renderCrypto();

navigator.geolocation.getCurrentPosition((position) => {
    const cords = position.coords;
    const lat = cords.latitude;
    const long = cords.longitude; 
    renderWeather(lat, long)
});

const clock = setInterval(renderTime, 1000);