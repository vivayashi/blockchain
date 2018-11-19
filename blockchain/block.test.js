const Block = require('./block');
const { DIFFICULITY } = require('../config');

describe('Block', () => {

    beforeEach( () => {
        data = "sato";
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data)
    });

    it('data test', () => {
        expect(block.data).toEqual(data);
    });

    it('hash test', () => {
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('指定なインドのハッシュ値生成テスト', () => {
        expect(block.hash.substring(0,DIFFICULITY)).toEqual('0'.repeat(DIFFICULITY));
        console.log(block.toString());
    });
});