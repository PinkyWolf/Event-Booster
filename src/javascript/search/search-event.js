import debounce from 'lodash.debounce';
import Search from './search-class';
import { ref } from './refs';
import { launchPagination } from '../pagination';
import { createCardElement } from '../template';
import nothingFoundTpl from '../../view/template/not_found';

import '@pnotify/core/dist/PNotify.css';
import '@pnotify/mobile/dist/PNotifyMobile.css';
import '@pnotify/core/dist/BrightTheme.css';
import { alert, error, success, defaultModules } from '@pnotify/core/dist/PNotify.js';

const filterEvent = new Search();

firstSearch();

ref.selectCountryBtn.addEventListener('click', searchInCountry);
ref.searchInputInKeyword.addEventListener('input', debounce(searchEventsInKeyword, 500));

async function firstSearch() {
	sessionStorage.clear();
	await filterEvent.getEvent(); // первый поиск при загрузке страницы

	if (filterEvent.searchEvent._embedded) {
		createCardElement(filterEvent.searchEvent); // <= обЪект данных.
		launchPagination(filterEvent.searchEvent);
	} else {
		document.querySelector('.cardset__list').innerHTML = nothingFoundTpl();
		document.querySelector('.pagination__list').innerHTML = '';
	}
}

function searchInCountry() {
	const countryListRef = document.querySelector('.country__list');
	countryListRef.addEventListener('click', getEventInCountry);

	async function getEventInCountry(e) {
		if (!e.target.dataset.countryCode) {
			return;
		}
		filterEvent.countryCode = e.target.getAttribute('data-country-code');
		sessionStorage.setItem('country-code', JSON.stringify(filterEvent.countryCode));
		await filterEvent.getEvent();
		deleteGetEventInCountry();
		changeSearchBtn(e);

		if (filterEvent.searchEvent._embedded) {
			createCardElement(filterEvent.searchEvent); // <= обЪект данных.
			launchPagination(filterEvent.searchEvent);
		} else {
			document.querySelector('.cardset__list').innerHTML = nothingFoundTpl();
			document.querySelector('.pagination__list').innerHTML = '';
		}
	}

	function deleteGetEventInCountry() {
		countryListRef.removeEventListener('click', getEventInCountry);
	}
}

async function searchEventsInKeyword(e) {
	let latinScript = /^[a-z|A-z\u00C0-\u00ff\s'\.,-\/#!$%\^&\*;:{}=\-_`~()]+$/;
	const latinCheck = latinScript.test(e.target.value);

	if (latinCheck === false && e.target.value === '') {
		filterEvent.keyword = e.target.value;
	}
	if (latinCheck === false && e.target.value !== '') {
		return alert({ text: 'Please use latin characters only.', delay: 3000 });
	}
	if (latinCheck === true) {
		filterEvent.keyword = e.target.value;
	}

	sessionStorage.setItem('key-word', JSON.stringify(filterEvent.keyword));
	await filterEvent.getEvent();

	if (filterEvent.searchEvent._embedded) {
		createCardElement(filterEvent.searchEvent); // <= обЪект данных.
		launchPagination(filterEvent.searchEvent);
	} else {
		document.querySelector('.cardset__list').innerHTML = nothingFoundTpl();
		document.querySelector('.pagination__list').innerHTML = '';
	}
}

function changeSearchBtn(e) {
	ref.selectCountryBtn.value = e.target.value;
}
