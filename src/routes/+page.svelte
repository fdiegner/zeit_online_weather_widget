<script lang="ts">
	import WeatherWidget from '../components/WeatherWidget.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
</script>

<WeatherWidget
	API_KEY={data.API_KEY}
	LOCAL_STORAGE_KEY={data.LOCAL_STORAGE_KEY}
	MAX_API_REQUESTS_PER_MINUTE={data.MAX_API_REQUESTS_PER_MINUTE}
	FALLBACK_CITY={data.FALLBACK_CITY}
	DEFAULT_LANGUAGE={data.DEFAULT_LANGUAGE}
/>
