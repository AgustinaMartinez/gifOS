document.addEventListener("DOMContentLoaded", async () => {

    const body = document.querySelector("body");

    //Shows and hides menu which changes the theme
    document.getElementById("c-button").addEventListener("click", () => {
        const changeThemeContainer = document.getElementById("change-theme");
        if(changeThemeContainer.style.display === "none"){
            changeThemeContainer.style.display = "block";
        } else{
            changeThemeContainer.style.display = "none";
        }
    });

    //Changes to dark theme
    document.querySelector(".night").addEventListener("click", () => {
        body.classList.add("dark");
        body.classList.remove("light");
    })

    //Changes to light theme
    document.querySelector(".day").addEventListener("click", () => {
        body.classList.add("light");
        body.classList.remove("dark");
    })

    //Changes the random gif when you press "Ver más..."
    document.querySelector(".watch-more1").addEventListener("click", async () => {
        let q = "simpsons";
        await apiCallSearch(q);
        document.getElementById("tt").innerText = q;
    })
    document.querySelector(".watch-more2").addEventListener("click", async () => {
        let q = "harry potter";
        await apiCallSearch(q);
        document.getElementById("tt").innerText = q;
    })
    document.querySelector(".watch-more3").addEventListener("click", async () => {
        let q = "rick and morty";
        await apiCallSearch(q);
        document.getElementById("tt").innerText = q;
    })
    document.querySelector(".watch-more4").addEventListener("click", async () => {
        let q = "friends";
        await apiCallSearch(q);
        document.getElementById("tt").innerText = q;
    })

    //Shows random gifs
    await apiCallRandom('simpsons', 'hereisthegif1');
    await apiCallRandom('harry potter', 'hereisthegif2');
    await apiCallRandom('rick and morty', 'hereisthegif3');
    await apiCallRandom('friends', 'hereisthegif4');

    //Shows trending gifs
    await apiCallTrending();
    
    //Searches gifs by using search endpoint (by pressing enter)
    document.getElementById("mySearch").addEventListener("keypress", async () => {
        let value = document.getElementById("mySearch").value;
        if (event.keyCode==13 && value!==""){
            await apiCallSearch(value);
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = value;
            document.getElementById("trending-container").style.display = 'flex';
        } else{
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = "Your search returned zero results.";
            document.getElementById("trending-container").style.display = 'none';
        }
    })

    //Searches gifs by using search endpoint (by clicking search button)
    document.getElementById("searchButton").addEventListener("click", async () => {
        let value = document.getElementById("mySearch").value;
        if(value!==""){
            await apiCallSearch(value);
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = value;
            document.getElementById("trending-container").style.display = 'flex';
        } else{
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = "Your search returned zero results.";
            document.getElementById("trending-container").style.display = 'none';
        }
    })

    //Searches gifs by pressing the last searches
    document.querySelector(".suggestion1").addEventListener("mousedown", async () => {
        let value = document.querySelector(".suggestion1").text;
        if(value!==""){
            await apiCallSearch(value);
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = value;
            document.getElementById("trending-container").style.display = 'flex';
        } else{
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = "Your search returned zero results.";
            document.getElementById("trending-container").style.display = 'none';
        }
    })
    document.querySelector(".suggestion2").addEventListener("mousedown", async () => {
        let value = document.querySelector(".suggestion2").text;
        if(value!==""){
            await apiCallSearch(value);
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = value;
            document.getElementById("trending-container").style.display = 'flex';
        } else{
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = "Your search returned zero results.";
            document.getElementById("trending-container").style.display = 'none';
        }
    })
    document.querySelector(".suggestion3").addEventListener("mousedown", async () => {
        let value = document.querySelector(".suggestion3").text;
        if(value!==""){
            await apiCallSearch(value);
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = value;
            document.getElementById("trending-container").style.display = 'flex';
        } else{
            document.querySelector(".two").style.display = 'none';
            document.getElementById("tt").innerText = "Your search returned zero results.";
            document.getElementById("trending-container").style.display = 'none';
        }
    })
})