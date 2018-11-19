const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {

    let bc, bc2;

    beforeEach( () => {
        bc = new Blockchain();
        bc2 = new Blockchain();
    });

    it('start genesis block', () => {
        expect(bc.chain[bc.chain.length - 1]).toEqual(Block.genesis());
    });

    it('add Block', () => {
        const data = "hoge";

        bc.addBlock(data);
        expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
    });

    it('validate a valid chain', () => {
        bc2.addBlock("hoge");

        expect(bc.isValidChain(bc2.chain)).toBe(true);
    });

    it('invalidate a chain with a corrupt genesis block', () => {
        bc2.chain[0].data = "Bad data";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('invalidates a corrupt chain', () => {
        bc2.addBlock("foo");
        bc2.chain[1].data = "Not foo";
        expect(bc.isValidChain(bc2.chain)).toBe(false);
    });

    it('ブロックチェーン更新テスト', () => {
        bc2.addBlock("fuga");
        bc.replaceChain(bc2.chain);
        expect(bc.chain).toBe(bc2.chain);
    });

    it('ブロックチェーン更新省略テスト', () => {
        bc.addBlock("fuda");
        bc.replaceChain(bc2.chain);
        expect(bc.chain).not.toEqual(bc2.chain);
    });
});