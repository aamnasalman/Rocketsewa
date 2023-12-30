const Subscription = require('../models/Subscription');

// Create a new subscription
exports.createSubscription = async (req, res) => {
  try {
    const { userId, plan, startDate, endDate, paymentMethod, transactionId } = req.body;

    const newSubscription = new Subscription({
      userId,
      plan,
      startDate,
      endDate,
      paymentMethod,
      transactionId,
    });

    await newSubscription.save();

    res.status(201).json({ message: 'Subscription created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Renew a subscription
exports.renewSubscription = async (req, res) => {
    try {
      const { subscriptionId } = req.params;
  
      // Find the subscription by ID
      const subscription = await Subscription.findById(subscriptionId);
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      // Implement subscription renewal logic here
      // For example, you can extend the endDate and update the status
      const newEndDate = new Date(); // Calculate the new end date
      subscription.endDate = newEndDate;
      subscription.status = 'active'; // Reset the status to 'active'
  
      await subscription.save();
  
      res.status(200).json({ message: 'Subscription renewed successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Cancel a subscription
exports.cancelSubscription = async (req, res) => {
    try {
      const { subscriptionId } = req.params;
  
      // Find the subscription by ID
      const subscription = await Subscription.findById(subscriptionId);
  
      if (!subscription) {
        return res.status(404).json({ message: 'Subscription not found' });
      }
  
      // Implement subscription cancellation logic here
      // Update the status to 'canceled' or mark it as inactive
      subscription.status = 'canceled';
  
      await subscription.save();
  
      res.status(200).json({ message: 'Subscription canceled successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

