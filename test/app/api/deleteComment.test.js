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

describe('test Delete /api/comments/:id', () => {
    const VALID_ID = 1;
    const INVALID_ID = -1;

    it('idが1以上の数字以外の場合400エラーとなる', async () => {
        const res = await requestHelper.request({
            method : 'delete',
            endPoint : `/api/comments/${INVALID_ID}`,
            statusCode : 400
        });

        assert.deepEqual(res.body, {
            message : 'idは必須です(1以上の数字)'
        });
    });

    it('該当するidがない場合400エラーとなる', async () => {
        const noneId = 99999;

        const res = await requestHelper.request({
            method : 'delete',
            endPoint : `/api/comments/${noneId}`,
            statusCode : 400
        });

        assert.deepEqual(res.body, {
            message: 'idに該当するコメントはありません'
        });
    });

    it('正しいidを送るとstatus 200で成功となり、削除されたコメントが返る', async () => {
        const oldComments = await getComments();
        const res = await requestHelper.request({
            method : 'delete',
            endPoint : `/api/comments/${VALID_ID}`,
            statusCode : 200
        });

        const deleteComment = res.body

        assert.deepEqual(deleteComment, {
            id : VALID_ID,
            username : deleteComment.username,
            body : deleteComment.body,
            updatedAt: deleteComment.updatedAt,
            createdAt : deleteComment.createdAt
        });

        const currentComments = await getComments();

        assert.notDeepEqual(oldComments, currentComments,'id:1は存在しない');
        assert.notDeepEqual(deleteComment, currentComments[0],'削除後のコメントにもともとid:1だったコメントは存在しない');
    });
}); 