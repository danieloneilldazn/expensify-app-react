
export default (expenses) => {
    let total = 0;

    if (expenses === undefined) {
        return total;
    }

    expenses.map((expense) => {
        total = total + expense.amount
    })

    return total;
}