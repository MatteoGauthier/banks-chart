import { parse } from "csv/sync"
import { Transaction } from "./types"

function calculateTransactionBalances(transactions: Transaction[], currentBalance: number): Transaction[] {
  const result: Transaction[] = []
  let balance = currentBalance

  for (let i = transactions.length - 1; i >= 0; i--) {
    const transaction = transactions[i]
    transaction.balance = balance
    balance -= Number(transaction.Amount)
    result.unshift(transaction)
  }

  result[result.length - 1].balance = currentBalance

  return result
}
export const parseCSV = (rawFile: string) => {
  const parsedTable = parse(rawFile, {
    columns: true,
    delimiter: ";",
  }) as Transaction[]

  let clone = structuredClone(parsedTable)
    .filter((transaction) => transaction["Account type"] !== "Loan")
    .filter((transaction) => Boolean(transaction.Date))
    .map((transaction) => ({
      ...transaction,
      Date: new Date(transaction.Date),
      amountType: Number(transaction["Amount"]) > 0 ? "income" : "expense",
    }))
    .sort((a, b) => {
      return a.Date.getTime() - b.Date.getTime()
    })

  const withBalance = calculateTransactionBalances(clone, Number(clone[clone.length - 1]["Account balance"]))
  return withBalance
}
