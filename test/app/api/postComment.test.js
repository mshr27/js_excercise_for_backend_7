const assert = require('power-assert');
const requestHelper = require('../../helper/requestHelper');

const getComments = async () => {
    const res = await requestHelper.request({
        method : 'get',
        endPoint : '/api/comments',
        statusCode : 200
    });
    return res.body;
};

describe('Post /api/comments', () => {
    it('usernameが含まれない場合400エラーが返る', async () => {
        const postData = {body : 'test body'};
        const res = await requestHelper.request({
            method: 'post',
            endPoint : '/api/comments',
            statusCode : 400
        }).send(postData);

        assert.deepEqual(res.body, {
            message:'usernameは必須です'
        });
    });

    it('bodyが含まれない場合400エラーが返る', async () => {
        const postData = {username : 'test user'};
        const res = await requestHelper.request({
            method: 'post',
            endPoint : '/api/comments',
            statusCode : 400
        }).send(postData);

        assert.deepEqual(res.body, {
            message : 'bodyは必須です'
        });
    });

    it('正しいデータを送るとstatus 200で成功し、新規作成されたcommentを返す', async () => {
        const oldComments = await getComments();
        
        const postData = {username: 'test user', body: 'test body'};
        const res = await requestHelper.request({
            method: 'post',
            endPoint : '/api/comments',
            statusCode : 200
        }).send(postData);

        const createComment = res.body;

        assert.deepEqual(createComment, {
            id : createComment.id,
            username : postData.username,
            body : postData.body,
            updatedAt : createComment.updatedAt,
            createdAt : createComment.createdAt
        });

        const currentComments = await getComments();
        assert.equal(oldComments.length + 1 , currentComments.length);
    });
});