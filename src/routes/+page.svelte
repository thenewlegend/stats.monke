<script>
    import { onMount } from 'svelte';

    import { sortMonkeys,fetchBananasBalance,fetchBananaReserve,fetchAllMonkeys,fetchMonkeyDetails } from './getstats';

    

    async function getData(){
        const monkeData = await fetchAllMonkeys();
        sessionStorage.setItem('monkeData',JSON.stringify(monkeData));
        const iterationCount = parseInt(sessionStorage.getItem('iterationCount')) || 0;
        sessionStorage.setItem('iterationCount', (iterationCount + 1).toString());
    }

    onMount(() => {
        getData(); // Call the function immediately

        const interval = 10000; // 10 seconds in milliseconds
        const intervalId = setInterval(() => {
            getData(); // Call the function
        }, interval);

        return () => clearInterval(intervalId); // Clear interval on component unmount
    });
</script>

<h1>Monke Stats</h1>
<p id="responseParagraph"></p>
