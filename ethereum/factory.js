import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xa3c9Acc170532da64D56972bFDc7AB67454ad2cA'
);

export default instance;
