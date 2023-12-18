
// backend/config/passport.js

import { use, serializeUser, deserializeUser } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { authenticate, serializeUser as _serializeUser, deserializeUser as _deserializeUser } from '../models/user'; // Adjust the path based on your project structure

// Use the local strategy with Passport
use(new LocalStrategy(authenticate()));

// Serialize user data for sessions
serializeUser(_serializeUser());
deserializeUser(_deserializeUser());
