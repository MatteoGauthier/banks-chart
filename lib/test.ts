interface Transaction {
  date: string;
  amount: number;
  balance?: number;
}

function calculateTransactionBalances(transactions: Transaction[], currentBalance: number): Transaction[] {
  const result: Transaction[] = [];
  let balance = currentBalance;

  for (let i = transactions.length - 1; i >= 0; i--) {
    const transaction = transactions[i];
    transaction.balance = balance;
    balance -= transaction.amount;
    result.unshift(transaction);
  }

  result[result.length - 1].balance = currentBalance;

  return result;
}


const transactions: Transaction[] = [
  { date: "2023-09-01", amount: 100 },
  { date: "2023-09-05", amount: -50 },
  { date: "2023-09-10", amount: -30 },
  // ...
]

const currentBalance = 500

const transactionsWithBalances = calculateTransactionBalances(transactions, currentBalance)

console.log(transactionsWithBalances)
