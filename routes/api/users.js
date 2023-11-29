// routes/api/users.js

const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// /api/users
router.route("/").get(getAllUsers).post(createUser);

// Route for DELETE
router.route("/:id").get(getUserById).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

// route for PUT request

router.route("/:userId").get(getUserById).put(updateUser)

module.exports = router;
