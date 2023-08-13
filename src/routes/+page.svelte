<script>
    import { onMount, onDestroy } from 'svelte';
    import {getData,storeSortedMonkeys,sortMonkeys,rankMonkeys,fetchBananasBalance,fetchAllMonkeys,fetchMonkeyDetails,fetchBananaReserve } from '$lib/getstats';
    import {listMonkeys} from '$lib/dataman'

    let intervalId;
    onMount(async () => {
        await getData();
        sortMonkeys();
        storeSortedMonkeys();
        rankMonkeys();
        listMonkeys();

        const interval = 5000;
        intervalId = setInterval(async () => {
            listMonkeys();
        }, interval);
    });

    onDestroy(() => {
    clearInterval(intervalId);
    });

</script>

<link rel="stylesheet" href=".\style.css">

<div class="table-container">
    <table id ="jungle-stat"></table>
</div>
