import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
const list = document.querySelector(".country-list")
const divInfo = document.querySelector(".country-info")
const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector("#search-box")

input.addEventListener("input", debounce(onInputValue, DEBOUNCE_DELAY))

function onInputValue(event){
    list.innerHTML = ""
    divInfo.innerHTML =""
    let inputValue = event.target.value.trim()
    if(!inputValue){
        return        
    }
    fetchCountries(inputValue).then(json => {
        let markup = ""      
       
        if(json.length > 10){
            return Notiflix.Notify.info
            ("Too many matches found. Please enter a more specific name.")
        }
        if(json.length >= 2 && json.length <= 10){
            markup =""
            json.map(elem => {     
                markup += `<li class="item">
                <img src="${elem.flags.svg}" alt="${elem.name.official}" width="50px" height="30px"/>
                <h2 class="text">${elem.name.common}</h2>
              </li> `
                list.innerHTML = markup
            });
        }
        
        if(json.length === 1){   
            markup= ""
            json.forEach(elem => {
                let languages = Object.values(elem.languages).join(", ")
                markup = `<h2><span class="flag"><img src="${elem.flags.svg}" alt="${elem.name.official}" width="50px" height="30px"></span>${elem.name.common}</h2>
                <p><span class="big">Capital:</span>${elem.capital[0]}</p>
                <p><span class="big">Population:</span>${elem.population}</p>
                <p><span class="big">Languages:</span>${languages}</p>`
                divInfo.innerHTML = markup
            })
        }
    }).catch(error => {
        return Notiflix.Notify.failure("Oops, there is no country with that name")
    })
}


// list.innerHTML = ""
//             return Notiflix.Notify.failure("Oops, there is no country with that name")

    