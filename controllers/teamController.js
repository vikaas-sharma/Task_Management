const Team = require('../models/Team');
const User = require('../models/User');

// Create a new team
exports.createTeam = async (req, res) => {
    try {
        const { name, members } = req.body;
        const owner = req.user.userId;

        // Create the new team with the owner and initial members
        const newTeam = new Team({ name, members: [owner, ...members], owner });
        await newTeam.save();

        res.status(201).json(newTeam);
    } catch (error) {
        res.status(400).json({ message: 'Error creating team', error });
    }
};

// Add members to a team
exports.addMembers = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { members } = req.body;

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        // Ensure only the owner can add members
        if (team.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to add members' });
        }

        // Add new members
        team.members.push(...members);
        await team.save();

        res.status(200).json({ message: 'Members added successfully', team });
    } catch (error) {
        res.status(400).json({ message: 'Error adding members', error });
    }
};

// Remove members from a team
exports.removeMembers = async (req, res) => {
    try {
        const { teamId } = req.params;
        const { members } = req.body;

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        // Ensure only the owner can remove members
        if (team.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to remove members' });
        }

        // Remove specified members
        team.members = team.members.filter(member => !members.includes(member.toString()));
        await team.save();

        res.status(200).json({ message: 'Members removed successfully', team });
    } catch (error) {
        res.status(400).json({ message: 'Error removing members', error });
    }
};

// Update a member's role in the team
exports.updateMemberRole = async (req, res) => {
    try {
        const { teamId, memberId } = req.params;
        const { role } = req.body;

        const team = await Team.findById(teamId);
        if (!team) return res.status(404).json({ message: 'Team not found' });

        // Ensure only the owner can update roles
        if (team.owner.toString() !== req.user.userId) {
            return res.status(403).json({ message: 'Unauthorized to update roles' });
        }

        // Find the member and update their role
        const member = team.members.find(m => m._id.toString() === memberId);
        if (!member) return res.status(404).json({ message: 'Member not found in team' });

        member.role = role;
        await team.save();

        res.status(200).json({ message: 'Member role updated successfully', team });
    } catch (error) {
        res.status(400).json({ message: 'Error updating member role', error });
    }
};

// Get team details
exports.getTeamDetails = async (req, res) => {
    try {
        const { teamId } = req.params;
        const team = await Team.findById(teamId).populate('members', 'name email role');
        if (!team) return res.status(404).json({ message: 'Team not found' });

        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ message: 'Error fetching team details', error });
    }
};
