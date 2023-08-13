<h1>Legends</h1>

<script>
    import { onMount, onDestroy } from 'svelte';
    import {leaderBoard} from "$lib/dataman";
    import {leaderBoardList,sortMonkeys,storeSortedMonkeys,getData} from "$lib/getstats";

    let intervalId;
    onMount(async () => {
        await getData();
		sortMonkeys();
        storeSortedMonkeys();
        leaderBoardList("Legend");
        leaderBoard("Legend");

        const interval = 5000;
        intervalId = setInterval(async () => {
            leaderBoardList("Legend");
            leaderBoard("Legend");
        }, interval);
    });

    onDestroy(() => {
    clearInterval(intervalId);
    });

</script>

<link rel="stylesheet" href="/style.css">
<div class="table-container"><table id="leaderboard-stat"></table></div>

