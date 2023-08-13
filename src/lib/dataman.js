export function updatePrice(){
    const price1 = document.getElementById('price');
    const price = sessionStorage.getItem('priceBanana');
    if(price){
        price1.innerHTML = price + ' EOS';
    }else{
        price1.innerHTML = 'Loading...';
    }        
}

export function listMonkeys() {
    const goodMonkeysData = JSON.parse(sessionStorage.getItem('goodMonkeys'));
    const rankData = JSON.parse(sessionStorage.getItem('rankStat'));
    const dataTable = document.getElementById('jungle-stat');
    dataTable.innerHTML = '<thead><tr><th></th><th>Monkey</th><th>Wins</th><th>Losses</th><th>K/D</th><th>Unhidden Since</th><th>Hiding since</th><th>Rank</th></tr></thead>';

    if (goodMonkeysData && rankData) {
        let num = 1;
        for (const entry of goodMonkeysData) {
            const monke = entry.monkey;
            const rankEntry = rankData[monke]; // Get the rank data for the current monkey
            const hideSince = entry.hiding_details.hiding_since;
            const unhidAt = entry.hiding_details.unhidden_at;
            const now = Date.now(); // Current UTC time

            const timeDifferenceMs =  now - Date.parse(hideSince+'Z'); // Time difference in milliseconds
            const timeDifferenceUnhid =  now - Date.parse(unhidAt+'Z'); // Time difference in milliseconds


            const timeDifferenceString = hideSince === null ? 'Unhidden' : `${Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24))}d ${Math.floor((timeDifferenceMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}h ${Math.floor((timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60))}m`;

            let timeDifferenceStringUnhid;

            try {
                timeDifferenceStringUnhid = `${Math.floor(timeDifferenceUnhid / (1000 * 60 * 60 * 24))}d ${Math.floor((timeDifferenceUnhid % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))}h ${Math.floor((timeDifferenceUnhid % (1000 * 60 * 60)) / (1000 * 60))}m`;

                console.log(timeDifferenceStringUnhid);

                if(hideSince != null){
                    timeDifferenceStringUnhid = 'Hidden';
                }else if (unhidAt === "1970-01-01T00:00:00") {
                    timeDifferenceStringUnhid = 'Never Hidden';  // If time difference is greater than 3 years, display '∞'
                }
            } catch (error) {
                timeDifferenceStringUnhid = '%ERROR%';
            }

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${num}</td>
                <td>${entry.monkey}</td>
                <td>${entry.wins}</td>
                <td>${entry.losses}</td>
                <td>${rankEntry.kd}</td>
                <td>${timeDifferenceStringUnhid}</td>
                <td>${timeDifferenceString}</td>
                <td>${rankEntry.rank}</td>
            `;
            dataTable.appendChild(newRow);
            num++;
        }
    } else {
        console.log('Sorted Data not found');
    }
}