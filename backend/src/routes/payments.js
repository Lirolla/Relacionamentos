import express from 'express';
const router = express.Router();

router.post('/create-checkout-session', async (req, res) => {
  res.json({ url: 'https://checkout.stripe.com/test' });
});

export default router;
