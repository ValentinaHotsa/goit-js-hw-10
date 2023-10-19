import axios from 'axios';
import { fetchBreeds } from '../src/cat-api';

axios.defaults.headers.common['x-api-key'] =
  'live_rOkkU9BWpeucDalppHqtUSRmiR6id6dH8l35GXaTbiCKFsAAhlfvBWnJ0wKNnHWt';

const selectList = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const containerInfo = document.querySelector('.cat-info');

fetchBreeds();
