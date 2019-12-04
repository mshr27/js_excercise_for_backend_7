const assert = require('power-assert');
const requestHelper = require('../../helper/requestHelper');

describe('test [Get /api/comments]', () => {
    it('returns comments in res.body', async () => {
        const res = await requestHelper.request({
            method: 'get',
            endPoint : '/api/comments',
            statusCode : 200
        });

        const comments = res.body;
        assert.equal(Array.isArray(comments), true);
        comments.forEach((comment) => {
            assert.equal(typeof comment.id === 'number', true);
            assert.equal(typeof comment.username === 'string', true);
            assert.equal(typeof comment.body === 'string', true);
            assert.equal(typeof comment.updatedAt === 'string', true);
            assert.equal(typeof comment.createdAt === 'string', true);
        });

    });
});