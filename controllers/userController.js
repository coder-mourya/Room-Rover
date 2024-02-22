const User = require('../models/user');
const GoogleAuthUser = require('../models/googleAuthUser')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


// Function to register a new user
const registerUser = async (req, res) => {
  try {
    const {username, email,  password, role} = req.body;

    const hashedPassword  = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password:hashedPassword,
      role,
    });

    await newUser.save();

    
    const token = jwt.sign({email: newUser.email, role: newUser.role},
      process.env.JWT_SECRET,
      {expiresIn: '1h'}
      
      );
      
      
      res.status(201).json({message: "new user register successfully", token})


  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
};


//regster user with google aouth

const registerUserWithGoogle = async(req, res) =>{

  try {
    const {username, email, role} = req.body;

  const newUserWithGoogle = new GoogleAuthUser({
    username,
    email,
    role,
  });

  await newUserWithGoogle.save();

  
  const googleProfile = jwt.sign({email: newUserWithGoogle.email, role: newUserWithGoogle.role},
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
    
    );
    
    res.status(201).json({message : "new user register successfully by google", googleProfile})
  

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal server error google auth' });
  }
}


const userloginWithGoogle = async (req, res) =>{
  try {

    const {email} = req.body;
    console.log('Email:', email);
   
// find user by username 
    const user = await GoogleAuthUser.findOne({email});

    if(!user){
      return res.status(401).json({error : "invalid detials"});

    }


//for genrate jwt token 

const googleProfile = jwt.sign({email: user.email, role: user.role},
  process.env.JWT_SECRET,
  {expiresIn: '1h'}
  
  );

  res.json({googleProfile})

    
  } catch (error) {
    console.log(error)
  }
}
  



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
  process.env.JWT_SECRET,
  {expiresIn: '1h'}
  
  );

  res.json({token})

  console.log("user loggedIn successFully");
    
  } catch (error) {
    console.log(error)
  }
}


// function for get userDetails 

const getDetails = async ( req, res) => {
         console.log("request recieved for user details");

         try {
            const userDetails = await User.find(req.query);
            res.status(201).json({success: true , data : userDetails  })
         } catch (error) {
            console.log("failed to get user details" , error);
            res.status(500).json({ success: false, error: "Failed to get user details" });
         }
}

// get current loggedin user details manual
const getUserDetails = async (req, res) => {
  console.log("request recieved for user details by id");

  try {
    
    const token = req.headers.authorization.split(' ')[1];

    
    // Verify the token and extract user ID
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const userEmail = decodedToken.email;
    
    // Find the user based on the decoded token
    const user = await User.findOne({email : userEmail});

    
    if(!user){
      return res.status(404).json({success : false, error: 'user not exist '})
    }
   


    // Return the user details
    res.status(200).json({ success: true, data: user });
    
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ success: false, error: 'Unauthorized', message: error.message });
  }
};


const getUserDetailsWithGoogle = async (req, res) => {
  console.log("request recieved for user details by id");

  try {
    

    //get token request from frontend 
    const googleProfile = req.headers.authorization.split(' ')[1];

    
    // Verify the token and extract user ID
    const decodedToken = jwt.verify(googleProfile, process.env.JWT_SECRET);

    const userEmail = decodedToken.email;
    
    // Find the user based on the decoded token
    const user = await GoogleAuthUser.findOne({email : userEmail});

    
    if(!user){
      return res.status(404).json({success : false, error: 'user not exist '})
    }
   


    // Return the user details
    res.status(200).json({ success: true, data: user });
    
  } catch (error) {
    console.error('Authentication error:', error);
    res.status(401).json({ success: false, error: 'Unauthorized', message: error.message });
  }
};




module.exports = {
  
  registerUser,
  userlogin,
  getDetails,
  getUserDetails,
  registerUserWithGoogle,
  userloginWithGoogle,
  getUserDetailsWithGoogle,
};
