/**
 * SMS Notification Backend
 * Send SMS confirmations to users when they submit the contact form
 * 
 * Requirements:
 * 1. npm install express twilio cors body-parser
 * 2. Create a .env file with:
 *    TWILIO_ACCOUNT_SID=your_account_sid
 *    TWILIO_AUTH_TOKEN=your_auth_token
 *    TWILIO_PHONE_NUMBER=your_twilio_number (e.g., +1234567890)
 * 3. Get free account at: https://www.twilio.com/console
 */

const path = require('path');
require('dotenv').config();
require('dotenv').config({ path: path.join(__dirname, '.env') });
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const fs = require('fs');

const { execSync } = require('child_process');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const distPath = path.join(__dirname, '../dist');

// Auto-build Vite frontend if dist folder doesn't exist
if (!fs.existsSync(distPath) || !fs.existsSync(path.join(distPath, 'index.html'))) {
  console.log('⚡ dist folder not found. Building Vite production assets...');
  try {
    execSync('npx vite build', { cwd: path.join(__dirname, '..'), stdio: 'inherit' });
    console.log('✅ Vite build completed successfully!');
  } catch (err) {
    console.error('❌ Failed to build Vite frontend:', err.message);
  }
}

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
} else {
  console.warn('⚠️ Serving root static files as fallback.');
  app.use(express.static(path.join(__dirname, '../')));
}

// Initialize Twilio client conditionally
let twilioClient = null;
if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_ACCOUNT_SID.startsWith('AC')) {
  twilioClient = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
} else {
  console.warn('⚠️ Twilio is not configured. SMS will not be sent.');
}

// Initialize Nodemailer transporter conditionally
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });
} else {
  console.warn('⚠️ Email credentials (EMAIL_USER or EMAIL_APP_PASSWORD) are not configured. Emails will not be sent.');
}

const TWILIO_PHONE = process.env.TWILIO_PHONE_NUMBER;

/**
 * POST /send-sms
 * Send SMS notification to user's phone
 */
