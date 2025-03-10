const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'frolicprice1@outlook.com',
        pass: 'kldfssaginbvyong' // Replace with your actual password or app password
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log('❌ SMTP Connection Failed:', error);
    } else {
        console.log('✅ SMTP Connection Successful. Ready to send emails!');
    }
});
