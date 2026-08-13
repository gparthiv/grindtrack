const express = require('express');
const router = express.Router();
const { handleAllGet, patchTaskById,
  deleteTaskById, postTask
} = require("../controllers/task");

router.route("/")
  .get(handleAllGet)
  .post(postTask);

router.route("/:id")
  .patch(patchTaskById)
  .delete(deleteTaskById);

module.exports = router;
