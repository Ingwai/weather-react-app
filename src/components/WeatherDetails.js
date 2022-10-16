import React, { useState, useEffect } from 'react';
import './style.css';

const WeatherDetails = props => {
	const [weatherState, setWeatherState] = useState(''); //renderujemy zmiany ikon pogody
	useEffect(() => {
		if (props.weatherType) {
			switch (props.weatherType) {
				case 'Clouds':
					setWeatherState('wi-day-cloudy');
					break;
				case 'Haze':
					setWeatherState('wi-fog');
					break;
				case 'Clear':
					setWeatherState('wi-day-sunny');
					break;
				case 'Mist':
					setWeatherState('wi-dust');
					break;
				case 'Rain':
					setWeatherState('wi-day-rain');
					break;
				default:
					setWeatherState('wi-day-sunny');
					break;
			}
		}
	}, [props.weatherType]);

	let date = new Date(props.sunset * 1000);
	let timeStr = `${date.getHours()}:${date.getMinutes()}`;
	return (
		<>
			<article className='widget'>
				<div className='weatherIcon'>
					<i className={`wi ${weatherState}`}></i>
				</div>
				<div className='weatherInfo'>
					<div className='temperature'>
						<span>{props.temp}&deg;C</span>
					</div>
					<div className='description'>
						<div className='weatherCondition'>{props.weatherType}</div>
						<div className='place'>
							{props.name}, {props.country}
						</div>
					</div>
				</div>
				<div className='date'>{new Date().toLocaleString()}</div>
				<div className='extra-temp'>
					<div className='temp-info-minmax'>
						<div className='two-sided-section'>
							<p>
								<i className='wi wi-sunset'></i>
							</p>
							<p className='extra-info-leftside'>
								{timeStr} <br />
								Sunset
							</p>
						</div>

						<div className='two-sided-section'>
							<p>
								<i className='wi wi-humidity'></i>
							</p>
							<p className='extra-info-leftside'>
								{props.humidity} <br />
								Humidity
							</p>
						</div>
					</div>
					<div className='weather-extra-info'>
						<div className='two-sided-section'>
							<p>
								<i className='wi wi-rain'></i>
							</p>
							<p className='extra-info-leftside'>
								{props.pressure} <br />
								Pressure
							</p>
						</div>
						<div className='two-sided-section'>
							<p>
								<i className='wi wi-strong-wind'></i>
							</p>
							<p className='extra-info-leftside'>
								{props.speed} <br />
								Speed wind
							</p>
						</div>
					</div>
				</div>
			</article>
		</>
	);
};

export default WeatherDetails;
