import paginationTemplate from '../view/template/pagination-template.hbs';
import Search from '../javascript/search/search-class';
import { createCardElement } from './template.js';

const SearchEvent = new Search();

let paginationList = document.querySelector('.pagination__list');
let clickedPage;
let currentArr = [];
let currentPageNumber;
let pagItemsArr;

export function launchPagination(fetchedObj) {
    const totalPageNumber = fetchedObj.page.totalPages;
    currentPageNumber = fetchedObj.page.number;
    pagination(currentPageNumber + 1, totalPageNumber - 1);
}

/* Основна функція пагінації. Розрахунок цифр. */
export function pagination(current, last) {
    paginationList.innerHTML = '';
    if (last === 0 || last === 1) {
        return;
    }
    if (window.innerWidth > 768 && window.innerWidth < 1280 && last > 47) {
        last = 47;
    }
    if (last > 49) last = 49;

    let delta = 2;
    let left = current - delta;
    let right = current + delta;
    let range = [];
    let rangeWithDots = [];
    let l;

    for (let i = 1; i <= last; i++) {
        if (i === 1 || i === last || (i >= left && i < right)) {
            range.push(i);
        }
    }

    for (let i of range) {
        if (l) {
            if (i - l === 2) {
                rangeWithDots.push(l + 1);
            } else if (i - l !== 1) {
                rangeWithDots.push('...');
            }
        }
        rangeWithDots.push(i);
        l = i;
    }

    currentArr = rangeWithDots;
    renderPagination(rangeWithDots); /* виклик функції рендера пагінації */
    return rangeWithDots;
}

/* Рендер пагінації */

function renderPagination(pagArr) {
    const paginating = pagArr.forEach(paginatedNumber => {
        paginationList.insertAdjacentHTML('beforeend', paginationTemplate(paginatedNumber));
    });
    pagItemsArr = paginationList.querySelectorAll('li');
    selectPagination(pagItemsArr); /* виклик функції вибору пагінації */
}

/* Вибір пагінації, вішаємо слухачів на кожну цифру, крім трьох крапок, додаємо активний клас */
function selectPagination(pagItemsArr) {
    if (currentPageNumber === 0) {
        paginationList.firstChild.classList.add('pagination__item--active');
    }
    if (currentPageNumber > 0) {
        paginationList.firstChild.classList.remove('pagination__item--active');
    }
    const selecting = pagItemsArr.forEach(pagListItem => {
        pagListItem.addEventListener('click', loadNewPage);

        if (pagListItem.textContent === '...') {
            pagListItem.removeEventListener('click', loadNewPage);
        }
        if (Number(pagListItem.textContent) === currentPageNumber) {
            pagListItem.classList.add('pagination__item--active');
        }
    });
}

/* Проект функції завантаження сторінки з новою порцією карточок по кліку на цифру пагінації */

async function loadNewPage(event) {
    const pagChildern = pagItemsArr.forEach(pagChild => {
        if (pagChild.classList.contains('pagination__item--active')) {
            pagChild.classList.remove('pagination__item--active');
        }
    });
    clickedPage = Number(event.target.textContent);
    SearchEvent.pageNumber = clickedPage;
    const currentCountry = JSON.parse(sessionStorage.getItem('country-code'));
    if (currentCountry === null) {
        SearchEvent.countryCode = '';
    } else {
        SearchEvent.countryCode = currentCountry;
    }

    const currentWord = JSON.parse(sessionStorage.getItem('key-word'));
    if (currentWord === null) {
        SearchEvent.keyword = '';
    } else {
        SearchEvent.keyword = currentWord;
    }

    await SearchEvent.getEvent();

    createCardElement(SearchEvent.searchE); // <= объект данных
    launchPagination(SearchEvent.searchE);
}