const express =require('express');
const router = express.Router()

//declare controller path
const booking = require('../controller/booking');
const getProvider = require('../controller/getProvider');
const register = require('../controller/register');
const login = require('../controller/login');
const confirmBooking = require('../controller/confirmBooking');
const getClientsBookings = require('../controller/getClientsBookings');
const getAllBookings = require('../controller/getProviderBookings')
const regprovider = require('../controller/regprovider');
const getClientProfile  = require('../controller/profile');

const updateDescription = require('../controller/updateDescription');
const updateProviderProfile = require('../controller/updateProviderProfile');
const getOneUserProfile = require('../controller/updateProviderProfile');
const rating = require('../controller/rating');
const { getUser } = require('../controller/getUser');
const updateBookingDetails = require('../controller/updateBookingDetails');
//const cancelBooking = require('../controller/updateBookingDetails');
const forgotPassword = require('../controller/forgotPassword');
const resetPassword = require('../controller/resetPassword');
const deleteImage = require('../controller/deleteImage');

//Declaring api endpoints
router.post('/booking', booking.booking)
router.post('/getProvider', getProvider.getProvider)
router.post('/register', register.register)
router.post('/regprovider', regprovider.regprovider)
router.post('/login', login.login)
router.put('/confirmBooking', confirmBooking.confirmBooking)
router.put('/updateDescription/:user_id', updateDescription.updateDesc)
router.put('/updateProviderProfile/:user_id', updateProviderProfile.updateProviderProfile)
router.get('/getClientsBookings/:id', getClientsBookings.getBookingById)

router.put('/providerUpdateBookings/:id', getAllBookings.updateBooking)
router.get('/getNotification/:id',getAllBookings.getNotification)
router.put('/ReadNotification/:id',getAllBookings.readNotification)
router.get('/CountNotifications/:id',getAllBookings.countNotification)

router.get('/getProviderBookings/:id', getAllBookings.getAllBookings)
router.get('/getOneUserProfile/:user_id', updateProviderProfile.getOneUserProfile)
router.put('/updateBookingDetails/:id', updateBookingDetails.updateBookingDetails)
router.put('/cancelBooking/:id', updateBookingDetails.cancelBooking)

router.post('/forgotPassword', forgotPassword.forgotPassword)
router.post('/resetPassword/:reset_token', resetPassword.resetPassword)

router.get('/profile/:id', getClientProfile.getClientProfile)
router.get('/providerbyid/:id', getProvider.getProviderbyid)
router.put('/profile/:id', getClientProfile.updateClientProfile)
router.put('/updateClientProfilepic/:id', getClientProfile.updateClientProfilepic)
router.put('/updateCoverImg/:id', getClientProfile.updateCoverImg)

router.put('/rating', rating.rateProvider)
router.get('/getUser/:user_id', getUser)

router.get('/countPending/:id', getAllBookings.countPending)
router.get('/countCancelled/:id', getAllBookings.countCencelled)
router.get('/countApproved/:id', getAllBookings.countApproved)
router.get('/countDeclined/:id', getAllBookings.countDeclined)

router.post('/addContent/:id',updateProviderProfile.addContent)
router.get('/getContent/:id',updateProviderProfile.getContent)


router.put('/deleteImage/:id', deleteImage.deleteImage)


// router.post('/login', updateProviderProfile.login).updateCoverImg



module.exports = router 