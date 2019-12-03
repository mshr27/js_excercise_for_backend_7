const assert = require('power-assert');
const Comment = require('../../models/Coment');

describe('createメソッドのテスト', () => {
    it('createはメソッドである', () => {
        assert.equal(typeof Comment.create === 'function', true);
    });

    it('usernameがないとエラーとなる', () => {
        try {
            Comment.create({body : 'test body'});
            assert.fail();
        } catch(error){
            assert.equal(error.message, 'usernameは必須です');
        }
    });

    it('bodyがないとエラーとなる', () => {
        try {
            Comment.create({username : "testuser"});
            assert.fail();
        } catch(error){
            assert.equal(error.message, 'bodyは必須です');
        }
    });

    it('正しいデータを送ると新規commentが返ってくる', () => {
        const oldComments = Comment.findAll();
        const data = {username: 'test user', body:'test body'};
        const createComment = Comment.create(data);
        assert.deepEqual(createComment, {
            id : createComment.id,
            username : data.username,
            body : data.body,
            updatedAt : createComment.updatedAt,
            createdAt : createComment.createdAt
        });

        const currentComments = Comment.findAll();

        assert.equal(currentComments.length, oldComments.length + 1);

    });
});