const KEY = '2TrBR08AVM4SFo2AXhREOrDWz35MaKAb';
const ROOT_URL = 'https://app.ticketmaster.com/discovery/v2/';

const getEvent = async (countryCode = '', keyword = '') => {
	const resultRequest = await fetch(
		`${ROOT_URL}events.json?countryCode=${countryCode}&keyword=${keyword}&apikey=${KEY}`,
	);

	return await resultRequest.json();
};

export { getEvent };

