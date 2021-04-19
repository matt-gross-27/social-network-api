const router = require('express').Router();
const {
  createThought,
  getAllThoughts,
  getThoughtById,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controllers');

router
  .route('/')
  .post(createThought)
  .get(getAllThoughts);

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router
  .route('/:thoughtId/reactions')
  .post(addReaction)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction)

module.exports = router