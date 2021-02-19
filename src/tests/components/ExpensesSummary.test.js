import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should show summary with one expense', () => {
    const wrapper = shallow(<ExpensesSummary 
        expenseCount={1} 
        expenseTotal={expenses[1].amount}
    />);
    expect(wrapper).toMatchSnapshot();
})

test('should show summary with many expenses', () => {
    const wrapper = shallow(<ExpensesSummary 
        expenseCount={expenses.length} 
        expenseTotal={expenses[0].amount + expenses[1].amount + expenses[2].amount}
    />);
    expect(wrapper).toMatchSnapshot();
})