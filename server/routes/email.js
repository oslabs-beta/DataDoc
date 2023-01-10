const express = require("express");
const compression = require("compression");
const settingsController = require("../controllers/settingsController");
const emailContoller = require("../controllers/emailController");

const router = express.Router();
router.use(compression());

// add notification settings
router.post(
  "/",
  settingsController.addSettings,
  emailContoller.sendInitialAlert,
  (req, res) => {
    return res
      .status(200)
      .json("successfully added new user settings to the database");
  }
);

//update notification settings
router.post(
  "/update",
  settingsController.updateSettings,
  emailContoller.updatedsettingsAlert,
  (req, res) => {
    return res
      .status(200)
      .json("successfully updated user settings in the database");
  }
);

//get notification settings to send an email update
// router.get(
//   "/",
//   settingsController.getSettings,
//   emailContoller.errorNotification,
//   (req, res) => {
//     return res.status(200).json(res.locals.settingsData);
//   }
// );

module.exports = router;
