import axios from 'axios';

export let history;
export let now;
export let prev;
export let diff;
export let ratio;
export let priceData;

export function getHistoryByDay(){
    var url = "https://financialmodelingprep.com/api/v3/historical-price-full/15min/%5EDJI?from=2020-01-01&apikey=004a30c7746147359b00f66b75ba621a";
    return axios.get(url);
}
export function getHistoryByMinutes(){ 
    var url = "https://financialmodelingprep.com/api/v3/historical-chart/1min/%5EDJI?apikey=004a30c7746147359b00f66b75ba621a";
    return axios.get(url);
}

export function getCurrentValue(){
    var url = "https://financialmodelingprep.com/api/v3/quote/%5EDJI?apikey=004a30c7746147359b00f66b75ba621a";
    return axios.get(url);
}
