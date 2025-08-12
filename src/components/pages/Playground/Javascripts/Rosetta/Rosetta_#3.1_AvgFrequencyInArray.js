function mode(arr)
{
    const frequencyMap = new Map();

    for (const nums of arr)
    {
        frequencyMap.set(nums, (frequencyMap.get(nums) || 0) +1);
    }
    let maxFreq = 0;
    for (const freq of frequencyMap.values())
    {
        if(freq > maxFreq)
        {
            maxFreq = freq;
        }
    }
    const result = [];
    for (const [num, freq] of frequencyMap.entries())
    {
        if (freq == maxFreq)
        {
            result.push(num);
        }
    }
    return result;
}

console.log(mode([1, 3, 6, 6, 6, 6, 7, 7, 12, 12, 17,8,8,8,8,8,8,8,8,8,8])); 
console.log(mode([1, 2, 4, 4, 1])); 