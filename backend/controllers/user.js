const User = require('../models/user');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const register = async (req, res)=>{

    try {
        
        let data = req.body;
        let user = new User(data);

        user.password = bcrypt.hashSync( data.password, 10);

        let savedUser = await user.save();
        res.send(savedUser);

    } catch (error) {
        res.send(error)
    }

}


const login = async (req, res)=>{

    try {
        
        let { email, password } = req.body;

        let user = await User.findOne({ email: email });

        if(!user){
           return res.send('email or password invalid');
        }

        let validPass = bcrypt.compareSync( password, user.password );

        if(!validPass){
           return res.send('email or password invalid');
        }

        let payload = {
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            _id: user._id
        }

        let token = jwt.sign( payload, '123456789kk' );
        res.send( { mytoken: token } );

        
    } catch (error) {
        res.send(error)
    }

}



module.exports = {
    register,
    login
}