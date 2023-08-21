/**
 * 
 * 
 * @param {string} str the string in which you want to insert the dots 
 * @param {number} dotCounter number of dots for insert
 * @returns {Array<string>} the array with strings in which already placed dots
 * this function uses recursion to find all posible combination to insert rest of dots into substring  
 * 
 */

function placeDot(str, dotCounter){
    
    if(dotCounter <= 0){ 
        return new Array(str);
    }
    let array = [];
 
    let bufString =  ''; 
    //let restString = str; 

    for(let position = 1; position < str.length - dotCounter + 1; position++ ){
        bufString = bufString.concat(str.substring(0, position), '.');  
        let restString = str.substring(position); 
        array = array.concat(placeDot(restString, dotCounter - 1).map(temp => bufString.concat(temp))); 
        bufString = '';
    }

    return array; 

}
/**
 * 
 * @param {string} str given string
 * @returns {Array<string>} array that contains all combination with dots between chars in given string 
 *  this function iterates over posible number of dots and  merges all arrays from placeDot function.
 */

function allPosibleComb(str){ 
    
    let result = new Array(str);

    if(str.length <= 1){ 
        return result; 
    }
        
    for(let dotCounter = 1; dotCounter < str.length ; dotCounter ++){ 
        result = result.concat(placeDot( str, dotCounter)); 
    }
      
    return result; 
}

const prompt = require('prompt-sync')();

var str = prompt('Enter string: ');
console.log(allPosibleComb(str)); 



