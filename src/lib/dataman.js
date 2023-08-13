export function updatePrice(){
    const price1 = document.getElementById('price');
    const price = sessionStorage.getItem('priceBanana');
    if(price){
        price1.innerHTML = price + ' EOS';
    }else{
        price1.innerHTML = 'Loading...';
    }        
}

export function listMonkeys(){
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
        const monke = monkey.monkey;
        let monkeRankStat = JSON.parse(sessionStorage.getItem('rankStat'));
        let kd = monkeRankStat[monke].kd;
        let rank = monkeRankStat[monke].rank;

            listItem.textContent = `${monkey.monkey} | ( ${monkey.wins}, ${monkey.losses} )  |  K/D ( ${kd} ) |  ${rank} `;
            goodMonkeysList.appendChild(listItem);
    });

    let counter = 1;

    badMonkeysData.forEach(monkey => {
        const listItem = document.createElement('li');
        listItem.textContent = `Scared Monkey #${counter} : ${monkey.monkey}`;
        badMonkeysList.appendChild(listItem);
        counter++; // Increment the counter for the next monkey
    });
    }else{
        console.log('Sorted Data not found');
    }
}