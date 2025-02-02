(function () {
  'use strict';

  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  const cities = [];

  fetch(endpoint)
      .then(blob => blob.json())
      .then(data => cities.push(...data));

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

    const html = results.map(place => {
      const regex = new RegExp(this.value, 'gi');

      // Highlights the search terms
      const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
      const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

      if (results.length === 1) {
        document.documentElement.style.setProperty('background', `url(https://source.unsplash.com/1600x900/?${place.city}`);
      }

      return `
        <li>
            <span class="name">${cityName}, ${stateName}</span>
            <span class="population">${formatNumber(place.population)}</span>
        </li>
      `;

    }).join('');

    suggestions.innerHTML = html;

  }

  const searchInput = document.querySelector('.search');
  const suggestions = document.querySelector('.suggestions');

  searchInput.addEventListener('change', displayMatches);
  searchInput.addEventListener('keyup', displayMatches);

})();
