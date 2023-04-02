const imagesUrl = 'https://image.tmdb.org/t/p/w500';
let url = 'https://restcountries.com/v3.1/all';
const searchUrl = `https://restcountries.com/v3.1/name/`;
let searchUrl2 = `?fullText=true`;
const fragment = document.createDocumentFragment();
const moviesList = document.querySelector('.movies-list');
const loaderContainer = document.querySelector('.loader_container')
const loading = document.createElement('div');
loading.classList.add('loader');
loaderContainer.appendChild(loading);
const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
async function fetchData() {
    const searchIerm = search.value;
    if (searchIerm) {
        url = `${searchUrl}${searchIerm}${searchUrl2}`
    } else {
        url = 'https://restcountries.com/v3.1/all'
    }
    try {
        const response = await fetch(url);
        const data = await response.json();
        moviesList.innerHTML = '';
        data.map((country) => {
            const image = document.createElement('img');
            image.src = `${country.flags.png}`;
            const title = document.createElement('h4');
            title.textContent = `NAME : ${country.name.common}`;
            const countryContinent = document.createElement('h4');
            countryContinent.textContent = `cauntriy : ${country.continents}`;
            const popStrtext = document.createElement("h4")
            const toStringPopulation = String(country.population)
            const currencies = document.createElement("h4");
            const div = document.createElement('div');
            div.appendChild(image);
            div.appendChild(title);
            div.appendChild(countryContinent);
            if (country.currencies !== null && country.currencies !== undefined) {
                const newCurrency = Object.keys(country.currencies);
                currencies.textContent = `currenciec: ${newCurrency[0]}`;
                div.appendChild(currencies);
            }
            if (toStringPopulation.length === 4) {
                popStrtext.textContent = `${toStringPopulation.slice(0,3)}k`;
                div.appendChild(popStrtext);
            } else if (toStringPopulation.length === 5) {
                popStrtext.textContent = `${toStringPopulation.slice(0,3)}k`;
                div.appendChild(popStrtext);
            } else if (toStringPopulation.length === 6) {
                popStrtext.textContent = `${toStringPopulation.slice(0,3)}k`;
                div.appendChild(popStrtext);
            } else if (toStringPopulation.length === 7) {
                popStrtext.textContent = `${toStringPopulation.slice(0, 4)}m`;
                div.appendChild(popStrtext);
            } else if (toStringPopulation.length === 8) {
                popStrtext.textContent = `${toStringPopulation.slice(0, 5)}mln`;
                div.appendChild(popStrtext);
            } else if (toStringPopulation.length === 9) {
                popStrtext.textContent = `${toStringPopulation.slice(0, 6)}fitfilion`;
                div.appendChild(popStrtext);
            } else if (toStringPopulation.length === 10) {
                popStrtext.textContent = `${toStringPopulation.slice(0, 7)}fitfilion`;
                div.appendChild(popStrtext);
            } else {
                popStrtext.textContent = toStringPopulation;
                div.appendChild(popStrtext);
            }
            fragment.appendChild(div);
            moviesList.appendChild(fragment);
            console.log(country);
        })
    } catch (error) {
        console.log(error);
    }
}
fetchData();
btn.addEventListener('click', () => {
    fetchData();
})
search.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        setTimeout(() => {
            fetchData();
        }, 4000);
    }
})