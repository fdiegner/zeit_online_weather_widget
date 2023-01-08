<script lang="ts">
	import { MetricUnit, type UnitInterface } from '../types';
	import { onMount, onDestroy } from 'svelte';
	import WeatherIcon from './WeatherIcon.svelte';
	import WeatherInfo from './WeatherInfo.svelte';
	import WeatherSettings from './WeatherSettings.svelte';
	import { fade } from 'svelte/transition';

	export let API_KEY: string;
	export let LOCAL_STORAGE_KEY: string;
	export let MAX_API_REQUESTS_PER_MINUTE: number;
	export let FALLBACK_CITY: string;
	export let DEFAULT_LANGUAGE: string;

	let apiRequestCounter = 0;
	let apiRequestInterval: NodeJS.Timer;
	let lang = DEFAULT_LANGUAGE;
	let cityName = FALLBACK_CITY;
	let cityLabel = '';
	let canFetchByCity = false;
	let unit: UnitInterface = new MetricUnit();
	let width: number;
	let isLoading: boolean = true;
	let weatherJson: any;
	let openApiResponse: Promise<Response>;

	$: showSettings = false;

	$: if (!showSettings && cityName != '' && cityName != cityLabel && canFetchByCity) {
		getLocation(cityName);
	}

	function fetchByCity(city?: string) {
		if(assertRateLimitReached()) {
			return;
		}
		isLoading = true;
		const name = city ?? cityName;
		openApiResponse = fetch(
			`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}&lang=${lang}&units=${unit.value}`
		);

		handleApiResponse();
	}

	function fetchByLatLong(lat: number, long: number) {
		if(assertRateLimitReached()) {
			return;
		}
		isLoading = true;
		canFetchByCity = false;
		openApiResponse = fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&lang=${lang}&units=${unit.value}`
		);

		handleApiResponse();
	}

	function successCB(val: any) {
		const coords = { lat: val.coords.latitude, long: val.coords.longitude };
		fetchByLatLong(coords.lat, coords.long);
		window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(coords));
	}

	function errorCB(err: GeolocationPositionError) {
		console.error('Error while fetching current position: ', err);
		isLoading = false;
		showSettings = true;
	}

	function getLocation(city?: string) {
		if (city) {
			fetchByCity(city);
		} else if (navigator?.geolocation) {
			navigator.geolocation.getCurrentPosition(successCB, errorCB);
		} else {
			fetchByCity(FALLBACK_CITY);
		}
	}

	function fetchInitialCity() {
		const localStorage = window.localStorage.getItem(LOCAL_STORAGE_KEY);
		if (localStorage) {
			const coords = JSON.parse(localStorage);
			fetchByLatLong(coords.lat, coords.long);
		} else {
			fetchByCity(FALLBACK_CITY);
		}
		showSettings = false;
	}

	function handleApiResponse() {
		openApiResponse
			.then((success) => {
				success.json().then((jsonSuccess) => {
					if (jsonSuccess.cod === 200) {
						cityLabel = jsonSuccess.name;
						weatherJson = jsonSuccess;
					}
				});
			})
			.finally(() => {
				isLoading = false;
				apiRequestCounter++;
			});
	}

	function assertRateLimitReached() {
		if (apiRequestCounter >= MAX_API_REQUESTS_PER_MINUTE) {
			window.alert(`Die maximale Anzahl an Requests wurde erreicht!Bitte warten Sie eine Minute, bevor Sie eine weitere Anfrage starten.`);
			return true;
		}
		return false;
	}

	onMount(() => {
		getLocation();
		apiRequestInterval = setInterval(() => {apiRequestCounter = 0}, 60000)
	});
	onDestroy(() => {clearInterval(apiRequestInterval)});
</script>

<div class="weather-widget__wrapper">
	{#if isLoading}
		<div in:fade class="weather-widget__wrapper-loading">Loading...</div>
	{:else if showSettings}
		<div in:fade>
			<WeatherSettings
				bind:cityName
				bind:unit
				bind:showSettings
				bind:canFetchByCity
				{width}
				on:click={fetchInitialCity}
				on:keypress={fetchInitialCity}
			/>
		</div>
	{:else if weatherJson?.weather?.length > 0}
		<div in:fade bind:clientWidth={width}>
			<WeatherIcon
				iconCode={weatherJson.weather[0].icon}
				alt={weatherJson.weather[0].description}
			/>
			<WeatherInfo
				location={cityLabel}
				description={weatherJson.weather[0].description}
				temperature={weatherJson.main.temp.toFixed(0)}
				{unit}
				on:click={() => {showSettings = true}}
				on:keypress={() => {showSettings = true}}
			/>
		</div>
	{/if}
</div>

<style lang="scss">
	.weather-widget {
		&__wrapper {
			div {
				display: flex;
			}
			border-radius: 4px;
			border: 1px solid var(--z-border-header);
			color: var(--z-color-header);
			height: 2.1875rem;
			min-width: 11.25rem;
			line-height: 0.8rem;

			&-loading {
				margin: auto;
				line-height: 2.1875rem;
				justify-content: center;
				-webkit-justify-content: center;
				-webkit-box-pack: center;
			}
		}
	}
</style>
