const previewGif = blob => {
    document.getElementById("video-container2").src = URL.createObjectURL(blob);
};

const saveGifInLocalStorage = async gifId => {
    const actualGifs = JSON.parse(localStorage.getItem('myGifs')) || []
    const newGifs = [...actualGifs, gifId];
    localStorage.setItem('myGifs', JSON.stringify(newGifs));
}

const sendGifToApi = async blob => {
    const data = new FormData();
    data.append('file', blob, 'myGifs.gif');
    const res = await fetch('https://upload.giphy.com/v1/gifs?api_key=10e4S0eX3TaExnAj3HR7Ajuc18uiHQBj', {method: 'POST', mode: 'cors', body: data});
    const json = await res.json();
    await saveGifInLocalStorage(json.data.id);
    return json.data.id;
}