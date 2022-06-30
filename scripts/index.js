import { createElement } from "../utillity/utillity.js";
const bottomEl = document.getElementById('bottom');
const middleEl = document.getElementById('middle');
const topEl = document.getElementById('top');


const renderBackground = async () => {
    // const response = await fetch("https://api.unsplash.com/photos/random/?client_id=YWrg_TjOfr5O6pYWkN8DvgB0XH6GGO9JvhI72gk9TTY&orientation=landscape&query=puppy");
    try {
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
        const cryptLogo = createElement('img', { class: ['crypto-thumb'], src: image.thumb })
        const cryptName = createElement('p', {class: ['crypto-name'], text: name})
        const cryptPrice = createElement('p', {class: ['crypto-price'], text: `Current Price: ${market_data.current_price.gbp}`})
        cryptoContainer.append(cryptLogo, cryptName, cryptPrice)
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

renderBackground();
renderCrypto();