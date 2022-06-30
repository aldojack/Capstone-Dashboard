const bottomEl = document.getElementById('bottom');

const renderBackground = async () => {
    // const response = await fetch("https://api.unsplash.com/photos/random/?client_id=YWrg_TjOfr5O6pYWkN8DvgB0XH6GGO9JvhI72gk9TTY&orientation=landscape&query=puppy");
    try {
        const response = await fetch("https://apis.scrimba.com/unsplash/photos/random/?orientation=landscape&query=puppysza");
        const data = await response.json();
        if (data.hasOwnProperty("errors")) {
            throw Error('Unable fetch background from unsplashed');
        }
        const imageUrl = data.urls.regular;
        const authorName = data.user.name
        const nameEl = document.createElement('p').textContent = `By ${authorName}`;
        bottomEl.append(nameEl)
        document.body.style.backgroundImage = `url(${imageUrl})`
    } catch (error) {
        console.error(error);
        document.body.style.backgroundImage = "url(https://images.unsplash.com/photo-1597633611385-17238892d086?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTY1ODQ4OTI&ixlib=rb-1.2.1&q=80&w=1080)";
    }
}

const renderCrypto = async () => {
    const response = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
    const data = await response.data();
}

renderBackground();