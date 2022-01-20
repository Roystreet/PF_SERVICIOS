const router = require('express').Router();
const { getPosts, getPostUsers, updatePosts, deletePosts } = require('../Controllers/PostControllers');

// Posts
router.get('/post', getPosts);
router.put('/post', updatePosts);
router.get('/post/:user', getPostUsers);
router.delete('/post/:user', deletePosts);
//Users
router.post('/users');
router.post('/user/restore');
router.get('/users');

module.exports = router;
