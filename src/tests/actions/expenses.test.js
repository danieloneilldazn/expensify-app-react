import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {addExpense, editExpense, removeExpense, startAddExpense} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

test('should create remove expense object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should create edit expense object', () => {
    const action = editExpense('123abc', {note: '123'});
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {note: '123'}
    });
})

test('should create add expense object with values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
})

test('should add expense to database and store', (done) => {
    const store = createMockStore({});
    const expenseData = {
        description: 'mouse',
        amount: 3000,
        note: 'This is a note',
        createdAt: 1000,
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done();
    });
})

test('should add expense with default values to database and store', (done) => {
    const store = createMockStore({});

    store.dispatch(startAddExpense({})).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                note: '',
                description: '',
                amount: 0,
                createdAt: 0,
            }
        });

        return database.ref(`expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            note: '',
            description: '',
            amount: 0,
            createdAt: 0
        })
        done();
    });
})

// test('should create add expense object with defaults', () => {
//     const expenseData = {
//         description: '',
//         note: '',
//         amount: 0,
//         createdAt: 0
//     };
//     const action = addExpense();
//     expect(action).toEqual({
//         type: 'ADD_EXPENSE',
//         expense: {
//             ...expenseData,
//             id: expect.any(String),
//         }
//     });
// })

