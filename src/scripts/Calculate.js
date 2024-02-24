const Calculate = (() => {
  function sortTransactionsByDate(arr) {
    /*
        The function sorts a copy of the `transactions` array by date
        from most recent to oldest.
    */
    return arr.slice().sort((transactionA, transactionB) => {
      return new Date(transactionB.date) - new Date(transactionA.date);
    });
  }

  return { sortTransactionsByDate };
})();

export default Calculate;
