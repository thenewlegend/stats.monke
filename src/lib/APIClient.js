import { APIClient } from '@wharfkit/antelope';
import { BLOCKCHAIN } from '$lib/config';

const endpoint = BLOCKCHAIN.rpcEndpoints[0];
const url = `${endpoint.protocol}://${endpoint.host}:${endpoint.port}`;
const client = new APIClient({url: url});

export default client;
