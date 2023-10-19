const selectList = document.querySelector('.breed-select');
function fetchBreeds() {
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
          return `<li><option value="${dataCat.id}">${dataCat.name}</option></li>
        `;
        })
        .join('');
      selectList.insertAdjacentHTML('afterbegin', marcup);
    });
}
export { fetchBreeds };
