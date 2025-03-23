import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const formData = req.body;

        // Log the form data for debugging
        console.log('Form Data Received:', formData);

        // Create a Nodemailer transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail', // Use your email provider (e.g., Gmail, Outlook, etc.)
            auth: {
                user: 'danielgyebi17@gmail.com', // Replace with your email
                pass: 'nanakw1234', // Replace with your email password or app-specific password
            },
        });

        // Email content
        const mailOptions = {
            from: 'dnaiel.gyebi640@gmail.com', // Sender address
            to: 'danielgyebi17@gmail.com', // Your email address to receive submissions
            subject: `New Form Submission: ${formData.planName}`,
            text: `
                You have received a new form submission:
                
                Plan Name: ${formData.planName}
                Name: ${formData.userName}
                Email: ${formData.userEmail}
                Message: ${formData.userMessage}
                Payment Method: ${formData.paymentMethod}
                Contact Method: ${formData.userContactMethod}
            `,
        };

        try {
            // Send the email
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully!');

            // Respond with success
            res.status(200).json({ message: 'Form submitted and email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Error sending email.', error });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}