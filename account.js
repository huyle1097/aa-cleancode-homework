class Account {
    constructor(credit, debit){
        this.accountNumber = Math.random(),
        this.credit = credit,
        this.debit = debit
    }

    isCreditAccount = function() {
        return this.credit !== null;
    }

    isDebitAccount = function() {
        return this.credit == null && this.debit != null;
    }

    isUnidentifiedAccount = function() {
        return this.debit == null && this.debit == null;
    }
}

function createCreditAccount(){
    return new Account(Math.random(), Math.random());
}

function createDebitAccount(){
    return new Account(null, Math.random());
}

function createUnidentifiedAccount(){
    return new Account(null, null);
}

// init accounts
var accounts = [];

accounts.push(createDebitAccount());
accounts.push(createUnidentifiedAccount());
accounts.push(createDebitAccount());
accounts.push(createCreditAccount());
accounts.push(createUnidentifiedAccount());
accounts.push(createCreditAccount());

// sort functions
function compareValue(key, order='asc') {
    return function(a, b) {
        let comparison = a[key] - b[key];
        return (
            (order == 'desc') ? (comparison * -1) : comparison
        );
    };
}

function getAccountsByType(accounts, type){
    let result = []
    switch (type) {
        case "credit":
            result = accounts.filter((a) => a.isCreditAccount());
            break;
        case "debit":
            result = accounts.filter((a) => a.isDebitAccount());
            break;
        case "unidentified":
            result = accounts.filter((a) => a.isUnidentifiedAccount());
            break;
    }
    return result;
}

function sortByDescAccountNumber(accounts) {
    return accounts.sort(compareValue('accountNumber', 'desc'));
}

function sortAccounts(accounts){
    let sortedAccounts = [];
    sortByDescAccountNumber(getAccountsByType(accounts, 'credit')).map(a => sortedAccounts.push(a));
    sortByDescAccountNumber(getAccountsByType(accounts, 'debit')).map(a => sortedAccounts.push(a));
    sortByDescAccountNumber(getAccountsByType(accounts, 'unidentified')).map(a => sortedAccounts.push(a));
    return sortedAccounts;
}

// print
console.log('Before sorting:');
console.log(accounts);
console.log('After sorting:');
console.log(sortAccounts(accounts));