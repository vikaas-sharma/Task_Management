const User = require('../models/User');
const Team = require('../models/Team');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// User Registration
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save new user
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', newUser  });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
};

// User Login
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'User not found' });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user });
    } catch (error) {
        res.status(400).json({ message: 'Error logging in', error });
    }
};

// Get User Details
exports.getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) return res.status(404).json({ message: 'User not found' });

        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching user details', error });
    }
};

// Create Team
exports.createTeam = async (req, res) => {
    try {
        const { name, members } = req.body;
        const owner = req.user.userId;

        // Create and save new team
        const newTeam = new Team({ name, members: [owner, ...members], owner });
        await newTeam.save();

        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ message: 'Error creating team', error });
    }
};

// Add or Remove Members from Team
exports.updateTeamMembers = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { membersToAdd, membersToRemove } = req.body;

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        // Only team owner can update members
        if (team.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to update team members' });
        }

        // Add and remove members
        if (membersToAdd) team.members.push(...membersToAdd);
        if (membersToRemove) {
            team.members = team.members.filter(member => !membersToRemove.includes(member.toString()));
        }

        await team.save();
        res.status(200).json({ message: 'Team members updated successfully', team });
    } catch (error) {
        res.status(400).json({ message: 'Error updating team members', error });
    }
};

// Get Team Details
exports.getTeamDetails = async (req, res) => {
    try {
        const { teamId } = req.params;
        const team = await Team.findById(teamId).populate('members', 'name email');
        if (!team) return res.status(404).json({ message: 'Team not found' });

        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching team details', error });
    }
};
