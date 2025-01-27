

import { sendBadRequest, sendCreated, sendDeleteSuccess, sendNotFound, sendServerError } from "../helpers/helperFunctions.js";
import Match from "../model/matchModel.js";


export const addMatch = async (req, res) => {
    const { opponent, matchDate, location, status } = req.body;

    try {
        const matchExists = await Match.findOne({ matchDate, opponent }).lean().exec();
        if (matchExists) {
            return sendBadRequest(res, "match already exists");
        }

        const match = new Match({
            opponent,
            matchDate,
            location,
            status

        });

        // Save match to the database
        await match.save();

        // Send a success response
        sendCreated(res, "match created successfully", match);
    } catch (error) {
        console.error("Error creating match:", error);
        res.status(500).json({ message: "Server error" });
    }
};



// Get All match - Retrieves all match from the database
export const getAllmatch = async (req, res) => {
    try {
        const match = await Match.find({}).sort({ opponent: -1 });

        if (!match || match.length === 0) {
            return sendNotFound(res, "No match found");
        } else {
            return res.status(200).json(match);
        }
    } catch (error) {
        return sendServerError(res, "Server error");
    }
};

// Get match By ID - Retrieves a specific match by ID
export const getMatchById = async (req, res) => {
    try {
        const match = await Match.findById(req.params.id);
        if (match) {
            res.status(200).send(match);
        } else {
            sendNotFound(res, "No match with the ID is found");
        }
    } catch (error) {
        sendServerError(res, "server error");
    }
};

// Update match - Updates match information by ID
export const updateMatch = async (req, res) => {
    const { id } = req.params; // Get the match ID from the request parameters
    const { opponent, matchDate, location,status } = req.body; // Destructure updated fields from the request body

    try {
        // Check if the match exists
        const match = await Match.findById(id).exec();
        if (!match) {
            return sendNotFound(res, 'match not found');
        }

        // Update fields only if they are provided
        if (opponent) match.opponent = opponent;

        if (matchDate) match.matchDate = matchDate;
        if (location) match.location = location;
        if (status) match.status = status;


        // Save the updated match to the database
        const updatedmatch = await match.save();

        res.status(200).json({
            message: "match updated successfully",
            match: updatedmatch,
        });
    } catch (error) {
        console.error(error);
        return sendServerError(res, "Server error");
    }
};

// Delete match - Deletes a match by ID
export const deleteMatch = async (req, res) => {
    const match = await Match.findById(req.params.id);
    if (!match) {
        sendNotFound(res, "match not found");
    }
    if (match) {
        await match.deleteOne();
        sendDeleteSuccess(res, "match deleted successfully");
    } else {
        sendServerError(res, "match not deleted");
    }
};