<script>
    import { onMount } from 'svelte';
    import {getData,storeSortedMonkeys,sortMonkeys,rankMonkeys,fetchBananasBalance,fetchAllMonkeys,fetchMonkeyDetails,fetchBananaReserve } from '$lib/getstats';
    import {updatePrice,listMonkeys} from '$lib/dataman'

    //Interval 1
    onMount(async () => {
        await getData();
            sortMonkeys();
            storeSortedMonkeys();
            rankMonkeys();
            listMonkeys();
        const interval = 10000
        const intervalId = setInterval(async () => {
            await getData();
            sortMonkeys();
            storeSortedMonkeys();
            rankMonkeys();
            listMonkeys();
            updatePrice();
        }, interval);

        return () => clearInterval(intervalId); // Clear interval on component unmount
    });

    //Interval 2
    onMount(async () => {
        sessionStorage.setItem('priceBanana',parseFloat((await fetchBananaReserve()).price).toFixed(6));
        updatePrice();
        const interval = 55000
        const intervalId = setInterval(async () => {
            sessionStorage.setItem('priceBanana',parseFloat((await fetchBananaReserve()).price).toFixed(6));
        }, interval);
    return () => clearInterval(intervalId); // Clear interval on component unmount
    });

</script>

<p id="price"></p>
<ul id="goodMonkeysList"></ul>
<ul id="badMonkeysList"></ul>