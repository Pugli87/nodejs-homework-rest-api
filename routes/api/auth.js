/*const express = require('express');

const { validation, ctrlWrapper } = require('../../middlewares');
const { auth: ctrl } = require('../../controllers');
const { joiRegisterSchema, joiLoginSchema } = require('../../models/user');

const router = express.Router();

router.post('/register', validation(joiRegisterSchema), ctrlWrapper(ctrl.register));
router.post('/login', validation(joiLoginSchema), ctrlWrapper(ctrl.login));
//router.post('/logout', auth, ctrlWrapper(ctrl.logout));


module.export = router;
*/
const express = require('express');

const authRouter = express.router();

module.exports = () => {
  authRouter.post('/login');
  return authRouter;
};
