const data = require("./lab5.json");

async function getById(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const entry = data.find(entry => entry.id === id);
            if (entry !== 'undefined') {
                resolve(entry);
            } else {
                reject(new Error("Not Found"));
            }
        }, 5000);
    });
}

module.exports.getById = getById;