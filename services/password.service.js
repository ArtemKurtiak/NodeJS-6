const bcrypt = require('bcrypt');

module.exports = {
    hashPassword: (password) => bcrypt.hash(password, 10),
    comparePasswords: async (password, hashedPassword) => {
        const passwordMatched = await bcrypt.compare(password, hashedPassword);

        return passwordMatched;
    }
};
