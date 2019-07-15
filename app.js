(function () {
  'use strict';

  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const cities = [];

  fetch(endpoint)
      .then(blob => blob.json())
      .then(data => cities.push(...data));

  console.log(cities);

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  function findMatches(wordToMatch, cities) {
    return  cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.city.match(regex) || place.city.match(regex);
    });
  }

  function displayMatches() {
    const results = findMatches(this.value, cities);
    suggestions.innerHTML = html;

  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);

})();
