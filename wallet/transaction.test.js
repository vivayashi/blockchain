const Transaction = require('./transaction');
const Wallet = require('./index');

describe('Transaction', () => {
    let transaction, wallet, receipient, amount;
    beforeEach( () => {
      wallet =  new Wallet(); //口座
      amount = 500;
      receipient = 'r2c1e0p24nt'; // 受手の口座番号
      transaction = Transaction.newTransaction(wallet, receipient, amount);
    });

    it('残高差し引きテスト', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount)
          .toEqual(wallet.balance - amount);
    });

    it('送金テスト', () => {
        expect(transaction.outputs.find(output => output.address === receipient).amount)
          .toEqual(amount);
    });

    it('取引署名テスト', () => {
        expect(transaction.input.amount).toEqual(amount);
    });

    it('正常な取引の検証テスト', () => {
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('不正な取引の検証テスト', () => {
        transaction.outputs[0].amount = 5555;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);
    });

    describe('残高超過テスト', () => {
        beforeEach( () => {
            amount = 50000;
            transaction = Transaction.newTransaction(wallet, receipient, amount);
        })

        it('取引省略テスト', () => {
            expect(transaction).toEqual(undefined);
        });
    });
});