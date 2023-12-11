function convertIpv4ToDec(ipv4) {
    let decimalIP = ipv4.split('.').reduce((accumulativeIp, octet) => {
        return (parseInt(accumulativeIp) << 8) + parseInt(octet);
    }, 0);
    return decimalIP >>> 0;

}

function addZeros(str) {
    while (str.length < 16) {
        str = "0" + str;
    }
    return str;
}

function convertIpv6ToDec(ipv6) {
    let binaryIP = "";
    ipv6.split(":").map((item) => "0x" + item).forEach((element) => {
        let num = parseInt(element, 16);
        binaryIP = binaryIP.concat(addZeros(num.toString(2)));
    });
    return BigInt("0b" + binaryIP); 
}

export default function (ip) {
    try {
        if (ip.includes('.')) {
            return convertIpv4ToDec(ip);
        } else { 
            return convertIpv6ToDec(ip);
        }
    } catch (e) {
        return null
    }
}