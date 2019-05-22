// npm packages
const mongoose = require('mongoose');

// app imports
const { APIError } = require('../helpers');

// globals
const Schema = mongoose.Schema;

const accountSchema = new Schema({
  id: String,
  firstName: String,
  lastName: String,
  devices: [
    {
      make: String,
      model: String,
      deviceUserId: String,
      accessToken: String,
      refreshToken: String
    }
  ],
  healthScore: {
    calculated: String,
    components: {
      sleep: {
        averageDailySleepHours: String
      },
      fitness:{
        averageDailyRigorousActivityMinutes: String,
        averageRigorousActivityTimesPerWeek: String
    },
    heartRate:{
        averageRestingHeartRate: String
    }

    }
  },
});

accountSchema.statics = {
  /**
   * Create a Single New Thing
   * @param {object} newAccount - an instance of Thing
   * @returns {Promise<Account, APIError>}
   */
  async createAccount(newAccount) {
    const duplicate = await this.findOne({ id: newAccount.id });
    if (duplicate) {
      throw new APIError(
        409,
        'Account Already Exists',
        `There is already an account with id '${newAccount.id}'.`
      );
    }
    const account = await newAccount.save();
    return account.toObject();
  },
  /**
   * Delete a single Thing
   * @param {String} id - the Account's name
   * @returns {Promise<Account, APIError>}
   */
  async deleteAccount(id) {
    const deleted = await this.findOneAndRemove({ id });
    if (!deleted) {
      throw new APIError(404, 'Thing Not Found', `No thing '${name}' found.`);
    }
    return deleted.toObject();
  },
  /**
   * Get a single Thing by name
   * @param {String} id - the Accounts's name
   * @returns {Promise<Account, APIError>}
   */
  async readAccount(id) {
    const account = await this.findOne({ id });

    if (!thing) {
      throw new APIError(404, 'Account Not Found', `No account '${id}' found.`);
    }
    return account.toObject();
  },
  /**
   * Get a list of Things
   * @param {Object} query - pre-formatted query to retrieve things.
   * @param {Object} fields - a list of fields to select or not in object form
   * @param {String} skip - number of docs to skip (for pagination)
   * @param {String} limit - number of docs to limit by (for pagination)
   * @returns {Promise<Things, APIError>}
   */
  async readAccounts(query, fields, skip, limit) {
    const accounts = await this.find(query, fields)
      .skip(skip)
      .limit(limit)
      .sort({ id: 1 })
      .exec();
    if (!accounts.length) {
      return [];
    }
    return accounts.map(account => account.toObject());
  },
  /**
   * Patch/Update a single Account
   * @param {String} id - the Account's name
   * @param {Object} accountUpdate - the json containing the Account attributes
   * @returns {Promise<Thing, APIError>}
   */
  async updateAccount(id, acountUpdate) {
    const account = await this.findOneAndUpdate({ id }, accountUpdate, {
      new: true
    });
    if (!account) {
      throw new APIError(404, 'Account Not Found', `No account '${id}' found.`);
    }
    return account.toObject();
  }
};

/* Transform with .toObject to remove __v and _id from response */
if (!accountSchema.options.toObject) accountSchema.options.toObject = {};
accountSchema.options.toObject.transform = (doc, ret) => {
  const transformed = ret;
  delete transformed._id;
  delete transformed.__v;
  return transformed;
};

/** Ensure MongoDB Indices **/
//accountSchema.index({ name: 1, number: 1 }, { unique: true }); // example compound idx

module.exports = mongoose.model('Account', accountSchema);
