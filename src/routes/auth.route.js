
const express = require('express');
const controller = require('../controllers/auth.controller');
const router = express.Router();
const { body, validationResult } = require('express-validator');


const { checkSchema } = require('express-validator');
/**
 * @type {import('express-validator').Schema}
 */
const authRequestSchema = {
    password: {
        in: ['body'],
        isString: {
            errorMessage: 'Password must be string'
        },
        isLength: {
            errorMessage: 'Password length must be between 8-15 characters!',
            options: { min: 8, max: 15 }
        }
    }
}

router.post('/accounts:signUp', checkSchema(authRequestSchema), controller.signUp);

// define the home page route
router.get('/', function (req, res) {
    res.send('Birds home page')
})
// define the about route
router.get('/about', function (req, res) {
    res.send('About birds')
});
router.get('/about:s', function (req, res) {
    res.send('About bird(s)')
});



// router.post('/api/auth/token::method',

//     routeObjectFunctions('method', token)
// );

module.exports = router