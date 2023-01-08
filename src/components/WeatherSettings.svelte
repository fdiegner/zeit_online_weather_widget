<script lang="ts">
	import { onMount } from 'svelte';
	import { ImperialUnit, MetricUnit, UnitKey, type UnitInterface } from '../types';
	import HomeIcon from './HomeIcon.svelte';

	export let cityName: string;
	export let showSettings: boolean;
	export let canFetchByCity: boolean;
	export let unit: UnitInterface;
	export let width: number;

	function submitCityName() {
		showSettings = false;
		canFetchByCity = true;
	}

	onMount(() => {
		if (width > 0) {
			document.getElementById('weather__settings-form')?.style.setProperty('width', `${width}px`);
		}
	})

</script>

<form class="weather__settings" id="weather__settings-form" on:submit|preventDefault={submitCityName}>
	<div class="weather__settings-home" on:click on:keypress>
		<HomeIcon />
	</div>
	<label class="visually-hidden" for="winput">wetter standort</label>
	<input
		type="search"
		class="weather__settings-input"
		name="winput"
		placeholder="Städtename"
		bind:value={cityName}
		tabindex="0"
	/>
	<div class="weather__settings-temperature">
		<span
			class:active={unit.key === UnitKey.Celsius}
			on:click={() => (unit = new MetricUnit())}
			on:keypress={() => (unit = new MetricUnit())}>C</span
		>
		<span
			class:active={unit.key === UnitKey.Fahrenheit}
			on:click={() => (unit = new ImperialUnit())}
			on:keypress={() => (unit = new ImperialUnit())}>F</span
		>
	</div>
</form>

<style lang="scss">
	.weather__settings {
		display: inline-flex;
		flex: 1;
		&-home {
			&:hover {
				cursor: pointer;
			}
		}
		&-input {
			appearance: none;
			background-color: var(--z-background-header);
			border: none;
			color: var(--z-color-45);
			font-size: 1em;
			height: 95%;
			line-height: normal;
			padding: 0 0 0 0.625em;
			width: 85%;
			width: -webkit-calc(100% - 2.1875rem);
			width: calc(100% - 2.1875rem);
			-webkit-appearance: textfield;
			outline-offset: -2px;

			&:focus {
				outline-width: 0;
			}
		}
		&-temperature {
			display: flex;
			margin: auto;

			:nth-child(1) {
				padding: 0 3px 0 6px;
			}
			:nth-child(2) {
				padding: 0 6px 0 3px;
			}

			span {
				color: var(--z-color-45);
				&:hover {
					cursor: pointer;
				}

				&.active {
					color: var(--x-color-primary);
				}
			}
		}
	}
</style>
