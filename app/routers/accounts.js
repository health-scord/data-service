// npm packages
const express = require('express');

// app imports
const { accountHandler, accountsHandler } = require('../handlers');

// globals
const router = new express.Router();
const { readAccounts } = accountsHandler;
const { createAccount, readAccount, updateAccount, deleteAccount } = accountHandler;

/* All the Things Route */
router
  .route('/accounts')
    .get(readAccounts)
    .post(createAccount);

/* Single Thing by Name Route */
router
  .route('/accounts/:id')
    .get(readAccount)
    .post(createAccount)
    .patch(updateAccount)
    .delete(deleteAccount);

module.exports = router;
