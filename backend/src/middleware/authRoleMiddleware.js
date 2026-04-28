// Dashboard check based on user role [advocate, ca, hybrid]

export const authorizeRoles = (...roles) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return res.status(403).json({ message: "Access denied. You don't have permission to access this resource." });
        }
        next();
    }
}