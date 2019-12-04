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

const VALID_ID = 1;
const INVALID_ID = -1;

describe('test Put /api/comments/:id', () => {
    it('idが1以上の数字以外の場合400エラーとなる', async () => {
        const putData = {username : 'test user', body: 'test body'};
        const res = await requestHelper.request({
            method :'put',
            endPoint : `/api/comments/${INVALID_ID}`,
            statusCode : 400
        }).send(putData);

        assert.deepEqual(res.body, {
            message:'idは必須です(1以上の数字)'
        });
    });

    it('usernameが含まれない場合400エラーとなる', async () => {
        const putData = {body:'test body'};
        const res = await requestHelper.request({
            method :'put',
            endPoint : `/api/comments/${VALID_ID}`,
            statusCode : 400
        }).send(putData);

        assert.deepEqual(res.body, {
            message: 'usernameは必須です'
        });
    });

    it('bodyが含まれない場合400エラーとなる', async () => {
        const putData = {username:'test user'};
        const res = await requestHelper.request({
            method :'put',
            endPoint : `/api/comments/${VALID_ID}`,
            statusCode : 400
        }).send(putData);

        assert.deepEqual(res.body, {
            message: 'bodyは必須です'
        });
    });

    it('idに該当するコメントがない場合400エラーとなる', async () => {
        const putData = {username:'test user', body: 'test body'};
        const noneId = 9999;
        const res = await requestHelper.request({
            method :'put',
            endPoint : `/api/comments/${noneId}`,
            statusCode : 400
        }).send(putData);

        assert.deepEqual(res.body, {
            message: 'idに該当するコメントがありません'
        });
    });

    it('正しいデータ、idを送るとstatus 200で成功となり、更新されたコメントを返す', async () => {
        const oldComments = await getComments();
        const putData = {username:'test user', body: 'test body'};
        const res = await requestHelper.request({
            method :'put',
            endPoint : `/api/comments/${VALID_ID}`,
            statusCode : 200
        }).send(putData);

        const updateComment = res.body;

        assert.deepEqual(updateComment, {
            id : VALID_ID,
            username : putData.username,
            body : putData.body,
            updatedAt : updateComment.updatedAt,
            createdAt : updateComment.createdAt    
        });

        const currentComments = await getComments();

        assert.notDeepEqual(oldComments, currentComments,
            '更新後、id:1のデータは一致しない')
    });
});