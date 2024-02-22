const Contact = require('../models/contact')


const saveContact = async (req, res) =>{
    try {
        const {name, email, message} = req.body;

        const newConact = new Contact({
            name,
            email,
            message
        })

        await newConact.save()

        res.status(201).json({success : true, data : newConact })
    } catch (error) {
        console.log(error);
        res.status(401).json({error : "failed to save details "})
    }
}

module.exports = {saveContact}


