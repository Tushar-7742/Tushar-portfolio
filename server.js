const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // For handling cross-origin requests (if needed)

const app = express();
const port = 3000; // Choose a port for your server

app.use(cors()); // Enable CORS if your frontend and backend are on different origins
app.use(bodyParser.json());

// Replace with your email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // e.g., 'Gmail', 'Outlook'
    auth: {
        user: 'parihartushar4@gmail.com',
        pass: 'mizk nuyq frzn mwtr', // Replace with your actual Gmail password or an App Password
    },
});

app.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;

    const mailOptions = {
        from: 'parihartushar4@gmail.com',
        to: 'parihartushar4@gmail.com', // Your email address (same as sender for this example)
        subject: `Contact Form Submission: ${subject}`,
        html: `
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
        `,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.messageId);
        res.json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Failed to send email.' });
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});