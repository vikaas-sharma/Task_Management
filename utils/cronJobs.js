const cron = require('node-cron');
const Task = require('../models/Task');
const notificationService = require('./notificationService');

const scheduleOverdueNotification = () => {
    cron.schedule('0 * * * *', async () => {  // Run every hour
        const overdueTasks = await Task.find({ dueDate: { $lt: new Date() }, completed: false });
        overdueTasks.forEach(task => {
            notificationService.sendOverdueNotification(task);
        });
    });
};

module.exports = scheduleOverdueNotification;
