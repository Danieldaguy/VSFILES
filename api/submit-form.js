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
                user: process.env.EMAIL_USER, // Your email address (set in Vercel environment variables)
                pass: process.env.EMAIL_PASS, // Your email password or app-specific password (set in Vercel environment variables)
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER, // Sender address
            to: process.env.EMAIL_USER, // Your email address to receive submissions
            subject: `New Form Submission: ${formData.planName}`,
            html: `
                <h1>New Form Submission</h1>
                <p><strong>Plan Name:</strong> ${formData.planName}</p>
                <p><strong>Name:</strong> ${formData.userName}</p>
                <p><strong>Email:</strong> ${formData.userEmail}</p>
                <p><strong>Website Description:</strong> ${formData.userMessage}</p>
                <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
                <p><strong>Contact Method:</strong> ${formData.userContactMethod}</p>
                ${formData.cashTag ? `<p><strong>CashApp Tag:</strong> ${formData.cashTag}</p>` : ''}
                ${formData.phoneNumber ? `<p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>` : ''}
                ${formData.discordUsername ? `<p><strong>Discord Username:</strong> ${formData.discordUsername}</p>` : ''}
                ${formData.redditUsername ? `<p><strong>Reddit Username:</strong> ${formData.redditUsername}</p>` : ''}
                ${formData.additionalNotes ? `<p><strong>Additional Notes:</strong> ${formData.additionalNotes}</p>` : ''}
                <hr>
                <p><strong>Submission Timestamp:</strong> ${new Date().toLocaleString()}</p>
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