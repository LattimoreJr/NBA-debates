const {
    findUserByToken
} = require('../db/auth')

const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token || typeof token !== 'string') {
            const err = new Error('No token provided');
            err.status = 401;
            return next(err);
        }
      
        const user = await findUserByToken(token);
        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
}

const isAdmin = (req, res, next) => {
    if(req.user.is_admin){
        next()
    }else{
        const er = Error('must be admin')
        er.status = 401
        next(er)
    }
   
}

module.exports = {
    isLoggedIn,
    isAdmin
}