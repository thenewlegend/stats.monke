<script>
    import { onMount } from 'svelte';
    import { sortMonkeys,fetchBananasBalance,fetchAllMonkeys,fetchMonkeyDetails,fetchBananaReserve } from './getstats';

    async function getData(){
        const monkeData = await fetchAllMonkeys();
        sessionStorage.setItem('monkeData',JSON.stringify(monkeData));
        const iterationCount = parseInt(sessionStorage.getItem('iterationCount')) || 0;
        sessionStorage.setItem('iterationCount', (iterationCount + 1).toString());
    }

    function listMonkeys(){
        const goodMonkeysData = JSON.parse(sessionStorage.getItem('goodMonkeys'));
        const badMonkeysData = JSON.parse(sessionStorage.getItem('badMonkeys'));

        if (goodMonkeysData && badMonkeysData) {
            const goodMonkeysList = document.getElementById('goodMonkeysList');
            const badMonkeysList = document.getElementById('badMonkeysList');

            // Clear previous content
            goodMonkeysList.innerHTML = '';
            badMonkeysList.innerHTML = '';

            // Populate the lists
            goodMonkeysData.forEach(async monkey => {
            const listItem = document.createElement('li');
            
            let kd;

            if (monkey.wins > 0 && monkey.losses > 0) {
                kd = (monkey.wins / monkey.losses).toFixed(2);
            } else if (monkey.losses === 0) {
                kd = monkey.wins;
            } else {
                kd = 0;
            }

            const kdIntervals = [
                    { min: 0, max: 5, rank: 'Beginner' },
                    { min: 5, max: 20, rank: 'Intermediate' },
                    { min: 20, max: 50, rank: 'Advanced' },
                    { min: 50, max: 150, rank: 'Expert' },
                    { min: 150, max: 200, rank: 'Legend' }
                ];

                // Function to get rank based on KD
                function getRank(kd) {
                    for (const interval of kdIntervals) {
                        if (kd >= interval.min && kd <= interval.max) {
                            return interval.rank;
                        }
                    }
                    return 'Special Grade'; // Default rank if KD is outside the defined intervals
                }

                const rank = getRank(kd);

                listItem.textContent = `${monkey.monkey}, ( ${monkey.wins}, ${monkey.losses} ) , K/D ( ${kd} ), [ RANK : ${rank} ]`;
                goodMonkeysList.appendChild(listItem);
        });

        let counter = 1;

        badMonkeysData.forEach(monkey => {
            const listItem = document.createElement('li');
            listItem.textContent = `Scared Monkey #${counter} : ${monkey.monkey}`;
            badMonkeysList.appendChild(listItem);
            
            counter++; // Increment the counter for the next monkey
        });
        }
    }

    function updatePrice(){
        const price1 = document.getElementById('price');
        const price = localStorage.getItem('priceBanana');
        if(price){
            price1.innerHTML = price + ' EOS';
        }else{
            price1.innerHTML = 'Loading...';
        }        
    }

    onMount(async () => {

        await getData();
            const sortedMonkeys = sortMonkeys();
            sessionStorage.setItem('goodMonkeys',JSON.stringify(sortedMonkeys.goodMonkeys));
            sessionStorage.setItem('badMonkeys',JSON.stringify(sortedMonkeys.badMonkeys));
            listMonkeys();
            updatePrice();

        const interval = 10000
        const intervalId = setInterval(async () => {
            await getData();
            const sortedMonkeys = sortMonkeys();
            sessionStorage.setItem('goodMonkeys',JSON.stringify(sortedMonkeys.goodMonkeys));
            sessionStorage.setItem('badMonkeys',JSON.stringify(sortedMonkeys.badMonkeys));
            listMonkeys();
            updatePrice();
        }, interval);

        return () => clearInterval(intervalId); // Clear interval on component unmount
    });

    onMount(async () => {
        const interval = 15000
        const intervalId = setInterval(async () => {
            localStorage.setItem('priceBanana',parseFloat((await fetchBananaReserve()).price).toFixed(6));
        }, interval);
    return () => clearInterval(intervalId); // Clear interval on component unmount
    });
    
</script>

<h1>Monke Stats</h1>

<p id="price"></p>
<ul id="goodMonkeysList"></ul>
<ul id="badMonkeysList"></ul>