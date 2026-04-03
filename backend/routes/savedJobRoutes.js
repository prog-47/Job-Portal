import express from 'express';
import { protect } from '../midllewares/AuthMidlleware.js'

import {
    saveJob,
    unsaveJob,
    getSavedJobs,
} from '../controllers/savedJobController.js';

const router = express.Router();

router.route("/:jobId").get(protect, saveJob)
                       .delete(protect, unsaveJob)
                       .post(protect, getSavedJobs);

export default router;