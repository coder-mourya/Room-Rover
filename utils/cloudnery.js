const cloudinary = require('cloudinary');

cloudinary.v2.config({
  cloud_name: 'dzmoltvmj',
  api_key: '691847115741147',
  api_secret: 'dJg706QxjMsw1j6WybLqSgwqpkk',
  secure: true,
});



const uploadToCloudinary = async (filepath) => {
    try {

        if (!filepath) {
            return null
        }
        const response = await cloudinary.uploader.upload(
            filepath, {
            resource_type: "auto"
        }
        )

        console.log("file uploaded", response.url)

        return response
    } catch (error) {
        fs.unlinkSync(filepath)
        return null
    }
}

module.exports  = {uploadToCloudinary}