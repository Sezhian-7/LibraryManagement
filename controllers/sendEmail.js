const nodemailer = require('nodemailer')

const sendEmail = (userMail, Token) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sezhian@mindwaveventures.com',
            pass: 'ficm iglz ltmh nmvs',
        },
    });

    // Define email options
    const mailOptions = {
        from: 'sezhian@mindwaveventures.com',
        to: userMail,
        subject: 'Verification',
        text: `Click the following link to verify your email: http://localhost:3000/user/verify?token=${Token}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Email sent: ' + info.response);
    });
}

module.exports = sendEmail;
