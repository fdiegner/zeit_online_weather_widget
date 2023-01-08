<script lang="ts">
	import { UnitKey, type UnitInterface } from "../types";


	export let location: string;
	export let description: string;
	export let temperature: number;
	export let unit: UnitInterface;
</script>

<div class="weather-info__wrapper" on:click on:keypress tabindex="-1">
	<div class="temperature__wrapper">
		<span class="temperature" class:metric={unit.key === UnitKey.Celsius} class:imperial={unit.key === UnitKey.Fahrenheit}>{temperature}</span>
	</div>
		<div class="information__wrapper">
			<span>
				{location}
			</span>
			<span>{description}</span>
		</div>
</div>

<style lang="scss">
	div {
		display: flex;
	}

	.weather-info__wrapper {
		flex-direction: row;
		align-items: center;
		padding: 0.05rem;
		cursor: pointer;

		.temperature__wrapper {
			padding: 0 0.5rem;
		}

		.information__wrapper {
			flex-direction: column;
			padding: 0 0.5rem;
			white-space: nowrap;
		}

		span {
			font-size: x-small;
		}
		.temperature {
			font-size: 1.25rem;

			&.metric::after {
				content: '\2103';
			}
			&.imperial::after {
				content: '\2109';
			}
		}
	}
</style>
