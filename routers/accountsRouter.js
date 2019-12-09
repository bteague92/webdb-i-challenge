const express = require("express");

const db = require("./../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
    db
        .select("*")
        .from("accounts")
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "Error getting the accounts" });
        });
});

router.get("/:id", (req, res) => {
    db
        .select("*")
        .from("accounts")
        .where({ id: req.params.id })
        .first()
        .then(account => {
            res.status(200).json(account);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ errorMessage: "Error getting the account" });
        });
});

router.post("/", (req, res) => {
    const accountData = req.body;
    db("accounts")
        .insert(accountData, "id")
        .then(id => {
            res.status(201).json(accountData);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "Error adding the account"
            });
        });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} record(s) was updated` })
            } else {
                res.status(404).json({ message: "Account not found" });
            }
        })
        .catch(errot => {
            console.log(error)
            res.status(500).json({
                message: "Error updating account"
            })
        })
});

router.delete("/:id", (req, res) => {
    db("accounts")
        .where({ id: req.params.id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json({ message: `${count} account(s) were removed` });
            } else {
                res.status(404).json({
                    message: "Account not found"
                })
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                errorMessage: "Error deleting the account"
            });
        });
});

module.exports = router;