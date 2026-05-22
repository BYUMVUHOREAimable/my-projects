import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // Find user by username
      const user = await User.findOne({ username });
      
      if (!user) {
        return done(null, false, { message: "User does not exist." });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        // CRITICAL FIX: Return false, not the user object when password is wrong
        return done(null, false, { message: "Incorrect password." });
      }

      // Password is correct, return the user
      return done(null, user);
      
    } catch (error) {
      console.error('Passport authentication error:', error);
      return done(error);
    }
  })
);

passport.serializeUser((user, done) => {
    console.log('Serializing user:', user._id);
    done(null, user._id);
});

passport.deserializeUser(async (_id, done) => {
    try {
        console.log('Deserializing user:', _id);
        const user = await User.findById(_id);
        
        if (!user) {
            return done(new Error('User not found'));
        }
        
        done(null, user);
    } catch (error) {
        console.error('Deserialization error:', error);
        done(error);
    }
});

export default passport;