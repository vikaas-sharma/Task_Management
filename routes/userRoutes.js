const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authenticateJWT = require('../middlewares/authMiddleware');

// User registration route
router.post('/register', userController.registerUser);

// User login route
router.post('/login', userController.loginUser);

// Get user details (protected route)
router.get('/me', authenticateJWT, userController.getUserDetails);

// Team creation route (protected route)
router.post('/teams', authenticateJWT, userController.createTeam);

// Update team members (protected route)
router.put('/teams/:teamId/members', authenticateJWT, userController.updateTeamMembers);

// Get team details (protected route)
router.get('/teams/:teamId', authenticateJWT, userController.getTeamDetails);

module.exports = router;
