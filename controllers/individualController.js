const Individual = require("../models/individualModel");
const isValidNHSNumber = require("../utils/validnhsnumber");
const formatPostcode = require("../utils/formatpostcode");
const requiredFields = ["nhs_number", "name", "date_of_birth", "postcode"];

exports.checkNHSNumber = (req, res, next) => {
  const nhsNumber = req.params.nhs_number;

  try {
    if (!isValidNHSNumber(nhsNumber)) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid NHS number: ${nhsNumber}`,
      });
    }
    next();
  } catch (error) {
    console.error("Error validating NHS number:", error);
    return res.status(500).json({
      status: "error",
      message: "An error occurred while validating the NHS number",
    });
  }
};

exports.createIndividual = async (req, res) => {
  try {
    const { nhs_number, postcode, ...rest } = req.body;

    // check for missing required fields
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        status: "fail",
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    if (!isValidNHSNumber(nhs_number)) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid NHS number",
      });
    }

    const formattedPostcode = formatPostcode(postcode);
    const newIndividual = await Individual.create({
      nhs_number,
      postcode: formattedPostcode,
      ...rest,
    });
    res.status(201).json(newIndividual);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.getIndividual = async (req, res) => {
  try {
    const { nhs_number } = req.params;

    const individual = await Individual.findOne({ nhs_number });

    if (!individual) {
      return res.status(404).json({
        status: "fail",
        message: "Individual not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: individual,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.getAllIndividuals = async (req, res) => {
  try {
    const individuals = await Individual.find();
    res.status(200).json({
      status: "success",
      count: individuals.length,
      data: individuals,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.updateIndividual = async (req, res) => {
  try {
    const { nhs_number } = req.params;
    const updatedIndividual = req.body;

    const individual = await Individual.findOneAndUpdate(
      { nhs_number },
      updatedIndividual,
      { new: true }
    );

    if (!individual) {
      return res.status(404).json({
        status: "fail",
        message: "Individual not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: individual,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};

exports.deleteIndividual = async (req, res) => {
  try {
    const { nhs_number } = req.params;
    const deletedIndividual = await Individual.findOneAndDelete({ nhs_number });

    if (!deletedIndividual) {
      return res.status(404).json({
        status: "fail",
        message: "Individual not found",
      });
    }

    res.status(204).send(); // No content response
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: "fail",
      message: "Server Error",
    });
  }
};
