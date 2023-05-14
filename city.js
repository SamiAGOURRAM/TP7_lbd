const form = document.querySelector('form');
const input = document.querySelector('#ville');
const meteoDiv = document.querySelector('#meteo');
const apiKey = 'a9eebd62f87e1dde4d6dc1c7658b00a1';

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const ville = input.value;
	getMeteo(ville);
});

function getMeteo(ville) {
	const url = `https://api.openweathermap.org/data/2.5/weather?q=${ville}&units=metric&appid=${apiKey}`;
	
	const xhr = new XMLHttpRequest();

	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				const reponse = JSON.parse(xhr.responseText);
				afficherMeteo(reponse);
			} else {
				meteoDiv.innerHTML = 'Une erreur est survenue';
			}
		}
	}

	xhr.open('GET', url);
	xhr.send();
}

function afficherMeteo(reponse) {
	const temperature = Math.round(reponse.main.temp);
	const description = reponse.weather[0].description;
	const vitesseVent = Math.round(reponse.wind.speed * 3.6); // Conversion de m/s à km/h
	const ville = reponse.name;

	meteoDiv.innerHTML = `
		<h2>Météo pour ${ville}</h2>
		<p>Température: ${temperature}&deg;C</p>
		<p>Description: ${description}</p>
		<p>Vitesse du vent: ${vitesseVent} km/h</p>
	`;
}
