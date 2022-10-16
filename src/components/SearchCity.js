import React, { useState, useEffect, useCallback } from 'react';
import '../components/style.css';
import WeatherDetails from './WeatherDetails';

const API_LINK = 'https://api.openweathermap.org/data/2.5/weather?q=';
const API_KEY = '&appid=89071a05cb01e4998ab59d9d624990ef';
const API_UNITS = '&units=metric';

const SearchCity = () => {
	const [enteredCity, setEnteredCity] = useState('Kielce'); //funkcja i zmienna updaetująca wpisane miasto
	const enteredCityHandler = e => setEnteredCity(e.target.value); //to co jest wpisane w polu input przechwytujemy
	
	const [weatherInfo, setWeatherInfo] = useState({}); //funkcja i zmienna updaetująca objekt z danymi
	
	// potrzebujemy hooka Effect i funkcji asynchronicznej
	const getWeatherInfo = useCallback(async () => {
		//użyty useCallback aby funkcja nie wywoływała się gdy nie było zmian
		try {
			let url = API_LINK + `${enteredCity}` + API_UNITS + API_KEY;
			let res = await fetch(url); // resolve czekamy na odpowiedż z tego adresu
			let data = await res.json(); //odczytujemy dane z data w postaci jsona
			const { temp, humidity, pressure } = data.main;
			//zapisujemy sobie w swoim objekcie dane które nas interesują z danych z API
			// const { main: weatherType } = data.weather[0];
			const weatherType = data.weather[0].main;
			const { name } = data;
			const { speed } = data.wind;
			const { country, sunset } = data.sys;
			const myNewWeatherInfo = {
				temp,
				humidity,
				pressure,
				weatherType,
				name,
				speed,
				country,
				sunset,
			};
			console.log(data);
			setWeatherInfo(myNewWeatherInfo);
		} catch (err) {
			console.log(err);
		}
	}, [enteredCity]); //tablica asocjacji

	useEffect(() => {
		// po każdej zmianie zmiennej enteredCity funkcja w useEffect będzie się uruchamiała dlatego do tablicy zależności wpisujemy tą zmienną gdybyśmy tego nie zrobili to funkcja zadziałaby tylko raz przy pierwszym renderze.
		getWeatherInfo();
	}, [enteredCity, getWeatherInfo]);

	return (
		<>
			<div className='wrap'>
				<div className='search'>
					<input
						type='search'
						className='search'
						placeholder='Search city'
						id='search'
						value={enteredCity}
						onChange={enteredCityHandler}
					/>
					<button className='searchButton' onClick={getWeatherInfo}>
						Search
					</button>
				</div>
			</div>
			<WeatherDetails {...weatherInfo} />
		</>
	);
};

export default SearchCity;
