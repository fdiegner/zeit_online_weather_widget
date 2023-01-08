import type { PageLoad } from './$types';

export const load = (async () => {
    return {
        API_KEY: '358e6dce5d7be6708c0b35e6840e87db',
        LOCAL_STORAGE_KEY: 'zon_initial_city_coords',
        MAX_API_REQUESTS_PER_MINUTE: 20,
        FALLBACK_CITY: 'Hamburg',
        DEFAULT_LANGUAGE: 'de'
    };
}) satisfies PageLoad;

