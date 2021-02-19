import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import selectExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpensesSummary = ({expenseCount, expenseTotal}) => {
    const expenseWord = expenseCount === 1 ? "expense" : "expenses"
    const formattedTotal = numeral(expenseTotal / 100).format('$0,0.00')
    return (
        <div>
            <h1> Viewing {expenseCount} {expenseWord} totalling {formattedTotal} </h1>
        </div>
    );
};

const mapStateToProps = (state) => {
    const visisbleExpenses = selectExpenses(state.expenses, state.filters);

    return {
        expenseCount: visisbleExpenses.length,
        expenseTotal: selectExpensesTotal(visisbleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);