const assert = require('power-assert');
const Comment = require('../../models/Coment');

describe('deleteメソッドのテスト', () => {
    it('deleteはメソッドである', () => {
        assert.equal(typeof Comment.delete === 'function', true);
    });

    it('idが数字以外、1以下の数字の場合エラーとなる', () => {
        const dataList = [
            {},
            {id : -1},
            {id : []},
            {id : {}},
            {id : '1'},
            {id : null}
        ];

        dataList.forEach((data) => {
            try {
                Comment.delete(data);
                assert.fail();
            } catch(error){
                assert.equal(error.message, 'idは必須です(1以上の数字)');
            }
        });
    });

    it('該当するidがない場合エラーとなる', () => {
        const id = 9999;

        try {
            Comment.delete(id);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'idに該当するコメントはありません');
        }
    });

    it('指定したidのコメントが削除されデータが返る', () => {
        const oldComments = Comment.findAll();
        const id = 1;
        const deleteComment = Comment.delete(id);
        assert.deepEqual(deleteComment, {
            id : deleteComment.id,
            username : deleteComment.username,
            body : deleteComment.body,
            updatedAt : deleteComment.updatedAt,
            createdAt : deleteComment.createdAt
        });

        const currentComments = Comment.findAll();
        assert.equal(currentComments.length, oldComments.length - 1);
    });
});