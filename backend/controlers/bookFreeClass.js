import axios from 'axios';

export const sendWhatsappMessage = async (req, res) => {
  try {
    const { program, name, phone } = req.body;


    // Validate required fields
    if (!program || !name || !phone) {
      return res.status(400).json({ message: "Program, name, and phone number are required." });
    }

    // WhatsApp API Configuration
    const whatsappApiUrl = process.env.WHATSAPPAPIURL; // Replace with your actual API URL
    const accessToken = process.env.ACCESSTOKEN; // Replace with your actual access token

    // Payload for the WhatsApp API
    const payload = {
      messaging_product: "whatsapp",
      to: `91${phone}`, // Replace 91 with your country code if necessary
      type: "text",
      text: { 
        body: `Hello ${name},\nThank you for your interest in the ${program} program! We will get in touch with you shortly.` 
      }, // Customize the message format as needed
    };

    // Log payload for debugging
    console.log('Payload being sent to WhatsApp API:', payload);

    // Make the API request
    const response = await axios.post(whatsappApiUrl, payload, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    console.log('WhatsApp API Response:', response.data);
    // Send success response
    res.status(200).json({
      message: "WhatsApp message sent successfully.",
      response: response.data,
    });
  } catch (error) {
    console.error("Error sending WhatsApp message:", error.message);
    res.status(500).json({ error: "Failed to send WhatsApp message" });
  }
};
