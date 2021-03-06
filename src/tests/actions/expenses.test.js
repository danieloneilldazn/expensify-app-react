import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
    addExpense,
    editExpense,
    startEditExpense,
    removeExpense,
    startRemoveExpense,
    startAddExpense,
    setExpenses,
    startSetExpenses
} from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'test_user_id';
const expensesRef = `users/${uid}/expenses`
const defaultAuthState = { auth: { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
   const expensesData = {};
   expenses.forEach(({id, description, note, amount, createdAt}) => {
       expensesData[id] = { description, note, amount, createdAt };
   });
   database.ref(expensesRef).set(expensesData).then(() => done());
});

test('should create remove expense object', () => {
    const action = removeExpense({id: '123abc'});
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    })
})

test('should edit expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    const updates = {
        amount: 21045
    }
    store.dispatch(startEditExpense(id, updates)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates
        })

        return database.ref(`${expensesRef}/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val().amount).toBe(updates.amount);
        done();
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = expenses[0].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });

        return database.ref(`${expensesRef}/${id}`).once('value');
    }).then((snapshot) => {
        expect(
            snapshot.val()).toBeFalsy();
        done();
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
    const store = createMockStore(defaultAuthState);
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

        return database.ref(`${expensesRef}/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData)
        done();
    });
})

test('should add expense with default values to database and store', (done) => {
    const store = createMockStore(defaultAuthState);

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

        return database.ref(`${expensesRef}/${actions[0].expense.id}`).once('value');
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


test('should create set expense object', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    })
})


test('should fetch expenses from firebase', (done) => {
    const store = createMockStore(defaultAuthState);

    store.dispatch(startSetExpenses()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
        done()
    });

})

