import client from '$lib/APIClient';
import { CONTRACT_NAME, TOKEN_CONTRACT_NAME } from '$lib/config';

export async function fetchMonkeyDetails(accountName) {
    const response = await client.v1.chain.get_table_rows({
        code: CONTRACT_NAME,
        scope: CONTRACT_NAME,
        table: 'monkeys',
        lower_bound: accountName,
        upper_bound: accountName,
        limit: 1
    });

    return response.rows[0];
};

export async function getData(){
    const monkeData = await fetchAllMonkeys();
    sessionStorage.setItem('monkeData',JSON.stringify(monkeData));
    const iterationCount = parseInt(sessionStorage.getItem('iterationCount')) || 0;
    sessionStorage.setItem('iterationCount', (iterationCount + 1).toString());
}

export function sortMonkeys(){
    const monkeyData = JSON.parse(sessionStorage.getItem('monkeData'));
    const monkeysWithZeroBananas = monkeyData.filter(monkey => monkey.bananas === "0.0000 BANANA");
    const monkeysWithBananas = monkeyData.filter(monkey => monkey.bananas != "0.0000 BANANA");
    return {
        badMonkeys: monkeysWithZeroBananas,
        goodMonkeys :monkeysWithBananas
    };
}

export function storeSortedMonkeys(){
    const sortedMonkeys = sortMonkeys();
        sessionStorage.setItem('goodMonkeys',JSON.stringify(sortedMonkeys.goodMonkeys));
        sessionStorage.setItem('badMonkeys',JSON.stringify(sortedMonkeys.badMonkeys));
}

export function rankMonkeys(){
    const goodMonkeysData = JSON.parse(sessionStorage.getItem('goodMonkeys'));
    if (goodMonkeysData) {
        let goodMonkeysStore = {};
        // Populate the lists
        goodMonkeysData.forEach(async monkey => {
        
        const kd = monkey.losses > 0 ? (monkey.wins / monkey.losses).toFixed(2) : (monkey.losses === 0 ? monkey.wins : 0);

        const kdIntervals = [
                { min: 0, max: 1, rank: 'Beginner' },
                { min: 1, max: 15, rank: 'Intermediate' },
                { min: 15, max: 40, rank: 'Advanced' },
                { min: 40, max: 80, rank: 'Expert' },
                { min: 80, max: 100, rank: 'Legend' }
            ];

            function getRank(kd) {
                for (const interval of kdIntervals) {
                    if (kd >= interval.min && kd <= interval.max) {
                        return interval.rank;
                    }
                }
                return 'Special Grade'; // Default rank if KD is outside the defined intervals
            }
            const rank = getRank(kd);
            // Create the object for the monkey
            const monkeyData = {
                wins: monkey.wins,
                losses: monkey.losses,
                kd: kd,
                rank: rank
            };

            // Assign the monkey object to the store with the monkey's name as the key
            goodMonkeysStore[monkey.monkey] = monkeyData;
        });

        // Convert the object to JSON and store it in sessionStorage
        const goodMonkeysStoreJSON = JSON.stringify(goodMonkeysStore);
        sessionStorage.setItem('rankStat', goodMonkeysStoreJSON);
    }
}


export function leaderBoardList(rank) {
    const rankData = JSON.parse(sessionStorage.getItem('rankStat'));

    const dataArray = Object.entries(rankData).map(([username, stats]) => ({ username, ...stats }));
    // Sort the array based on KD (in descending order)
    dataArray.sort((a, b) => parseFloat(b.kd) - parseFloat(a.kd));

    const userList = dataArray.filter(user => user.rank === rank);

    if (rank === "Beginner") {
        sessionStorage.setItem('beginnerStat', JSON.stringify(userList)); // Convert to JSON before storing
    } else if (rank === "Intermediate") {
        sessionStorage.setItem('intermediateStat', JSON.stringify(userList)); // Convert to JSON before storing
    } else if (rank === "Advanced") {
        sessionStorage.setItem('advancedStat', JSON.stringify(userList)); // Convert to JSON before storing
    } else if (rank === "Expert") {
        sessionStorage.setItem('expertStat', JSON.stringify(userList)); // Convert to JSON before storing
    } else if (rank === "Legend") {
        sessionStorage.setItem('legendStat', JSON.stringify(userList)); // Convert to JSON before storing
    } else if (rank === "Special Grade") {
        sessionStorage.setItem('specialGradeStat', JSON.stringify(userList)); // Convert to JSON before storing
    } else {
        alert('Leaderboard not found');
    }
}



