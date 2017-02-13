
export interface Budget {
    budgetItems: BudgetItem[];
    accounts: Account[];
    userId: string;
    lastUpdated: Date;
}

export interface Account {
    name: string;
    accountType: string;
    currentBalance: number;

}

export interface BudgetItem {
    name: string;
    category: string;
    initialDate: Date;
    period: string;
    frequency: number;
    instances: BudgetInstances[];
    amount: number;
}

export interface BudgetInstances {
    date: Date;
    amount: number;
    active: boolean;
}


export const AccountTypes = {
    PRIMARY: 'Primary',
    SECONDARY: 'Secondary'
}

export const Categories = {
    INCOME: 'Income',
    EXPENSE: 'Expense',
    ENVELOPE: 'Envelope'
};

export const Periods = {
    DAY: 'Day',
    WEEK: 'Week',
    MONTH: 'Month',
    YEAR: 'Year',
    ONCE: 'Once'
};

export class ConstantsValues
{
    static AccountTypes: string[] = [ AccountTypes.PRIMARY, AccountTypes.SECONDARY ];
    static Categories: string[] = [ Categories.INCOME, Categories.EXPENSE, Categories.ENVELOPE ];
    static Periods: string[] = [ Periods.DAY, Periods.WEEK, Periods.MONTH, Periods.YEAR, Periods.ONCE ]
}

