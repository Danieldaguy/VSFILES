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
                <h1>New Form Submission Details</h1>
                <p><strong>Plan Name:</strong> ${formData.planName}</p>
                <p><strong>Customer Name:</strong> ${formData.userName}</p>
                <p><strong>Customer Email:</strong> ${formData.userEmail}</p>
                <p><strong>Message:</strong></p>
                <blockquote>${formData.userMessage}</blockquote>
                <hr>
                <h2>Payment Information</h2>
                <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
                ${formData.cashTag ? `<p><strong>CashApp Tag:</strong> ${formData.cashTag}</p>` : ''}
                ${formData.paymentMethod === 'donation' ? `<p><strong>Donation Code:</strong> DON-${Math.random().toString(36).substr(2, 8).toUpperCase()}</p>` : ''}
                <hr>
                <h2>Contact Preferences</h2>
                <p><strong>Preferred Contact Method:</strong> ${formData.userContactMethod}</p>
                ${formData.phoneNumber ? `<p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>` : ''}
                ${formData.discordUsername ? `<p><strong>Discord Username:</strong> ${formData.discordUsername}</p>` : ''}
                ${formData.redditUsername ? `<p><strong>Reddit Username:</strong> ${formData.redditUsername}</p>` : ''}
                <hr>
                <h2>Additional Information</h2>
                <p><strong>Extra Features Selected:</strong> ${formData.extraFeatures.length > 0 ? formData.extraFeatures.join(', ') : 'None'}</p>
                ${formData.additionalNotes ? `<p><strong>Additional Notes:</strong> ${formData.additionalNotes}</p>` : ''}
                <hr>
                <p><strong>Submission Timestamp:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>IP Address:</strong> ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}</p>
                <p><strong>User Agent:</strong> ${req.headers['user-agent']}</p>
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