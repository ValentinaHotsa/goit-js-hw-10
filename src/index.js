import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from '../src/cat-api';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_rOkkU9BWpeucDalppHqtUSRmiR6id6dH8l35GXaTbiCKFsAAhlfvBWnJ0wKNnHWt';

const selectList = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

error.classList.add('is-hidden');
loader.classList.add('is-hidden');

fetchBreeds();
selectList.addEventListener('change', changeSelect);
function changeSelect(event) {
  const selectValue = event.currentTarget.value;
  fetchCatByBreed(selectValue);
}
