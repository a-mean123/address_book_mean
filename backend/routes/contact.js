const express = require('express');
const router = express.Router();

const { create, del , getByIdUser, getById, update } = require('../controllers/contact');

const { verifyToken } = require('../config/auth');

// upload file config

const multer = require('multer');
let filename= '';

const myStorage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file , redirect)=>{
        filename = Date.now() + '.' + file.mimetype.split('/')[1];
        redirect(null, filename);
    }
})

const upload = multer({storage: myStorage});


router.post('/create', verifyToken ,upload.single('image') , (req, res)=>{

    create(req, res, filename);
    filename = '';
} );


router.get('/getbyiduser/:iduser',verifyToken, getByIdUser);
router.get('/getbyid/:id',verifyToken, getById);
router.delete('/delete/:id', del);

router.put('/update/:id', upload.single('image') , (req, res)=>{

    update(req, res, filename);
    filename = '';
}  );



module.exports = router;