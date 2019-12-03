const comment = require('../models/Coment');

module.exports = {
    getComments : (req, res) => {
        const storedComments = comment.findAll();
        res.status(200).json(storedComments);
    },

    postComment : (req, res) => {
        try {
            const {username, body} = req.body;
            const createComment = comment.create({username, body});

            res.status(200).json(createComment);
        } catch(error) {
            res.status(400).json({message : error.message});
        }
    },

    putComment : (req, res) => {
        
        const id = req.params.id;
        const parsedId = parseInt(id, 10);
        const {username, body} = req.body;
        
        try {
            const updateComment = comment.update({
                id: parsedId,
                username,
                body
            });

            res.status(200).json(updateComment);
        } catch(error){
            res.status(400).json({message : error.message});
        }
    },

    deleteComment : (req, res) => {
        const id = req.params.id;
        const parsedId = parseInt(id, 10);
            
        try {
            const deleteComment = comment.delete(parsedId);
            res.status(200).json(deleteComment);
        } catch(error){
            res.status(400).json({message : error.message});
        }
    }
};