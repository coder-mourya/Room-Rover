const User = require('../models/user');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const {username, email, number, password, role} = res.body;

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

    const {email, password} = res.body;
// find user by username 
    const mail = await User.findOne({email});

    if(!mail){
      return res.status(401).json({error : "invalid detials"});

    }
// check password 
const passwordMatch  = await bcrypt.compare(password, mail.password);

if(!passwordMatch){
  return res.status(401).json({error : "invalid password "})
}

//for genrate jwt token 

const token = jwt.sign({username: user.username, role: user.role},
  'secrete-key',
  {expiresIn: "1h"}
  
  );

  res.json({token})

    
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  
  registerUser,
  userlogin,
};
