const randomNumber = function (lowBound: number, highBound: number) {
    return lowBound + (Math.random() * (highBound - lowBound));
}

export default randomNumber; 