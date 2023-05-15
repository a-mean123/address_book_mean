const Contact = require('../models/contact');


const create =  async (req, res, filename)=>{

    try {
        
        let contact = new Contact( req.body );
        contact.image = filename;

        let savedContact = await contact.save();

        res.send(savedContact);

    } catch (error) {
        res.send(error)
    }

}


const del = async ( req, res )=>{
    try {
        
        let { id } = req.params;
        let result = await Contact.findByIdAndDelete({ _id: id });
        res.send(result);

    } catch (error) {
        res.send(error)
    }
}

const getByIdUser = async (req, res)=>{
    try {
        
        let { iduser } = req.params;
        let result = await Contact.find({ idUser: iduser });
        res.send(result);

    } catch (error) {
        res.send(error)
    }
}

const getById = async (req, res)=>{

    try {
        
        let result = await Contact.findById({ _id: req.params.id });
        res.send( result );

    } catch (error) {
        res.send(error)
    }
}

const update = async (req, res, filename)=>{
    try {

        let { id }= req.params;
        let data = req.body;

        if(filename.length > 0){
            data.image = filename;
        }

        let result = await Contact.findByIdAndUpdate( {_id: id} , data );

        res.send(result);

    } catch (error) {
        res.send(error)
    }
}


module.exports = {
    create,
    del,
    getById,
    getByIdUser,
    update
}