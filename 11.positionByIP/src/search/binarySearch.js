export default function binarySearch(ipRange, key) {
    try {
        let start = 0;
        let end = ipRange.length - 1;
        let middle = null;
        while (start <= end) {
            middle = Math.floor((end + start) / 2);
            if ((key <= ipRange[middle].highBound) && (key >= ipRange[middle].lowBound)) {
                return ipRange[middle];
            } else if ((key > ipRange[middle].lowBound)) {
                start = middle + 1;
            } else {
                end = middle - 1;
            }
        }
        return null;
    } catch(e){ 
        console.log(e);
        return null; 
    }
}
