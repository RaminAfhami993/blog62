function accessController(req, res, next) {
    if (req.session.user.role !== "admin") {
        return res.status(403).send('Access denied!')
    };

    next();
}

function accessController(roles) {
    return function(req, res, next) {
        if (!roles.includes(req.session.user.role)) {
            return res.status(403).send('Access denied!')
        };

        next()
    }
}



module.exports = {
    accessController
};