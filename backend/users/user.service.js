const config = require('../../dbconfig.json');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/db');

const User = db.User;

module.exports = {
    authenticate,
    register
}

async function authenticate({ email, password }) {
    const user = await User.findOne({ email });
    if (user && bcrypt.compareSync(password, user.password)) {
        const { password, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
    }
}

async function register(userParam) {
    if (await User.findOne({ email: userParam.email })) {
        throw 'Username "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }
    await user.save();
}
