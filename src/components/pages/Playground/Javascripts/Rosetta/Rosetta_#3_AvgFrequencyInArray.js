function mode(arr)
{
    let frequency = []; //to check how frequent the number appears in an array
    let maxValue =0; //initially set to 0 to check the maximum times the number appears in the array. 
    //if the number has equal appearances say 1 and 8 appear 5 times each in the same array then it returns two numbers.
    const arrLen= arr.length;
    for (let i=0;i<arrLen;i++)
    {
        let value = arr[i]; //initializing the **VALUE** with the i'th element for every iteration.
        if(frequency[value]==undefined)
        {
            frequency[value]=1;
        }
        else{
            frequency[value]+=1;
        }
        if(frequency[value]>maxValue)
        {
            maxValue=frequency[value];
        }
    }
    const result = [];
    for(let key in frequency)
    {
        if(frequency[key] === maxValue)
        {
            result.push(Number(key));
        }
    }
    return result;
}

console.log(mode([1,2,2,4,5,6,2,4,5,6,5,5,5,1]));
console.log(mode([1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 17]));
console.log(mode([1, 2, 4, 4, 1]));