const jwt = require('jsonwebtoken');


const verifyToken = (req, res, next)=>{

    try {
        // baerer qskldjqklsd.qlsdjqs.mlqsjd
        console.log(req.headers.authorization);

        const decoded = jwt.verify(  req.headers.authorization.split(' ')[1]  , '123456789kk'  );
        req.user = decoded;
        next();

    } catch (error) {
        res.status(401).send('invalid token');
    }

}

module.exports = {verifyToken};