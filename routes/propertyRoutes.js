const express = require("express");
const router = express.Router();

const propertyController = require("../controllers/propertyController")

const uploadToLocal = require('../Middleware/multer')

const uploadToCloudinary = require('../utils/cloudnery')

router.get('/', propertyController.getAllProperties);

router.get('/owner',   propertyController.getPropertyByOwner);

router.delete('/properties/:id', propertyController.deletePropertyById);


router.post('/create', uploadToLocal.array('images', 3), async (req, res) => {
    try {
        const files = req.files;

        // Upload files to Cloudinary
        const cloudinaryResponses = await Promise.all(files.map(file => uploadToCloudinary(file.path)));

        // Pass the cloudinaryResponses to the createProperty function
        await propertyController.createProperty(req, res, cloudinaryResponses);

        // Delete local files after uploading to Cloudinary
        files.forEach(file => fs.unlinkSync(file.path));
    } catch (error) {
        console.error("Error handling file uploads:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;

