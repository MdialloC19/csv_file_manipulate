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
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} An error if the update fails.
 *
 * @example
 * // Example of usage
 * await updateDocuments();
 */
async function updateDocuments() {
  try {
    // Retrieve all documents
    const users = await User.find({});

    // Update each document
    for (const user of users) {
      if (!user.isDeleted) {
        user.isDeleted = [];
      }
      // You can also add default values for the previousPasswords field if necessary
    }
    console.log(users);

    // Save the modifications
    await Promise.all(users.map((user) => user.save()));

    console.log("Document update completed.");
  } catch (error) {
    console.error("Error during document update:", error);
    throw error; // Reject the error for downstream error handling if necessary
  } finally {
    mongoose.disconnect();
  }
}

// updateDocuments();

module.exports = connectDB;
