const express = require('express');
const userSchema = require('../model/userModel'); // Assuming userModel exports the schema

const router = express.Router();

// POST API to add a new user
router.post('/create', async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Basic validation
        if (!name || !email || !age) {
            return res.status(400).json({ message: "Name, email, and age are required" });
        }

        // Create a new user
        const newUser = new userSchema({
            name,
            email,
            age
        });

        // Save the new user to the database
        await newUser.save();

        // Send success response
        res.status(201).json({
            message: "User created successfully",
            user: newUser
        });
    } catch (err) {
        console.error("Error creating user", err);
        res.status(500).json({ message: "An error occurred while creating the user" });
    }
});

// GET API to fetch all users
router.get('/users', async (req, res) => {
    try {
        const users = await userSchema.find();  // Fetch all users from the database

        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }

        res.status(200).json({
            message: "Users retrieved successfully",
            users
        });
    } catch (err) {
        console.error("Error retrieving users", err);
        res.status(500).json({ message: "An error occurred while retrieving users" });
    }
});

// GET API to fetch a user by ID
router.get('/user/:id', async (req, res) => {
    try {
        const user = await userSchema.findById(req.params.id); // Fetch user by ID

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User retrieved successfully",
            user
        });
    } catch (err) {
        console.error("Error retrieving user", err);
        res.status(500).json({ message: "An error occurred while retrieving the user" });
    }
});

// PUT API to update a user's data by ID
router.put('/user/:id', async (req, res) => {
    try {
        const { name, email, age } = req.body;

        // Basic validation
        if (!name || !email || !age) {
            return res.status(400).json({ message: "Name, email, and age are required" });
        }

        const updatedUser = await userSchema.findByIdAndUpdate(
            req.params.id,
            { name, email, age },
            { new: true }  // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (err) {
        console.error("Error updating user", err);
        res.status(500).json({ message: "An error occurred while updating the user" });
    }
});

// DELETE API to delete a user by ID
router.delete('/user/:id', async (req, res) => {
    try {
        const deletedUser = await userSchema.findByIdAndDelete(req.params.id); // Delete user by ID

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User deleted successfully",
            user: deletedUser
        });
    } catch (err) {
        console.error("Error deleting user", err);
        res.status(500).json({ message: "An error occurred while deleting the user" });
    }
});

module.exports = router;
