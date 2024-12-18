import { Router } from 'express';
import { ProfileController } from '../controllers/profile.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { profileSchema } from '../validations/profile.validation';

const router = Router();
const profileController = new ProfileController();

router.get('/', authMiddleware, profileController.getProfile.bind(profileController));
router.put('/', authMiddleware, validateRequest(profileSchema), profileController.updateProfile.bind(profileController));

export default router; 