// PROTECTED
export async function fetchAllMonkeys() {
    let accounts = [];
    let nextKey = null;

    do {
        const response = await client.v1.chain.get_table_rows({
            code: CONTRACT_NAME,
            scope: CONTRACT_NAME,
            table: 'monkeys',
            lower_bound: nextKey,
            limit: 300
        });

        nextKey = response['next_key']; // More results available
        accounts = accounts.concat(response.rows);
    } while (nextKey);

    return accounts;
};

export async function fetchRewardsAmount(accountName) {
    const response = await client.v1.chain.get_table_rows({
        code: CONTRACT_NAME,
        scope: CONTRACT_NAME,
        table: 'dividends',
        lower_bound: accountName,
        upper_bound: accountName,
        limit: 1
    });

    const dividendsRow = response.rows[0];
    const amount = parseFloat(dividendsRow?.bananas || 0);

    return amount;
};

export async function fetchLatestFightLogs(accountName) {
    const response = await client.v1.history.get_actions(accountName, -1, -66);
    const actions = response.actions;
    let fightLogs = [];

    // The array is sorted from the oldest to the newest
    for (let i = (actions.length - 1); i >= 0; i--) {
        const actionTrace = actions[i]['action_trace'];
        const act = actionTrace['act'];

        // Only return logs since the last fight
        if (act.account === CONTRACT_NAME && act.name === 'fight') {
            break;
        }

        if (act.account === CONTRACT_NAME && act.name === 'logduel') {
            fightLogs.push(act.data);
        }
    }

    return fightLogs;
}

export async function wasBeatenWhileHiding(accountName) {
    const response = await client.v1.history.get_actions(accountName, -1, -66);
    const actions = response.actions;
    let isLossRecorded = false;

    // The array is sorted from the oldest to the newest
    for (let i = (actions.length - 1); i >= 0; i--) {
        const actionTrace = actions[i]['action_trace'];
        const act = actionTrace['act'];

        if (act.account === CONTRACT_NAME) {
            switch(act.name) {
                case 'logduel':
                    const logReceiver = act.data['to'];
                    const damage = parseFloat(act.data['damage']);
                    isLossRecorded = (logReceiver === accountName && damage > 0);
                    break;
                case 'fight':
                    return false;
                case 'hideinbush':
                    return isLossRecorded;
                case 'stophiding':
                    return false;
                default:
                    break;
            }
        }
    }

    return false;
}

export async function fetchBananaReserve() {
    const response = await client.v1.chain.get_table_rows({
        code: 'swap.defi',
        scope: 'swap.defi',
        table: 'pairs',
        lower_bound: 2210,
        upper_bound: 2210,
        key_type: 'i64',
        limit: 1
    });

    const row = response.rows[0];
    
    return {
        reserveIn: row['reserve0'], // EOS
        reserveOut: row['reserve1'], // BANANA
        price : row['price1_last']
    };
}

export async function fetchBananasBalance(accountName) {
    return fetchTokenBalance(accountName, TOKEN_CONTRACT_NAME);
}

export async function fetchEOSBalance(accountName) {
    return await fetchTokenBalance(accountName, 'eosio.token');
}

// Helpers
async function fetchTokenBalance(accountName, contractName) {
    const response = await client.v1.chain.get_table_rows({
        code: contractName,
        scope: accountName,
        table: 'accounts'
    });

    const balance = response.rows[0]?.['balance'];
    return parseFloat(balance || 0);
}
