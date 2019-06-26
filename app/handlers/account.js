// npm packages
const { validate } = require("jsonschema");

// app imports
const { Account } = require("../models");
const { APIError } = require("../helpers");
const { accountNewSchema, accountUpdateSchema } = require("../schemas");

/**
 * Validate the POST request body and create a new Account
 */
async function createAccount(request, response, next) {
  console.log("inside create new account...");

  // const validation = validate(request.body, accountNewSchema);
  // if (!validation.valid) {
  //   return next(
  //     new APIError(
  //       400,
  //       'Bad Request',
  //       validation.errors.map(e => e.stack).join('. ')
  //     )
  //   );
  // }

  try {
    const newAccount = await Account.createAccount(new Account(request.body));
    return response.status(201).json(newAccount);
  } catch (err) {
    return next(err);
  }
}

/**
 * Get a single account
 * @param {String} id - the id of the Account to retrieve
 */
async function readAccount(request, response, next) {
  const { id } = request.params;
  try {
    const account = await Account.readAccount(id);
    return response.json(account);
  } catch (err) {
    return next(err);
  }
}

/**
 * Update a single Account
 * @param {String} id - the id of the Account to update
 */
async function updateAccount(request, response, next) {
  console.log("inside update account...");

  const { id } = request.params;

  console.log(request.body);

  // const validation = validate(request.body, accountUpdateSchema);
  // if (!validation.valid) {
  //   return next(
  //     new APIError(
  //       400,
  //       'Bad Request',
  //       validation.errors.map(e => e.stack).join('. ')
  //     )
  //   );
  // }

  try {
    const account = await Account.updateAccount(id, request.body);
    return response.json(account);
  } catch (err) {
    return next(err);
  }
}

/**
 * Remove a single Account
 * @param {String} id - the id of the Account to remove
 */
async function deleteAccount(request, response, next) {
  const { id } = request.params;
  try {
    const deleteMsg = await Account.deleteAccount(id);
    return response.json(deleteMsg);
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  createAccount,
  readAccount,
  updateAccount,
  deleteAccount
};
