import nodeMailer from 'nodemailer';

const sendEmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        service: "Gmail",
        host: process.env.SMPT_HOST,
        port : 465,
        secure: true, 
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_APP_PASS,
        },
    });
    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.to,
        subject: options.subject,
        html: options.message,
    };
    // verify connection configuration
    transporter.verify(function (error, success) {
        if (error) {
        console.log(error);
        } else {
        console.log("Server is ready to take our messages");
        }
    });
  
    await transporter.sendMail(mailOptions);
};

export default sendEmail;