import { fetchBreeds, fetchCatByBreed, fetchCatInfo } from '../src/cat-api';
import Notiflix from 'notiflix';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

const selectList = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const containerInfo = document.querySelector('.cat-info');
error.classList.add('is-hidden');
loader.classList.add('is-hidden');

fetchBreeds()
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

selectList.addEventListener('change', changeSelect);
function changeSelect(event) {
  loader.classList.remove('is-hidden');
  containerInfo.classList.add('is-hidden');
  const breedId = event.currentTarget.value;
  fetchCatByBreed(breedId)
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
      fetchCatInfo(breedId)
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
    });
}
