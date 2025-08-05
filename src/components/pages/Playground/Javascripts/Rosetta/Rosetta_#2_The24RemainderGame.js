function evaluateExpression(expr) {
    try {
        return eval(expr);
    } catch (e) {
        return Infinity;
    }
}

function generateOperatorCombinations() {
    const ops = ['+', '-', '*', '/'];
    const combinations = [];
    for (const a of ops) {
        for (const b of ops) {
            for (const c of ops) {
                combinations.push([a, b, c]);
            }
        }
    }
    return combinations;
}

function permute(arr) {
    if (arr.length === 0) return [[]];
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        const rest = arr.slice(0, i).concat(arr.slice(i + 1));
        for (const perm of permute(rest)) {
            result.push([arr[i], ...perm]);
        }
    }
    return result;
}

function solve24(digits) {
    const permutations = permute(digits.split('').map(Number));
    const operatorCombos = generateOperatorCombinations();

    for (const nums of permutations) {
        for (const ops of operatorCombos) {
            const exprs = [
                `(${nums[0]}${ops[0]}${nums[1]})${ops[1]}(${nums[2]}${ops[2]}${nums[3]})`,
                `((${nums[0]}${ops[0]}${nums[1]})${ops[1]}${nums[2]})${ops[2]}${nums[3]}`,
                `${nums[0]}${ops[0]}(${nums[1]}${ops[1]}(${nums[2]}${ops[2]}${nums[3]}))`,
                `${nums[0]}${ops[0]}((${nums[1]}${ops[1]}${nums[2]})${ops[2]}${nums[3]})`,
                `(${nums[0]}${ops[0]}(${nums[1]}${ops[1]}${nums[2]}))${ops[2]}${nums[3]}`
            ];

            for (const expr of exprs) {
                if (Math.abs(evaluateExpression(expr) - 24) < 1e-6) {
                    return expr;
                }
            }
        }
    }

    return "no solution exists";
}

console.log(solve24("1234")); // Example usage
console.log(solve24("5678")); // Example usage
console.log(solve24("4567")); // Example usage
console.log(solve24("1236"));
