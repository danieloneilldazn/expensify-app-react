import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css'
import './styles/styles.scss'
import 'react-dates/lib/css/_datepicker.css';
import AppRouter from './routers/AppRouter'
import configureStore from './store/configureStore'

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';

const store = configureStore();

store.dispatch(addExpense({ description: "Water bill", amount: 4500, createdAt: 10000}));
store.dispatch(addExpense({ description: "Gas bill", amount: 6000, createdAt: 1000 }));
store.dispatch(addExpense({ description: "Rent", amount: 1000 }));

const jsx = (
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'))