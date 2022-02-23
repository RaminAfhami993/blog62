const authTools = {};


authTools.sessionChecker = function(req, res, next)  {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect('/api/auth/dashboard')
    } 
    next()
};


authTools.loginChecker = function(req, res, next)  {
    if (!req.session.user || !req.cookies.user_sid) {
        return res.status(403).send("Access denied!")
    } 
    next();
}




module.exports = authTools;