app.post('/send-sms', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validate input
    if (!phone || !name || !email) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, phone'
      });
    }

    // Get the owner's phone number from environment variables
    const ownerPhone = process.env.OWNER_PHONE_NUMBER;
    if (!ownerPhone) {
      throw new Error('OWNER_PHONE_NUMBER is not configured in .env');
    }

    // Create SMS message to notify the owner
    const smsMessage = `New Contact Form Submission!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;

    // Send SMS via Twilio to the owner
    let sid = 'mock-sid-not-configured';
    if (twilioClient) {
      const result = await twilioClient.messages.create({
        body: smsMessage,
        from: TWILIO_PHONE,
        to: ownerPhone
      });
      sid = result.sid;
      console.log(`[SMS SENT] MessageSid: ${sid}, To: Owner (${ownerPhone})`);
    } else {
      console.log(`[MOCK SMS] Would have sent to ${ownerPhone}: ${smsMessage}`);
    }

    // Send Email via Nodemailer to the owner
    let emailSent = false;
    if (transporter && process.env.EMAIL_USER) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER, // Sending to yourself
        subject: `New Contact Form Submission from ${name}`,
        text: smsMessage // We can reuse the same cleanly formatted text
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log(`[EMAIL SENT] MessageId: ${info.messageId}`);
      emailSent = true;
    } else {
      console.log(`[MOCK EMAIL] Would have sent email to ${process.env.EMAIL_USER || 'owner'}: ${smsMessage}`);
    }

    res.json({
      success: true,
      message: 'Notification processed successfully',
      messageSid: sid,
      emailSent: emailSent,
      phone: ownerPhone
    });

  } catch (error) {
    console.error('[SMS ERROR]', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /send-email
 * Send email notification (using nodemailer) and save to messages.json
 */
app.post('/send-email', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!email || !name || !message) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, email, message'
      });
    }

    // Save message to messages.json
    const messageData = { name, email, phone: phone || 'Not provided', message, date: new Date().toISOString() };
    const messagesFilePath = path.join(__dirname, 'messages.json');
    let messages = [];
    if (fs.existsSync(messagesFilePath)) {
      try {
        const fileContent = fs.readFileSync(messagesFilePath, 'utf8');
        messages = JSON.parse(fileContent);
      } catch(e) {
        messages = [];
      }
    }
    messages.push(messageData);
    fs.writeFileSync(messagesFilePath, JSON.stringify(messages, null, 2));

    const targetEmail = 'kashishyadav6768@gmail.com';
    let emailSent = false;
    const emailBody = `New Contact Form Submission!
    
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Message: ${message}
`;

    if (transporter && process.env.EMAIL_USER) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: targetEmail,
        subject: `New Contact Form Submission from ${name}`,
        text: emailBody
      };
      
      try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`[CONTACT EMAIL SENT] MessageId: ${info.messageId}`);
        emailSent = true;
        
        // Send auto-reply to the customer
        const customerReplyBody = `Hi ${name},\n\nThank you for reaching out to Artisan Coffee!\n\nWe have received your message:\n"${message}"\n\nOur team will review it and get back to you within 24 hours.\n\nWarm regards,\nThe Artisan Coffee Team`;
        
        const customerMailOptions = {
          from: process.env.EMAIL_USER,
          to: email, // Sending to the customer
          subject: `We've received your message! - Artisan Coffee`,
          text: customerReplyBody
        };
        
        try {
          await transporter.sendMail(customerMailOptions);
          console.log(`[CUSTOMER CONTACT REPLY SENT] to: ${email}`);
        } catch (err) {
          console.error('[CUSTOMER CONTACT REPLY ERROR]', err.message);
        }
        
      } catch (emailErr) {
        console.error('[EMAIL ERROR] Failed to send email via nodemailer:', emailErr.message);
        // We will NOT throw the error, we just log it and proceed to return success
      }
    } else {
      console.log(`[MOCK CONTACT EMAIL] Would have sent email to ${targetEmail}: \n${emailBody}`);
    }

    res.json({
      success: true,
      message: 'Email notification processed',
      emailSent
    });

  } catch (error) {
    console.error('[SERVER ERROR]', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/order
 * Handle Buy Now order, store in JSON and send email
 */
app.post('/api/order', async (req, res) => {
  try {
    const { name, mobile, email, address, pincode, payment_method, coffee_order, quantity, price, date } = req.body;

    if (!name || !mobile || !email || !address || !pincode || !coffee_order || !quantity) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields'
      });
    }

    // 1. Store the order details
    const orderData = { name, mobile, email, address, pincode, payment_method, coffee_order, quantity, price, date };
    const ordersFilePath = path.join(__dirname, 'orders.json');
    let orders = [];
    if (fs.existsSync(ordersFilePath)) {
      try {
        const fileContent = fs.readFileSync(ordersFilePath, 'utf8');
        orders = JSON.parse(fileContent);
      } catch(e) {
        orders = [];
      }
    }
    orders.push(orderData);
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));

    // 2. Send email to mkashish6768@gmail.com
    let emailSent = false;
    const targetEmail = 'mkashish6768@gmail.com';
    const emailBody = `New Coffee Order!
    
Name: ${name}
Mobile: ${mobile}
Email: ${email}
Address: ${address}
Pincode: ${pincode}
Coffee Order: ${coffee_order}
Quantity: ${quantity}
Price: ${price}
Order Date: ${date}
`;

    if (transporter && process.env.EMAIL_USER) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: targetEmail,
        subject: `New Coffee Order from ${name}`,
        text: emailBody
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log(`[ORDER EMAIL SENT] MessageId: ${info.messageId}`);
      emailSent = true;
      
      // 3. Send confirmation email to the CUSTOMER
      const customerEmailBody = `Hello ${name},\n\nThank you for your purchase from Artisan Coffee!\n\nHere is your detailed order receipt:\n\n--------------------------------\nCoffee Order: ${coffee_order}\nTotal Quantity: ${quantity}\nTotal Price: ${price}\nPayment Method: ${payment_method}\nDelivery Address: ${address}, Pincode: ${pincode}\nOrder Date: ${date}\n--------------------------------\n\nWe are preparing your delicious coffee right now and it will be on its way soon!\n\nWarm regards,\nThe Artisan Coffee Team`;
      
      const customerMailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Sent to the customer's provided email address
        subject: `Your Artisan Coffee Order Confirmation!`,
        text: customerEmailBody
      };
      
      try {
        await transporter.sendMail(customerMailOptions);
        console.log(`[CUSTOMER ORDER EMAIL SENT] to: ${email}`);
      } catch (err) {
        console.error('[CUSTOMER EMAIL ERROR]', err.message);
      }
      
    } else {
      console.log(`[MOCK ORDER EMAIL] Would have sent email to ${targetEmail}: \n${emailBody}`);
    }

    res.json({
      success: true,
      message: 'Order placed successfully',
      emailSent
    });

  } catch (error) {
    console.error('[ORDER ERROR]', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});


