//Information about API endpoints
const apiURL = 'https://api.giphy.com/v1/gifs'
const apiKEY = '10e4S0eX3TaExnAj3HR7Ajuc18uiHQBj'
const apiENDPOINTS = {
    search: `${apiURL}/search?api_key=${apiKEY}&limit=16&q=`,
    trending: `${apiURL}/trending?api_key=${apiKEY}&limit=16`,
    random: `${apiURL}/random?api_key=${apiKEY}&tag=`,
    upload: `https://upload.giphy.com/v1/gifs?api_key=${apiKEY}`
}

//Searches gifs by its id
function setSrcGif(imgid, gifid){
    document.getElementById(imgid).src = 'https://i.giphy.com/media/' + gifid + '/giphy.webp'
}

//Calls API id
const getId = async (endpoint, imgId) => {
    try {
        const res = await fetch(endpoint)
        const json = await res.json()
        return setSrcGif(imgId, json.data.id)
    } catch (error) {
        console.log(error)
    }
}

//Calls API data
const getData = async(endpoint) => {
    try {
        const res = await fetch(endpoint)
        const data = await res.json()
        return data.data
    } catch (error) {
        console.log(error)
    }
}

//Calls Random Endpoint
const apiCallRandom = (tag, imgId) => {
    getId(`${apiENDPOINTS.random}` + tag, imgId);
}

//Calls Trending Endpoint
const apiCallTrending = async () => {
    let apiCallTrending = await getData(`${apiENDPOINTS.trending}`);
    await showGifs(apiCallTrending);
}


//Calls Search Endpoint
const apiCallSearch = async search => {
    let apiCallSearch = await getData(`${apiENDPOINTS.search + search}`);
    await showGifs(apiCallSearch);
}

//Creates img tag to show the gif
const showGifs = gifs => {
    let $container = document.getElementById("trending-container");
    $container.innerHTML = '';
    for (const index in gifs) {
        let gif = gifs[index]
        let figure = document.createElement('figure');
        let img = document.createElement('img');
        let caption = document.createElement('figcaption');
        let p = document.createElement('p');

        img.setAttribute("width", "286");
        img.setAttribute("height", "296"); 
        img.setAttribute("style", "margin: 8px 9px");
        img.src = gif.images.downsized.url;
        img.alt = gif.title;
        
        p.innerHTML = "#TrendingGifs";
    
        figure.appendChild(img);
        figure.appendChild(caption);
        caption.appendChild(p);
        $container.appendChild(figure);
    }

    //export default getData
}