import getTotalExpenses from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('test no expenses passed to getTotalExpenses', () => {
    const total = getTotalExpenses();
    expect(total).toEqual(0);
})

test('test single expense passed to getTotalExpenses', () => {
    const total = getTotalExpenses([expenses[0]]);
    expect(total).toEqual(expenses[0].amount);
})

test('test multiple expenses passed to getTotalExpenses', () => {
    const total = getTotalExpenses(expenses);
    expect(total).toEqual(expenses[0].amount + expenses[1].amount + expenses[2].amount);
})