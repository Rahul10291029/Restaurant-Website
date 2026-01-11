const Contact = require('../Model/Contact');
const { sendContactEmail } = require('../utils/sendOtpMail');

// Submit contact form
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Save to database
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    // Send email notification
    await sendContactEmail({ name, email, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: {
        id: newContact._id,
        name,
        email
      }
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to send your message',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};

// Get all contacts (for admin dashboard)
exports.getAllContacts = async (req, res) => {
  try {
    // Add pagination if needed (example: ?page=1&limit=10)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Get contacts with sorting (newest first)
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination info
    const total = await Contact.countDocuments();

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalContacts: total
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contacts',
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
  }
};