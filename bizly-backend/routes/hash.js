const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash('1234', 10);
    console.log(hashed);
    console.log(salt);
};

run();
