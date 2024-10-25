const rbacMiddleware = (roles) => (req, res, next) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) return res.status(403).send('Access forbidden');
    next();
};

module.exports = rbacMiddleware;
