const express = require("express");
const router = express.Router();
const authMidleWare = require("../Middleware/auth")

const propertyController = require("../controllers/propertyController")

const multer = require("multer");

const storage = multer.diskStorage({
    destination:  (req, res, cb) =>{
        cb (null, 'uploads/')
    },
    filename: (req, file, cb) =>{
        cb (null, file.originalname)
    }
})

const upload = multer({storage: storage});


router.get('/', propertyController.getAllProperties);

router.get('/owner',  authMidleWare,  propertyController.getPropertyByOwner);

router.delete('/properties/:id', propertyController.deletePropertyById);

router.post('/create', upload.single('image'),  propertyController.createProperty);

module.exports = router;

