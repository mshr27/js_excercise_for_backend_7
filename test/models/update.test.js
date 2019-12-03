const assert = require('power-assert');
const Comment = require('../../models/Coment');

describe('updateメソッドのテスト', () => {
    it('updateはメソッドである', () => {
        assert.equal(typeof Comment.update === 'function', true);
    });

    it('idが数字以外、1以下の数字でエラーとなる', () => {
        const dataList = [
            {},
            {id : 0},
            {id : -1},
            {id : {}},
            {id : []},
            {id : null},
            {id : '1'}
        ];

        dataList.forEach((data) => {
            try {
                Comment.update(dataList);
                assert.fail();
            } catch (error){
                assert.equal(error.message, 'idは必須です(1以上の数字)');
            }
        });
    });

    it('usernameがないとエラーとなる', () => {
        const data = {id : 1, body: 'test body'};
        try {
            Comment.update(data);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'usernameは必須です');    
        }
    });
    it('bodyがないとエラーとなる', () => {
        const data = {id : 1, username: 'test user'};
        try {
            Comment.update(data);
            assert.fail();
        } catch (error) {
            assert.equal(error.message, 'bodyは必須です');    
        }
    });
    it('該当するidがない場合エラーとなる', () => {
        const data = {
            id : 99999, 
            username: 'test user', 
            body: 'test body'
        };

        try {
            Comment.update(data);
            assert.fail();

        } catch(error){
            assert.equal(error.message, 'idに該当するコメントがありません');
        }
    });

    it('正しいデータを送ると更新されたcommentを返す', () => {
        const data = {id : 1, username : 'test user', body : 'test body'};
        
        const updateComment = Comment.update(data);

        assert.deepEqual(updateComment, {
            id : data.id,
            username : data.username,
            body : data.body,
            updatedAt : updateComment.updatedAt,
            createdAt : updateComment.createdAt
        });
        
        const currentComments = Comment.findAll();
        assert.equal(currentComments[0], updateComment);
        assert.equal(updateComment.updatedAt > updateComment.createdAt, true);
    });

});