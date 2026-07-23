# SMS Backend Setup Guide

To enable real SMS notifications on your contact form, follow these steps:

## Step 1: Get a Free Twilio Account

1. Go to https://www.twilio.com/console
2. Sign up for a free account
3. Get your:
   - **Account SID**
   - **Auth Token**
   - **Trial Phone Number** (Twilio assigns one - e.g., +918291818710)

## Step 2: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your Twilio credentials:
   ```
   TWILIO_ACCOUNT_SID=your_actual_account_sid
   TWILIO_AUTH_TOKEN=your_actual_auth_token
   TWILIO_PHONE_NUMBER=+918291818710
   PORT=3001
   ```

## Step 3: Install Dependencies

```bash
cd backend
npm install
```

## Step 4: Start the Backend Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on: `http://localhost:3001`

## Step 5: Update Frontend Configuration

In `contact.html`, update the API endpoint in the `sendSMSNotification` function:

Change:
```javascript
// fetch('YOUR_BACKEND_URL/send-sms', {
```

To:
```javascript
fetch('http://localhost:3001/send-sms', {
```

## Step 6: Test the Contact Form

1. Go to http://localhost:3001/health (should show "SMS backend is running")
2. Open the contact page
3. Fill in:
   - **Full Name**: Your name
   - **Email**: Your email
   - **Phone**: Your Indian phone number (10 digits)
   - **Message**: Your message
4. Click "Send Message"
5. Check your phone for the SMS!

## Twilio Free Trial Notes

- **$15 free credits** for new accounts
- **SMS costs ~$0.0075** per message
- Can send SMS to **verified numbers only** during trial
- To send to any number, upgrade to paid account

## Verified Phone Numbers (During Trial)

1. Go to Twilio Console: https://www.twilio.com/console
2. Click "Verified Caller IDs"
3. Add your phone number for testing
4. Confirm via SMS

## Production Deployment

When ready for production:

1. **Upgrade Twilio** to paid account (no phone verification needed)
2. **Deploy backend** to:
   - Heroku
   - Railway.app
   - Render
   - AWS Lambda
   - Google Cloud Functions
3. **Update frontend** with production API URL:
   ```javascript
   fetch('https://your-production-api.com/send-sms', {
   ```

## Troubleshooting

**SMS not received?**
- Check Twilio Account SID and Auth Token are correct
- Verify phone number format: +91XXXXXXXXXX (India) or +1XXXXXXXXXX (US)
- Check Twilio console for error messages
- Ensure phone number is verified during trial

**Port already in use?**
```bash
PORT=3002 npm start
```

**Need help?**
- Twilio Docs: https://www.twilio.com/docs
- Email: hello@artisan.coffee
