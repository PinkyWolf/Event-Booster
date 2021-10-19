import Search from '../javascript/search/search-class';

import eventList from '../view/template/event-list.hbs';
import modalCard from '../view/template/modal-card.hbs';
import { launchPagination } from './pagination';

export async function createModal(id) {
	const searchEvent = new Search();

	await searchEvent.getEventById(id);

	searchEvent.eventById._embedded.events[0].img = searchEvent.eventById._embedded.events[0].images.find(img => img.ratio === '16_9');

	document.querySelector('.lightbox__content').innerHTML = modalCard(searchEvent.eventById._embedded.events[0]);

	const searchMoreByAuthor = document.querySelector('.main');
	searchMoreByAuthor.addEventListener('click', searchMore);
}

export function createCardElement(data) {
	data._embedded.events.forEach(event => {
		event.img = event.images.find(img => img.ratio === '4_3');
	});

	document.querySelector('.cardset__list').innerHTML = eventList(data._embedded.events);
}

async function searchMore(e) {
	const search = new Search();
	search.keyword = document.querySelector('.author').innerHTML;
	await search.getEvent();
	createCardElement(searche.searchEvent); // <= обЪект данных.
	launchPagination(searche.searchEvent);
}
