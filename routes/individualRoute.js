const express = require("express");
const individualController = require("../controllers/individualController");
const router = express.Router();

router.param("nhs_number", individualController.checkNHSNumber);

router
  .route("/:nhs_number")
  .get(individualController.getIndividual)
  .patch(individualController.updateIndividual)
  .delete(individualController.deleteIndividual);

router
  .route("/")
  .post(individualController.createIndividual)
  .get(individualController.getAllIndividuals);

module.exports = router;
