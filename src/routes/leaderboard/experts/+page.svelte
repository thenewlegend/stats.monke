<h1>Experts</h1>

<script>
    import { onMount, onDestroy } from 'svelte';
    import {leaderBoard} from "$lib/dataman";
    import {leaderBoardList,sortMonkeys,storeSortedMonkeys,getData} from "$lib/getstats";

    let intervalId;
    onMount(async () => {
        await getData();
		sortMonkeys();
        storeSortedMonkeys();
        leaderBoardList("Expert");
        leaderBoard("Expert");

        const interval = 10000;
        intervalId = setInterval(async () => {
            leaderBoardList("Expert");
            leaderBoard("Expert");
        }, interval);
    });

    onDestroy(() => {
    clearInterval(intervalId);
    });

</script>

<link rel="stylesheet" href="/style.css">
<div class="table-container"><table id="leaderboard-stat"></table></div>