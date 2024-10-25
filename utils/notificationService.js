const nodemailer = require('nodemailer'); 

// Example function to send email notifications
const sendEmailNotification = async (to, subject, message) => {
    // Configure your email transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail', // or your email provider
        auth: {
            user: 'your-email@example.com', // your email
            pass: 'your-email-password' // your email password
        }
    });

    const mailOptions = {
        from: 'your-email@example.com',
        to,
        subject,
        text: message,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = {
    sendEmailNotification,
};
