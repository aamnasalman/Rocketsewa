const Analytics = require('../models/Analytics');

// Record user analytics data
exports.recordAnalytics = async (req, res) => {
  try {
    const { userId, date, pageViews, userActivity } = req.body;

    const newAnalyticsData = new Analytics({
      userId,
      date,
      pageViews,
      userActivity,
    });

    await newAnalyticsData.save();

    res.status(201).json({ message: 'Analytics data recorded successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve analytics data by user and date
exports.getAnalyticsByUserAndDate = async (req, res) => {
    try {
      const { userId, date } = req.params;
  
      // Find the analytics data by user ID and date
      const analyticsData = await Analytics.findOne({ userId, date });
  
      if (!analyticsData) {
        return res.status(404).json({ message: 'Analytics data not found' });
      }
  
      res.status(200).json(analyticsData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
