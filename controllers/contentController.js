const Content = require('../models/Content');

// Create new content
exports.createContent = async (req, res) => {
  try {
    const { title, body, author, categories, tags } = req.body;

    const newContent = new Content({
      title,
      body,
      author,
      categories,
      tags,
    });

    await newContent.save();

    res.status(201).json({ message: 'Content created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve content by ID
exports.getContentById = async (req, res) => {
    try {
      const { contentId } = req.params;
  
      // Find the content by ID
      const content = await Content.findById(contentId);
  
      if (!content) {
        return res.status(404).json({ message: 'Content not found' });
      }
  
      res.status(200).json(content);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
// Update content by ID
exports.updateContentById = async (req, res) => {
    try {
      const { contentId } = req.params;
      const updateData = req.body;
  
      // Find the content by ID and update its fields
      const updatedContent = await Content.findByIdAndUpdate(contentId, updateData, { new: true });
  
      if (!updatedContent) {
        return res.status(404).json({ message: 'Content not found' });
      }
  
      res.status(200).json(updatedContent);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Delete content by ID
exports.deleteContentById = async (req, res) => {
    try {
      const { contentId } = req.params;
  
      // Find the content by ID and remove it from the database
      const deletedContent = await Content.findByIdAndRemove(contentId);
  
      if (!deletedContent) {
        return res.status(404).json({ message: 'Content not found' });
      }
  
      res.status(200).json({ message: 'Content deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
