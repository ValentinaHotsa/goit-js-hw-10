module.exports = { fetchBreeds, fetchCatByBreed, fetchCatInfo };
import axios from 'axios';
axios.defaults.headers.common['x-api-key'] =
  'live_rOkkU9BWpeucDalppHqtUSRmiR6id6dH8l35GXaTbiCKFsAAhlfvBWnJ0wKNnHWt';
function fetchBreeds() {
  return fetch('https://api.thecatapi.com/v1/breeds');
}
// selectList.classList.add('is-hidden');
// loader.classList.remove('is-hidden');
function fetchCatByBreed(breedId) {
  return fetch(
    `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
  );
}

function fetchCatInfo(breedId) {
  return fetch(`https://api.thecatapi.com/v1/breeds/${breedId}`);
}
