// routes/apiRoutes.js
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../controllers/userController');

const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../controllers/thoughtController');

// Define routes for users
router.route('/users').get(getAllUsers).post(createUser);
router.route('/users/:userId').get(getUserById).put(updateUser).delete(deleteUser);

router.route('/users/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

// Define routes for thoughts
router.route('/thoughts').get(getAllThoughts).post(createThought);
router.route('/thoughts/:thoughtId').get(getThoughtById).put(updateThought).delete(deleteThought);

router.route('/thoughts/:thoughtId/reactions').post(addReaction).delete(removeReaction);

module.exports = router;
