

import { hashPassword, sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError } from "../helpers/helperFunctions.js";
import News from "../model/newsModel.js";


export const addNews = async (req, res) => {
  const { title, content, } = req.body;

  try {
    const newsExists = await News.findOne({ content, title }).lean().exec();
    if (newsExists) {
      return sendBadRequest(res, "news already exists");
    }

    const news = new News({
      title,
      content,

    });

    // Save news to the database
    await news.save();

    // Send a success response
    sendCreated(res, "News created successfully", news);
  } catch (error) {
    console.error("Error creating News:", error);
    res.status(500).json({ message: "Server error" });
  }
};



// Get All News - Retrieves all News from the database
export const getAllNews = async (req, res) => {
  try {
    const news = await News.find({}).sort({ title: -1 });

    if (!news || news.length === 0) {
      return sendNotFound(res, "No news found");
    } else {
      return res.status(200).json(news);
    }
  } catch (error) {
    return sendServerError(res, "Server error");
  }
};

// Get News By ID - Retrieves a specific News by ID
export const getNeswById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (news) {
      res.status(200).send(news);
    } else {
      sendNotFound(res, "No news with the ID is found");
    }
  } catch (error) {
    sendServerError(res, "server error");
  }
};

// Update News - Updates News information by ID
export const updateNews = async (req, res) => {
  const { id } = req.params; // Get the News ID from the request parameters
  const { title, content } = req.body; // Destructure updated fields from the request body

  try {
    // Check if the News exists
    const news = await News.findById(id).exec();
    if (!news) {
      return sendNotFound(res, 'News not found');
    }

    // Update fields only if they are provided
    if (title) news.title = title;

    if (content) news.content = content;

    // Save the updated News to the database
    const updatedNews = await news.save();

    res.status(200).json({
      message: "News updated successfully",
      News: updatedNews,
    });
  } catch (error) {
    console.error(error);
    return sendServerError(res, "Server error");
  }
};

// Delete News - Deletes a News by ID
export const deleteNews = async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    sendNotFound(res, "News not found");
  }
  if (news) {
    await news.deleteOne();
    sendDeleteSuccess(res, "News deleted successfully");
  } else {
    sendServerError(res, "News not deleted");
  }
};