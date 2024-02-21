import express from 'express';
import { createUser, deleteUser, getAllUsers, getUser, updateUser } from '../controllers/UserController.ts';
const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.post('/:id', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

export default router