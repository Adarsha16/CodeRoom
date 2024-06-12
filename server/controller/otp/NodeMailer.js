import nodemailer from "nodemailer";


const sendMailThroughNodemailer = (user_email, otp_code) => {


    const htmlData = `  
        <div
        style="color:white; background-color:black; height:100%; padding:10px;">

        <h1>CODE ROOM</h1>
        <p>Please use this code to complete your registeration.</p>

        <p style="color:black; background-color: white; padding:10px 30px; border:2px solid blue; border-radius:5px;  ">
            ${otp_code}</p>

        <p>Valid for ${process.env.OTP_EXPIRY} min</p>



    </div>`;



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
        html: htmlData
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
