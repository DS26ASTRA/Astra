const Razorpay = require('razorpay');
const crypto = require('crypto');
const Payment = require('../models/Payment');
const Team = require('../models/Team');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_test_xxxx',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'xxxx'
});

exports.createOrder = async (req, res) => {
  const { teamId } = req.body;
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    let amount = 0;
    if (team.participationType === 'AVINYOTSAV') amount = 150;
    else if (team.participationType === 'HACKATHON') amount = 500;
    else if (team.participationType === 'BOTH') amount = 650;

    const options = {
      amount: amount * 100, // amount in smallest currency unit
      currency: "INR",
      receipt: `receipt_${team.teamId}`
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      data: {
        orderId: order.id,
        amount: options.amount,
        currency: options.currency
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, teamId } = req.body;
  
  try {
    const team = await Team.findById(teamId);
    if (!team) return res.status(404).json({ success: false, message: 'Team not found' });

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'xxxx')
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Save payment
      let amount = 0;
      if (team.participationType === 'AVINYOTSAV') amount = 150;
      else if (team.participationType === 'HACKATHON') amount = 500;
      else if (team.participationType === 'BOTH') amount = 650;

      await Payment.create({
        teamId: team._id,
        eventId: team.eventId,
        participationType: team.participationType,
        amount,
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
        status: 'SUCCESS'
      });

      // Update team status
      team.paymentStatus = 'PAID';
      team.registrationStatus = 'PAYMENT_COMPLETED';
      await team.save();

      res.json({ success: true, message: 'Payment successful' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
