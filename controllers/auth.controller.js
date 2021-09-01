const CustomError = require('../errors/customError');
const { User } = require('../db');
const { CREATED, BAD_REQUEST } = require('../constants/status-codes.enum');
const { hashPassword, comparePasswords } = require('../services/password.service');

module.exports = {

    register: async (req, res, next) => {
        try {
            const { email, password, role } = req.body;

            const hashedPassword = await hashPassword(password);

            await User.create({
                email,
                password: hashedPassword,
                role
            });

            res
                .status(CREATED)
                .json({
                    message: 'Success'
                });
        } catch (e) {
            return next(e);
        }
    },

    login: async (req, res, next) => {
        try {
            const { password } = req.body;
            const { user } = req;

            const passwordMatched = await comparePasswords(password, user.password);

            if (!passwordMatched) {
                throw new CustomError('Incorrect credentials', BAD_REQUEST);
            }

            res
                .json({ message: 'Success' });
        } catch (e) {
            return next(e);
        }
    }

};
