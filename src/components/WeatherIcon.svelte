<script lang="ts">
	export let iconCode: string;
    export let alt: string = 'Icon';
</script>

<img class="weather-icon" width="33" height="33" src="http://openweathermap.org/img/wn/{iconCode}.png" alt="Wetter - {alt}"/>

<style>
	.weather-icon {
		border-right: 1px solid var(--z-border-header);
	}
</style>
