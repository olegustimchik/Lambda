export function privateBankRate(data, index){
    return  `PRIVATE BANK : \n BUY - ${Number(data[index]["buy"]).toFixed(2)} \n SELL - ${Number(data[index]["sale"]).toFixed(2)}`; 
} 

export function monoBankRate(data, index) { 
    return  `MONO BANK : \n BUY - ${Number(data[index]["rateBuy"]).toFixed(2)} \n SELL - ${Number(data[index]["rateSell"]).toFixed(2)}`; 
}