/**
 * GET /api/order-status
 * Fetch an order by name and mobile number
 */
app.get('/api/order-status', (req, res) => {
  try {
    const { name, mobile } = req.query;

    if (!name || !mobile) {
      return res.status(400).json({ success: false, error: 'Name and mobile are required' });
    }

    const ordersFilePath = path.join(__dirname, 'orders.json');
    if (!fs.existsSync(ordersFilePath)) {
      return res.status(404).json({ success: false, error: 'No orders found' });
    }

    const fileContent = fs.readFileSync(ordersFilePath, 'utf8');
    const orders = JSON.parse(fileContent);

    // Find the most recent matching order (searching backwards)
    const matchedOrder = [...orders].reverse().find(
      o => o.name.toLowerCase() === name.toLowerCase() && o.mobile === mobile
    );

    if (matchedOrder) {
      res.json({ success: true, order: matchedOrder });
    } else {
      res.status(404).json({ success: false, error: 'Order not found for these details' });
    }
  } catch (error) {
    console.error('[ORDER STATUS ERROR]', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * GET /api/orders
 * Fetch all stored orders
 */
app.get('/api/orders', (req, res) => {
  try {
    const ordersFilePath = path.join(__dirname, 'orders.json');
    if (fs.existsSync(ordersFilePath)) {
      const fileContent = fs.readFileSync(ordersFilePath, 'utf8');
      const orders = JSON.parse(fileContent);
      res.json({ success: true, orders });
    } else {
      res.json({ success: true, orders: [] });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


/**
 * DELETE /api/orders/:index
 * Delete an order by index
 */
app.delete('/api/orders/:index', (req, res) => {
  try {
    const index = parseInt(req.params.index, 10);
    const ordersFilePath = path.join(__dirname, 'orders.json');
    if (fs.existsSync(ordersFilePath)) {
      const fileContent = fs.readFileSync(ordersFilePath, 'utf8');
      let orders = JSON.parse(fileContent);
      if (index >= 0 && index < orders.length) {
        orders.splice(index, 1);
        fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2));
        return res.json({ success: true, message: 'Deleted successfully' });
      }
    }
    res.status(404).json({ success: false, error: 'Order not found' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

/**
 * POST /api/send-otp
 * Send a 6-digit OTP to the provided email address
 */
app.post('/api/send-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: email, otp'
      });
    }

    const emailBody = `Your Artisan Coffee verification code is: ${otp}\n\nPlease enter this code to confirm your order.`;
    let emailSent = false;

    if (transporter && process.env.EMAIL_USER) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, // Sending directly to the user's provided email
        subject: `Your Artisan Coffee OTP: ${otp}`,
        text: emailBody
      };
      
      const info = await transporter.sendMail(mailOptions);
      console.log(`[OTP EMAIL SENT] MessageId: ${info.messageId} to ${email}`);
      emailSent = true;
    } else {
      console.log(`[MOCK OTP EMAIL] Would have sent to ${email}: \n${emailBody}`);
    }

    res.json({
      success: true,
      message: 'OTP processed',
      emailSent
    });

  } catch (error) {
    console.error('[OTP ERROR]', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'SMS backend is running' });
});

// Catch-all route for SPA client-side navigation
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/send-')) {
    return next();
  }
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('Frontend build index.html not found');
  }
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`SMS Backend running on port ${PORT}`);
  console.log(`Twilio Phone: ${TWILIO_PHONE}`);
});
