const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require('../../controllers/thoughtController');

// Define thought routes

// GET to get all thoughts
router.get('/', getAllThoughts);

// GET to get a single thought by its _id
router.get('/:thoughtId', getThoughtById);

// POST to create a new thought
router.post('/', createThought);

// PUT to update a thought by its _id
router.put('/:thoughtId', updateThought);

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', deleteThought);

// POST to create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', createReaction);

// DELETE to pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

module.exports = router;
