import { createModal } from './template';

const refs = {
	cardSet: document.querySelector('.cardset__list'),
	divLightbox: document.querySelector('.js-lightbox'),
	btnClose: document.querySelector('.lightbox__button'),
	divOverlay: document.querySelector('.lightbox__overlay'),
	btnMoreByAuthor: document.getElementById('more-by-author'),
};

refs.cardSet.addEventListener('click', evt => {
	if (evt.target.dataset.map === 'map') {
		return;
	}
	/// Код богдана, для того что бы не открывалась модалка при открытии карты
	if (evt.target.parentNode.dataset.eventId) {
		createModal(evt.target.parentNode.dataset.eventId);
		openOverlay();
	}
});

function openOverlay() {
	refs.divLightbox.classList.add('is-open');
	document.body.classList.add('modal-opened');
	refs.divLightbox.addEventListener('click', closeOverlay);
}

function closeOverlay(e) {
	if (e.target === refs.btnMoreByAuthor || e.target === refs.btnClose || e.target === refs.divLightbox || !refs.divLightbox.contains(e.target)) {
		refs.divLightbox.classList.remove('is-open');
		document.body.classList.remove('modal-opened');
		refs.divLightbox.removeEventListener('click', closeOverlay);
	}
}
