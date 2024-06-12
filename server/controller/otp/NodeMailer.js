import nodemailer from "nodemailer";


const sendMailThroughNodemailer = (user_email, otp_code) => {



    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: `${process.env.OTP_EMAIL_SENDER}`,
            pass: `${process.env.OTP_APP_PASSWORD}`
        }
    });

    let mailOptions = {
        from: `${process.env.OTP_EMAIL_SENDER}`,
        bcc: `${user_email}`,
        subject: `OPT-VERFICATION : CODE ROOM`,
        html: `  
        <div style="color:#FFFFFF; background-color:#000000; display:flex; flex-wrap: wrap; flex-direction: column;  justify-content: center; align-items: center; text-align:center; padding:20px; font-weight:bold; font-size:15px; border-radius:5px; box-shadow:0px 0px 10px rgba(0,0,0,0.1); font-family: Arial, sans-serif;">
        <h1 style="font-size:18px">Find Yourself a OTP Code Within This email </h1>
        <br>
        
        <div style="color:#000000; background-color:#FFFFFF; padding:10px">
        ${otp_code}
        </div>

        <br>
        <p style="font-size:14px"> Token will Be Invalid after ${process.env.OTP_EXPIRY} min</p>
        </div >`
    };





    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            return false;
        } else {
            console.log('Email sent: ' + info.response);
            return true;
        }
    });

}


export { sendMailThroughNodemailer }
