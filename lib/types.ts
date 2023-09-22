export type Transaction = {
  Date: Date
  "Realisation date": Date
  "Assigned date": string
  Label: string
  "Original bank label": string
  "Category name": string
  Amount: string
  Currency: string
  Type: string
  "Expected?": string
  "Expected debit date": string
  "Reimbursement status": string
  "Bank name": string
  "Account name": string
  "Custom account name": string
  "Account number": string
  "Account originalNumber": string
  "Account type": string
  "Account balance": string
  "Account coming balance": string
  "Account IBAN": string
  "Account vendorDeleted": string
  "Recurrent?": string
  "Recurrence name": string
  "Recurrence status": string
  "Recurrence frequency": string
  "Tag 1": string
  "Tag 2": string
  "Tag 3": string
  "Tag 4": string
  "Tag 5": string
  "Unique ID": string
  "Unique account ID": string
  "Loan amount": string
  "Interest rate": string
  "Next payment date": string
  "Next payment amount": string
  "Subscription date": string
  "Repayment date": string
} & { balance?: number; amountType?: string }
