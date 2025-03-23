export default async function handler(req, res) {
    if (req.method === 'POST') {
        const formData = req.body;

        // Log the form data for debugging
        console.log('Form Data Received:', formData);

        // Example: Save the data to a database or send it via email
        // For now, just send a success response
        res.status(200).json({ message: 'Form data received successfully!', data: formData });
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}