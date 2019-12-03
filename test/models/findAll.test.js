const assert = require('power-assert');
const Comment = require('../../models/Coment');

describe('findAllメソッドのテスト', () => {
    it('findAllはメソッドである', ()=> {
        assert.equal(typeof Comment.findAll === 'function', true);
    });

    it('メソッドを実行すると正しいデータ構造が返ってくる', () => {
        const comments = Comment.findAll();
        assert.equal(Array.isArray(comments), true);
        assert.equal(comments.length > 0, true);
        comments.forEach((comment) => {
            assert.deepEqual(comment, {
                id : comment.id,
                username : comment.username,
                body : comment.body,
                updatedAt : comment.updatedAt,
                createdAt : comment.createdAt
            });
        });
    });

});