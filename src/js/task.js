'use strict';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const lightbox = new SimpleLightbox('.list a', {
  captionsData: 'alt',
  captionDelay: 250,
  nav: true,
  close: true,
  showCounter: true
});

const url = 'https://pixabay.com/api/?';
const list = document.querySelector('.list');
const queryParam =  new URLSearchParams({
    key: "55680112-662c4999a1e7b09f15363a282",
    image_type: 23,
    orientation: "horizontal",
    safesearch: true,
});

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();
    list.innerHTML = "<li>Loading images, please wait...</li>";
    const q = event.target['search'].value;
    const qry = url + queryParam.toString() + '&q=' + q;
    fetch(qry)
        .then(val => { return val.json() })
        .then(val => {
            return val.hits;
        })
        .then(val => {
            const item = val.map((arr) => {
                return `<li class="listItem"><a href="${arr.largeImageURL}"><img class='image' src="${arr.webformatURL}" data-source="${arr.largeImageURL}" alt="${arr.tags}"/></a>
                <ul class="subList">
                <li class="subListItem"><p>Likes</p><p>${arr.likes}</p></li>
                <li class="subListItem"><p>Views</p><p>${arr.views}</p></li>
                <li class="subListItem"><p>Comments</p><p>${arr.comments}</p></li>
                <li class="subListItem"><p>Comments</p><p>${arr.downloads}</p></li>
                </ul></li>`
            }).join("");
          if (val.length === 0) {
            iziToast.show({
              message: `<div class='iconContainer'>
              <svg class='icon'><use href='../img/warning.svg'/></svg>
              <span class='message'>Sorry, there are no images matching<br>your search query.Please try again!</span>
              </div>`,
              position: "topRight",
              messageColor: 'white',
              backgroundColor : 'rgba(239, 64, 64, 1)'
            });
          }
          list.innerHTML = "";
          list.insertAdjacentHTML('beforeend', item);
          lightbox.refresh();
        })
      .catch(err => {
        console.log('Connection Error');
        });
  event.target['search'].value = "";
});

