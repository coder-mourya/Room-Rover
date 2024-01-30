const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const {username, email, number, password, role} = req.body;

    const hashedPassword  = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      number,
      password:hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({message: "new user register successfully"})
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};



// User login using Passport local strategy
const userlogin = async (req, res) =>{
  try {

    const {email, password} = req.body;
    console.log('Email:', email);
    console.log('Password:', password);
// find user by username 
    const user = await User.findOne({email});

    if(!user){
      return res.status(401).json({error : "invalid detials"});

    }
// check password 
const passwordMatch  = await bcrypt.compare(password, user.password);

if(!passwordMatch){
  return res.status(401).json({error : "invalid password "})
}

//for genrate jwt token 

const token = jwt.sign({email: user.email, role: User.role},
  'secrete-key',
  {expiresIn: "1h"}
  
  );

  res.json({token})

    
  } catch (error) {
    console.log(error)
  }
}


// function for get userDetails 

const getDetails = async ( req, res) => {
         console.log("request recieved for user details");

         try {
            const userDetails = await User.find({});
            res.status(201).json({success: true , data : userDetails  })
         } catch (error) {
            console.log("failed to get user details" , error);
         }
}

module.exports = {
  
  registerUser,
  userlogin,
  getDetails,
};
