import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const formData = req.body;

        // Log the form data for debugging
        console.log('Form Data Received:', formData);

        // Base package prices
        const packagePrices = {
            "Starter Package": 75,
            "Premium Package": 150,
            "Business Package": 500,
            "Already Have a Site? Need Edits?": 30,
        };

        // Extract the base price of the selected package
        const basePrice = packagePrices[formData.planName] || 0;

        // Calculate the total price by adding the base price and the prices of selected extra features
        const extraFeaturePrices = {
            "1 Free Extra Revision": 25,
            "Express Delivery": 100,
            "Additional Page": 40,
            "Advanced Animation": 75,
            "Logo Design": 80,
            "Favicon Design": 60,
            "Better SEO": 20,
            "Blog/Newsletter": 40,
            "Sign Up Page": 50,
        };

        const extraFeaturesTotal = formData.extraFeatures.reduce((total, feature) => {
            const featureName = feature.split(" (")[0]; // Extract the feature name
            return total + (extraFeaturePrices[featureName] || 0);
        }, 0);

        const totalPrice = basePrice + extraFeaturesTotal;

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
                <h2>Customer Information</h2>
                <p><strong>Customer Name:</strong> ${formData.userName}</p>
                <p><strong>Customer Email:</strong> ${formData.userEmail}</p>
                <p><strong>Preferred Contact Method:</strong> ${formData.userContactMethod}</p>
                ${formData.phoneNumber ? `<p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>` : ''}
                ${formData.discordUsername ? `<p><strong>Discord Username:</strong> ${formData.discordUsername}</p>` : ''}
                ${formData.redditUsername ? `<p><strong>Reddit Username:</strong> ${formData.redditUsername}</p>` : ''}
                <hr>
                <h2>Plan Details</h2>
                <p><strong>Selected Plan:</strong> ${formData.planName}</p>
                <p><strong>Base Package Price:</strong> $${basePrice}</p>
                <p><strong>Extra Features Selected:</strong> ${formData.extraFeatures.length > 0 ? formData.extraFeatures.join(', ') : 'None'}</p>
                <p><strong>Extra Features Total:</strong> $${extraFeaturesTotal}</p>
                <p><strong>Total Price:</strong> $${totalPrice}</p>
                <hr>
                <h2>Payment Information</h2>
                <p><strong>Payment Method:</strong> ${formData.paymentMethod}</p>
                ${formData.cashTag ? `<p><strong>CashApp Tag:</strong> ${formData.cashTag}</p>` : ''}
                ${formData.paymentMethod === 'donation' ? `<p><strong>Donation Code:</strong> DON-${Math.random().toString(36).substr(2, 8).toUpperCase()}</p>` : ''}
                <hr>
                <h2>Message from Customer</h2>
                <blockquote>${formData.userMessage}</blockquote>
                ${formData.additionalNotes ? `<p><strong>Additional Notes:</strong> ${formData.additionalNotes}</p>` : ''}
                <hr>
                <h2>Submission Metadata</h2>
                <p><strong>Submission Timestamp:</strong> ${new Date().toLocaleString()}</p>
                <p><strong>IP Address:</strong> ${req.headers['x-forwarded-for'] || req.connection.remoteAddress}</p>
                <p><strong>User Agent:</strong> ${req.headers['user-agent']}</p>
                <p><strong>Referrer:</strong> ${req.headers['referer'] || 'N/A'}</p>
                <p><strong>Host:</strong> ${req.headers['host']}</p>
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