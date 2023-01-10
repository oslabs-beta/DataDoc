const db = require("../models/postgres-client");
const settingsController = {};

settingsController.checkForError = (req, res, next) => {};

//add new user settings
settingsController.addSettings = async (req, res, next) => {
  console.log("IN SETTINGSCONTROLLER.ADDSETTINGS");
  const { workspace_id } = req.params;
  const {
    emailone,
    emailtwo,
    emailthree,
    trackingthree,
    trackingfour,
    trackingfive,
  } = req.body;
  const query = `INSERT INTO usersettings (emailone, emailtwo, emailthree, trackingthree, trackingfour, trackingfive, workspace_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
  const notificationData = [
    emailone,
    emailtwo,
    emailthree,
    trackingthree,
    trackingfour,
    trackingfive,
    workspace_id,
  ];
  await db
    .query(query, notificationData)
    .then(() => {
      res.locals.emails = [emailone, emailtwo, emailthree];
      res.locals.codes = [trackingthree, trackingfour, trackingfive];
      return next();
    })
    .catch((err) => {
      return next(err);
    });
};

settingsController.updateSettings = async (req, res, next) => {
  console.log("IN SETTINGSCONTROLLER.UPDATESETTINGS");
  const { workspace_id } = req.params;
  const {
    emailOne,
    emailTwo,
    emailThree,
    trackingthree,
    trackingfour,
    trackingfive,
  } = req.body;
  const query = `UPDATE usersettings SET emailone = $1 emailtwo = $2 emailthree = $3 status300 = $4 status400 = $5 status500 = $6 WHERE workspace_id = ${workspace_id} RETURNING *`;
  const updateData = [
    emailone,
    emailtwo,
    emailthree,
    trackingthree,
    trackingfour,
    trackingfive,
    workspace_id,
  ];
  await db
    .query(query, updateData)
    .then(() => {
      return next();
    })
    .catch((err) => {
      console.log(
        `there was an error updating user settings data, error: ${err}`
      );
      return next(err);
    });
};

//get user settings
settingsController.getSettings = async (req, res, next) => {
  console.log("IN SETTINGSCONTROLLER.GETSETTINGS");
  // const { workspace_id } = req.params;
  const workspace_id = res.locals.workspace;
  const query = `SELECT * FROM users WHERE workspace_id = ${workspace_id}`;
  await db
    .query(query)
    .then((data) => {
      data.json();
    })
    .then((response) => {
      res.locals.settingsData = {
        emailone: response.emailone,
        emailtwo: response.emailtwo,
        emailthree: response.emailthree,
        trackingthree: response.trackingthree,
        trackingfour: response.trackingfour,
        trackingfive: response.trackingfive,
      };
      emailController.errorEmail();
      return next();
    })
    .catch((err) => {
      console.log(`there was an error getting user settings, error: ${err}`);
      return next(err);
    });
};

module.exports = settingsController;
