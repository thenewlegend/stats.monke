<script>
	import Nav from "./Nav.svelte";
	import Top from "./Top.svelte";
	import { onMount, onDestroy } from 'svelte';
	import {getData,storeSortedMonkeys,sortMonkeys,rankMonkeys,fetchBananasBalance,fetchAllMonkeys,fetchMonkeyDetails,fetchBananaReserve } from '$lib/getstats';

	// import {updatePrice} from '$lib/dataman';

	let intervalId;
    onMount(async () => {
        await getData();
		

        const interval = 10000;
        intervalId = setInterval(async () => {
            await getData();
			sortMonkeys();
            storeSortedMonkeys();
            rankMonkeys();
			fetchBananaReserve();
        }, interval);
    });
    onDestroy(() => {
    clearInterval(intervalId);
    });

	
</script>

<div class="top">
	<Top/>
</div>

<div class="container-b">
	<div class="nav">
	<Nav/>
	</div>

	<div class="main">
		<slot />
	</div>
</div>


<style>

	.container-b {
		display: grid;
		grid-template-columns: 1fr 4fr;
		grid-gap: 16px;
		align-items: flex-start;
	}



	.main {
		overflow: auto;
		padding: 20px;
		box-sizing: border-box;
		scrollbar-width: thin;
		scrollbar-color: #f2bd1d transparent;
		/* Add any other styling you need */
	}
</style>
