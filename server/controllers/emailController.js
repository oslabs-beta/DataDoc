const db = require("../models/postgres-client");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

const sendGridMail = require("@sendgrid/mail");
// console.log(process.env.SENDGRID_API_KEY)
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
const emailController = {};

emailController.sendInitialAlert = (req, res, next) => {
  const {
    emailone,
    emailtwo,
    emailthree,
    trackingthree,
    trackingfour,
    trackingfive,
  } = req.body;
  const signupMsg = () => {
    const body =
      "This is a notifaction from the DataDoc team. You are receiving this because you have successfull added alert notifications to your profile. Please contact us with any questions.";
    return {
      to: [emailone, emailtwo, emailthree], // ! query from database
      from: "datadocteam@gmail.com",
      subject: "Welcome to DataDoc",
      text: body,
      html: "<strong>{body}</stSrong>",
    };
  };
  console.log("in the process of sending a signup confirmation email");
  // sendGridMail
  //   .sendMultiple(signupMsg)
  //   .then(() => {
  //     console.log("Email notification successfully send");
  //     return next();
  //   })
  //   .catch((err) => {
  //     console.log(
  //       `There was an error sending an email notification, error: ${error}`
  //     );
  //     console.log("this is the API key: ", process.env.SENDGRID_API_KEY);
  //     if (error.response) {
  //       console.log(error.response.body);
  //     }
  //   });
};

emailController.updatedsettingsAlert = (req, res, next) => {
  const {
    emailone,
    emailtwo,
    emailthree,
    trackingthree,
    trackingfour,
    status500,
  } = req.body;
  const updateMsg = () => {
    const body =
      "This is a notifaction from the DataDoc team. You are receiving this because there have been updates to the notification settings. Please contact the DataDoc team with any questions.";
    return {
      to: [emailone, emailtwo, emailthree], // ! query from database
      from: "datadocteam@gmail.com",
      subject: "Notification: Settings Update from DataDoc",
      text: body,
      html: "<strong>{body}</stSrong>",
    };
  };
  console.log("in the process of sending a settings update notification email");
  // sendGridMail
  //   .sendMultiple(updateMsg)
  //   .then(() => {
  //     console.log("Email notification successfully send");
  //     return next();
  //   })
  //   .catch((err) => {
  //     console.log(
  //       `There was an error sending an email notification, error: ${error}`
  //     );
  //     console.log("this is the API key: ", process.env.SENDGRID_API_KEY);
  //     if (error.response) {
  //       console.log(error.response.body);
  //     }
  //   });
};

emailController.errorEmail = (req, res, next) => {
  const {
    emailone,
    emailtwo,
    emailthree,
    trackingthree,
    trackingfour,
    trackingfive,
  } = res.locals.settingsData;
  const url = res.locals.url;
  const status_code = res.locals.status_code;
  const errorMsg = () => {
    const body = `This is a notifaction from the DataDoc team. There was an error in your application. The error occured at ${url} and the status code for this endpoint is ${status_code}. There is additional information on your DataDoc application. Please contact the DataDoc team with any questions.`;
    return {
      to: [emailone, emailtwo, emailthree], // ! query from database
      from: "datadocteam@gmail.com",
      subject: "IMPORTANT: Error Detected by the DataDoc Team",
      text: body,
      html: "<strong>{body}</stSrong>",
    };
  };
  if (status_code >= 300 && status_code < 400 && trackingthree) {
    console.log(
      "in the process of sending a error outage notification for a status code between 300 and 400"
    );
    // sendGridMail
    //   .sendMultiple(errorMsg)
    //   .then(() => {
    //     console.log("Email notification successfully sent");
    //     return;
    //   })
    //   .catch((err) => {
    //     console.log(
    //       `There was an error sending an email notification, error: ${error}`
    //     );
    //     console.log("this is the API key: ", process.env.SENDGRID_API_KEY);
    //     if (error.response) {
    //       console.log(error.response.body);
    //     }
    //   });
  } else if (status_code >= 400 && status_code < 500 && trackingfour) {
    console.log(
      "in the process of sending a error outage notification for a status code between 400 and 500"
    );
    // sendGridMail
    //   .sendMultiple(errorMsg)
    //   .then(() => {
    //     console.log("Email notification successfully sent");
    //     return;
    //   })
    //   .catch((err) => {
    //     console.log(
    //       `There was an error sending an email notification, error: ${error}`
    //     );
    //     console.log("this is the API key: ", process.env.SENDGRID_API_KEY);
    //     if (error.response) {
    //       console.log(error.response.body);
    //     }
    //   });
  } else if (status_code >= 500 && trackingfive) {
    console.log(
      "in the process of sending a error outage notification for a status code at 500 or above"
    );
    // sendGridMail
    //   .sendMultiple(errorMsg)
    //   .then(() => {
    //     console.log("Email notification successfully sent");
    //     return;
    //   })
    //   .catch((err) => {
    //     console.log(
    //       `There was an error sending an email notification, error: ${error}`
    //     );
    //     console.log("this is the API key: ", process.env.SENDGRID_API_KEY);
    //     if (error.response) {
    //       console.log(error.response.body);
    //     }
    //   });
  }
};

module.exports = emailController;
