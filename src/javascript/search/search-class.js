const KEY = '2TrBR08AVM4SFo2AXhREOrDWz35MaKAb';
const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/';

export default class Search {
	constructor(countryBtn, searchKeyword, pageNumber) {
		this.searchEvents = [];
		this.keyword = '';
		this.countryCode = '';
		this.pageNumber = 0;
		// this.eventId = '';
		this.eventById = [];
		this.cardsPerPage = 20;
	}

	async getEventById(eventId) {
		const url = `${ROOT_URL}events.json?id=${eventId}&apikey=${KEY}`;
		const res = await fetch(url);
		if (!res.ok) {
			throw res;
		}
		this.eventById = await res.json();
		return this.eventById._embedded.events;
	}

	async getEvent() {
		if (window.innerWidth > 768 && window.innerWidth < 1280) {
			this.cardsPerPage = 21;
		} else {
			this.cardsPerPage = 20;
		}
		const url = `${ROOT_URL}events.json?countryCode=${this.countryCode}&size=${this.cardsPerPage}&page=${this.pageNumber}&keyword=${this.keyword}&apikey=${KEY}`;
		const res = await fetch(url);
		if (!res.ok) {
			throw res;
		}
		this.searchEvents = await res.json();
	}

	get searchEvent() {
		return this.searchEvents;
	}

	set searchEvent(newSearchEvent) {
		this.searchEvents = newSearchE;
	}

	get country() {
		return this.countryCode;
	}

	set country(newCountry) {
		this.country = newCountry;
	}

	get key() {
		return this.keyword;
	}

	set key(newKeyword) {
		this.keyword = newKeyword;
	}

	get number() {
		return this.pageNumber;
	}

	set number(newPageNumber) {
		this.pageNumber = newPageNumber;
	}

	get size() {
		return this.cardsPerPage;
	}

	set size(newSize) {
		this.cardsPerPage = newSize;
	}

	get id() {
		return this.eventId;
	}

	set id(newEventId) {
		this.eventId = newEventId;
	}
}
