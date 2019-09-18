// transform.ts
// This extremely over-complicated function will receive an array of numbers
// and return 0 if the sum of the numbers is 0, 1 if the sum is > 0, and -1
// if the sum is -1
// I made it complicated so we will have lots of branches to test
export function transform(input: number[]): number {
    if (!input || input.constructor !== Array)
        throw new Error('Input must be an array of numbers!');

    try {
        const total = input.reduce((acc: number, n: number) => acc + n, 0);

        if (total === 0) {
            console.log('The input is equal to zero');
            return 0;
        } else if (total > 0) {
            console.log('The input is greater than zero');
            return 1;
        } else {
            console.log('The input is greater than zero');
            return -1;
        }
    } catch (e) {
        console.error(`Unknown error occurred: ${e}`);
        return 0;
    }
};