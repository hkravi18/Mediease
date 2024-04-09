const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { validateSchedule } = require('../middlewares');
const {
    getScheduleList,
    createSchedule,
    updateSchedule,
    deleteSchedule
} = require('../controllers/scheduleController');
//schedule routes

const authMiddleware = require("../middlewares/authMiddleware");
const roles = ["DOCTOR", "PARAMEDICAL", "ADMIN"];

router.get('/',
    authMiddleware(["PATIENT", "DOCTOR", "PARAMEDICAL", "ADMIN"]),
    catchAsync(getScheduleList));

router.use(authMiddleware(roles));

router.post('/', validateSchedule, catchAsync(createSchedule));
router.put('/:id', validateSchedule, catchAsync(updateSchedule));
router.delete('/:id', catchAsync(deleteSchedule));

module.exports = router;