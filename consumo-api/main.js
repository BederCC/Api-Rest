const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_QTdpa5ZGugrYCve6ZWEyWUeFKKf2j42gvD7NzWSwFhn26F41hm5mMhZFX5q2aiDk";
const API_URL_FAVORITES = "https://api.thecatapi.com/v1/favourites?api_key=live_QTdpa5ZGugrYCve6ZWEyWUeFKKf2j42gvD7NzWSwFhn26F41hm5mMhZFX5q2aiDk";

const spanError = document.getElementById("error");

async function reloadRandomMichis() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('random');
    console.log(data);
    if (res.status !== 200) {
        spanError.innerHTML = " Hubo un error " + res.status + " " + data.message;
    } else {
        const img1 = document.getElementById("img1");
        const img2 = document.getElementById("img2");
        const img3 = document.getElementById("img3");
        const save1 = document.getElementById("save1");
        const save2 = document.getElementById("save2");
        const save3 = document.getElementById("save3");
    }

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

    save1.onclick = () => addFavouriteMichi(data[0].id);
    save2.onclick = () => addFavouriteMichi(data[1].id);
    save3.onclick = () => addFavouriteMichi(data[2].id);
}

async function loadFavouriteMichis() {
    const res = await fetch(API_URL_FAVORITES);
    const data = await res.json();
    console.log('favorites');
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = " Hubo un error " + res.status + " " + data.message;
    } else  {
        data.forEach(element => {
            const section = document.getElementById('favoriteMichis');
            const article = document.createElement('article');
            const img = document.createElement('img');
            const button = document.createElement('button');
            const btnTxt = document.createTextNode('Eliminar Michi');

            img.src = element.image.url;
            img.width = 200;
            button.appendChild(btnTxt);
            article.appendChild(img);
            article.appendChild(button);
            section.appendChild(article);
            // alement.image.url
        });
    }
}

async function addFavouriteMichi(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            image_id: id
        })
    });
    const data = await res.json();
    console.log('add');
    console.log(res);
    

    if (res.status !== 200) {
        spanError.innerHTML = " Hubo un error " + res.status + " " + data.message;
    }
}

reloadRandomMichis();
loadFavouriteMichis();