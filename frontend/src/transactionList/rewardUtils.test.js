import { calculateRewardPoints } from './transactionList';

describe('calculateRewardPoints', () => {
    test('calculates points for transaction > 100', () => {
        const amount = 120;
        const expectedPoints = 90;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(expectedPoints)
    })
    test('calculates points for transaction between 50 and 100', () => {
        const amount = 75;
        const expectedPoints = 25;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(expectedPoints)
    })
    test('calculates points for transaction < 50', () => {
        const amount = 40;
        const expectedPoints = 0;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(expectedPoints)
    })
    test('calculates points for transaction = 100', () => {
        const amount = 100;
        const expectedPoints = 50;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(expectedPoints)
    })
    test('calculates points for transaction = 50', () => {
        const amount = 50;
        const expectedPoints = 0;
        const points = calculateRewardPoints(amount);
        expect(points).toBe(expectedPoints)
    })
})