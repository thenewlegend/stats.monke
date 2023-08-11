<script>
    import { onMount } from 'svelte';

    import { fetchBananasBalance,fetchBananaReserve,fetchAllMonkeys,fetchMonkeyDetails } from './getstats';

    fetchBananasBalance('thenewlegend');

    onMount(async () => {
        const monkeyData = await fetchMonkeyDetails('thenewlegend');

        if (monkeyData) {
            // Access and process properties as before
            const monkeyName = monkeyData.monkey;
            const bananas = monkeyData.bananas;

            // Update the <p> element with the response data
            const responsePara = document.getElementById('responseParagraph');
            responsePara.textContent = `Monkey Name: ${monkeyName}, Bananas: ${bananas}`;
        } else {
            console.log('No monkey data found.');
        }
    });
</script>

<h1>Monke Stats</h1>
<p id="responseParagraph"></p>
