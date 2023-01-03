const dotenv = require('dotenv')
const path = require('path');
dotenv.config({path: path.resolve(__dirname, "../../.env")});

const sendGridMail = require("@sendgrid/mail");
// console.log(process.env.SENDGRID_API_KEY)
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

//function to build out the body of the email
const msg = () => {
  const body =
    "This is a notifaction from the Datatective team. We have found an outage in your system, please open up the Datatective desktop application for more information.";
  return {
    to: "jamie.abrams.schiff@gmail.com",
    from: "datadocteam@gmail.com",
    subject: "IMPORTANT: outage detected from datatective",
    text: body,
    html: "<strong>{body}</stSrong>",
  };
};

//send the message using the send method from the SendGrid email package
async function sendEmail() {
  try {
    await sendGridMail.send(msg());
    console.log("Email notification successfully send");
  } catch (error) {
    console.log("There was an error sending an email notification");
    console.log("THIS IS THE ERROR: ", error);
    console.log("this is the API key: ", process.env.SENDGRID_API_KEY);
    if (error.response) {
      console.log(error.response.body);
    }
  }
}

(async () => {
  console.log("Sending email");
  await sendEmail();
})();
