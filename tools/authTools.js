const authTools = {};


authTools.sessionChecker = function(req, res, next)  {
    if (req.session.user && req.cookies.user_sid) {
        return res.redirect('/api/auth/dashboard')
    } 
    next()
}



module.exports = authTools;