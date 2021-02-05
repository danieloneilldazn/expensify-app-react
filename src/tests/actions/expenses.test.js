import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should create remove expense object', () => {
    const action = removeExpense({ id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should create edit expense object', () => {
    const action = editExpense('123abc', { note: '123' });
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: { note: '123' }
    });
})

test('should create add expense object with values', () => {
    const expenseData = {
        description: '123',
        note: '123',
        amount: 123,
        createdAt: 123
    };

    const action = addExpense(expenseData);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String)
        }
    });
})

test('should create add expense object with defaults', () => {
    const expenseData = {
        description: '',
        note: '',
        amount: 0,
        createdAt: 0
    };
    const action = addExpense();
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            ...expenseData,
            id: expect.any(String),
        }
    });
})

