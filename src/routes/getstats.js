import client from './APIClient';
import { CONTRACT_NAME, TOKEN_CONTRACT_NAME } from '../config';

console.log(CONTRACT_NAME);

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
        reserveOut: row['reserve1'] // BANANA
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
