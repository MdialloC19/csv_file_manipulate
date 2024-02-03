const mongoose = require("mongoose");
const User = require("../models/users");
const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${conn.connection.host}`);
};

mongoose.set("strictQuery", true);

/**
 * Updates all documents in the User collection by adding the previousPasswords field
 * if it does not already exist.
 *
 * @async
 * @function
 * @param {Object} updateFields - Les champs à mettre à jour pour tous les utilisateurs.
 * @returns {Promise<void>} Une promesse qui se résout lorsque la mise à jour est complète.
 * @throws {Error} Une erreur si la mise à jour échoue.
 *
 * @example
 * // Exemple d'utilisation
 * const updateFields = {
 *   previousPasswords: [],
 *   // Ajoutez d'autres champs à mettre à jour au besoin
 * };
 * await updateAllUsers(updateFields);
 */

async function updateAllUsers(updateFields) {
  try {
    const users = await User.find({});

    for (const user of users) {
      Object.keys(updateFields).forEach((field) => {
        if (user[field] === undefined) {
          user[field] = updateFields[field];
          // console.log(user[field]);
        }
      });
    }

    // console.log(users);
    await Promise.all(users.map((user) => user.save()));
    console.log("Document update completed.");
  } catch (error) {
    console.error("Error during document update:", error);
    throw error;
  } finally {
    mongoose.disconnect();
  }
}

const updateFields = {
  isDeleted: {
    type: Boolean,
    default: false,
  },
};

// updateAllUsers(updateFields);

module.exports = connectDB;
