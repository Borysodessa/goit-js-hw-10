import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import { countryCardTpl, countryListTpl } from './js/markupTpl';
import { refs } from './js/refs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
refs.searchBox.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
  const name = refs.searchBox.value.trim();
  if (name === '') {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
    return;
  }

  fetchCountries(name)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info('Too many matches found. Please enter a more specific name.');
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';
        return;
      }

      if (countries.length <= 10) {
        const listMarkup = countries.map(country => countryListTpl(country));
        refs.countryList.innerHTML = listMarkup.join('');
        refs.countryInfo.innerHTML = '';
      }

      if (countries.length === 1) {
        const markup = countries.map(country => countryCardTpl(country));
        refs.countryInfo.innerHTML = markup.join('');
        refs.countryList.innerHTML = '';
      }
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
      refs.countryInfo.innerHTML = '';
      refs.countryList.innerHTML = '';
      return error;
    });
}












