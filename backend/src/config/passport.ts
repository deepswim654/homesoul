import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { User } from '../entities/User';
import { AppDataSource } from './database';

const userRepository = AppDataSource.getRepository(User);

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userRepository.findOne({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
      scope: ['profile', 'email'],
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        // Check if user exists
        let user = await userRepository.findOne({
          where: { email: profile.emails?.[0].value }
        });

        if (!user) {
          // Create new user
          user = new User();
          user.email = profile.emails?.[0].value as string;
          user.name = profile.displayName;
          user.emailVerified = true; // Google accounts are already verified
          user.password = ''; // No password for OAuth users
          
          // Save Google profile picture if available
          if (profile.photos?.[0]?.value) {
            user.image = profile.photos[0].value;
          }

          await userRepository.save(user);
        }

        return done(null, user);
      } catch (error) {
        return done(error as Error, undefined);
      }
    }
  )
); 