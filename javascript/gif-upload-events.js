document.addEventListener("DOMContentLoaded", async () => {
    const $container = document.getElementById("guifos-container");
    const $videoContainer = document.getElementById("video-container");
    const $videoContainer2 = document.getElementById("video-container2");
    const $pinkButtons = document.querySelector(".pink-buttons");
    const $startButton = document.getElementById("pinkButtons");
    const $redButtons = document.querySelector(".red-buttons");
    const $stopButton = document.getElementById("redButtons");
    const $otherButtons = document.querySelector('.other-buttons');
    const $repeatButton = document.querySelector('.repeat-button');
    const $uploadButton = document.querySelector('.upload-button');
    const $cancelButton = document.querySelector('.cancel-button');
    const $littleBarTitle = document.querySelector('.little-bar-title');
    const $whiteBackground = document.querySelector('.white-background');
    const $downloadButton = document.querySelector('.download');
    const $copyURLbutton = document.querySelector('.copyURL');
    const $recordingWindow = document.querySelector('.window');
    const $gifUploadedWindow = document.querySelector('.gif-uploaded');
    const $littleGif = document.getElementById("little-gif");
    
    var blob;
    let recorder = null;

const showRecorderedGifs = gifs => {
    if(Array.isArray(gifs)){
        for (let gif of gifs) {
            let img = document.createElement("img");
            img.setAttribute("width", "286");
            img.setAttribute("height", "296"); 
            img.setAttribute("style", "margin: 8px 9px");
            img.src = `https://i.giphy.com/media/${gif.id}/giphy.webp`;
            img.alt = 'My recordered gif';
            $container.appendChild(img);
        }
    } else{
        let img = document.createElement("img");
        img.setAttribute("width", "286");
        img.setAttribute("height", "296"); 
        img.setAttribute("style", "margin: 8px 9px");
        img.src = `https://i.giphy.com/media/${gifs.id}/giphy.webp`;
        img.alt = 'My recordered gif';
        $container.appendChild(img);
    }
}


    //Shows stop button and hides start button
    $startButton.addEventListener("click", async () => {
        $pinkButtons.style.display = 'none';
        $redButtons.style.display = 'block';
        $littleBarTitle.innerText = 'Capturando Tu Guifo';
        recorder = await startCameraRecording(recorder, $videoContainer);
    })

    //Shows start button and hides stop button
    $stopButton.addEventListener("click", async () => {
        try{
            $redButtons.style.display = 'none';
            blob = await stopCameraRecording(recorder, $videoContainer);
            $otherButtons.style.display = 'block';
            $cancelButton.style.display = 'none';
            $littleBarTitle.innerText = 'Vista Previa';
            $videoContainer.style.display = 'none';
            $videoContainer2.style.display = 'block';
            previewGif(blob);
        }catch{ //If you press stop button too soon.
            alert('El gif ha sido demasiado corto, intente grabarlo nuevamente.');
            $pinkButtons.style.display = 'block';
        }
    })

    //Starts recording again
    $repeatButton.addEventListener("click", async () => {
        $pinkButtons.style.display = 'none';
        $redButtons.style.display = 'block';
        $otherButtons.style.display = 'none';
        $videoContainer.style.display = 'block';
        $videoContainer2.style.display = 'none';
        recorder = await startCameraRecording(recorder, $videoContainer);
    })

    //Uploads the recordered gif
    $uploadButton.addEventListener("click", async () => {
        $videoContainer2.style.display = 'none';
        $videoContainer.style.display = 'none';
        $whiteBackground.style.display = 'block';
        $cancelButton.style.display = 'block';
        $repeatButton.style.display = 'none';
        const newGif = await sendGifToApi(blob);
        $recordingWindow.style.display = 'none';
        $gifUploadedWindow.style.display = 'block';
        $container.style.top = '800px';
        $littleGif.src = URL.createObjectURL(blob);
    })

    //Downloads the recordered gif
    $downloadButton.addEventListener("click", async () => {
        await invokeSaveAsDialog(blob);
    })

    //Copies the URL recordered gif
    $copyURLbutton.addEventListener("click", async () => {
        try{
            let allGifs = JSON.parse(localStorage.getItem("myGifs"))
            const arrayGifs = [...allGifs]
            let lastGif = arrayGifs[arrayGifs.length-1]
            let input = document.createElement("input");
            let url = await `https://i.giphy.com/media/${lastGif}/giphy.webp`;
            input.setAttribute("value", url);
            document.body.appendChild(input);
            input.select();
            document.execCommand("copy");
            document.body.removeChild(input);
            alert('El enlace del gif fue copiado exitosamente. :)');
        } catch{
            alert('El enlace del gif no pudo ser copiado, pero puedes descargarlo. :)');
        }
    })

    const myGifs = JSON.parse(localStorage.getItem("myGifs")) || [];
    const gifs = await getData(`${apiURL}?api_key=${apiKEY}&ids=${myGifs}`);
    showRecorderedGifs(gifs);
})

