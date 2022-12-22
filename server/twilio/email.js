const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

//function to build out the body of the email
const getMessage = () => {
  const body =
    "This is a notifaction from the Datatective team. We have found an outage in your system, please open up the Datatective desktop application for more information.";
  return {
    to: "jamie.abrams.schiff@gmail.com", // Change to your recipient
    from: "jamie.abrams.schiff@gmail.com", // Change to your verified sender
    subject: "IMPORTANT: outage detected from datatective",
    text: body,
    html: "<strong>{body}</stSrong>",
  };
};

//send the message using the send method from the SendGrid email package
async function sendEmail() {
  try {
    await sendGridMail.send(getMessage());
    console.log("Email notification successfully send");
  } catch (error) {
    console.log("There was an error sending an email notification");
    console.log("THIS IS THE ERROR: ", error);
    console.log("this is teh API key: ", process.env.SENDGRID_API_KEY);
    if (error.response) {
      console.log(error.response.body);
    }
  }
}

(async () => {
  console.log("Sending email");
  await sendEmail();
})();
