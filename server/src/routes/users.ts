import express from 'express';
const router = express.Router();
import * as UserController from '../controllers/UserController';

/**
 * private to admin -- verifyAdmin middleware
 * Get all users
 */
router.get('/', UserController.GET_ALL_USERS);

/**
 * private to user -- verifyJWT
 * Get one user
 */
router.post('/:id', UserController.GET_ONE_USER);

router.delete('/:id', UserController.DELETE_USER)


// TODO: Implement
router.patch('/:id', UserController.EDIT_USER)

export default router;
