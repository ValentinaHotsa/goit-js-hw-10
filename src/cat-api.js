import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
export { fetchBreeds, fetchCatByBreed };
const selectList = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const containerInfo = document.querySelector('.cat-info');
function fetchBreeds() {
  selectList.classList.add('is-hidden');
  loader.classList.remove('is-hidden');

  return fetch('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      const marcup = data
        .map(dataCat => {
          return `<option value="${dataCat.id}">${dataCat.name}</option>`;
        })
        .join('');
      selectList.insertAdjacentHTML('afterbegin', marcup);
      selectList.classList.remove('is-hidden');
    })
    .then(() => new SlimSelect({ select: `.breed-select` }))
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}
function fetchCatByBreed(breedId) {
  loader.classList.remove('is-hidden');
  containerInfo.classList.add('is-hidden');
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      const el = data.map(img => {
        return `<div class='container-img'><img src="${img.url}" alt="${img.name}"></div>`;
      });
      containerInfo.innerHTML = el;
      containerInfo.classList.remove('is-hidden');
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loader.classList.add('is-hidden');
      fetchCatInfo(breedId);
    });
}
function fetchCatInfo(breedId) {
  loader.classList.remove('is-hidden');

  return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(infoData => {
      console.log(infoData);
      const elem = `<div class='container-text'><h1 class='info-header'>${infoData.name}</h1>
<p class='info-descr'>${infoData.description}</p>
<p class='info-temp'>Temperament:${infoData.temperament}</p></div>`;

      containerInfo.insertAdjacentHTML('beforeend', elem);
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    })
    .finally(() => {
      loader.classList.add('is-hidden');
    });
}
