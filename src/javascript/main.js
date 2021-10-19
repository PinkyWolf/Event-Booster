import dropdown from './dropdown';
import countryListTpl from '../view/template/country_list.hbs';

import countries from './country.json';

import './preloader';
import './search/search-event';
import './modal';

const selectCountryBtn = document.getElementById('select-country-btn');

dropdown(selectCountryBtn);

selectCountryBtn.insertAdjacentHTML('afterend', countryListTpl(countries));
