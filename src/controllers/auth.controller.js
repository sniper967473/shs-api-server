

const Bcrypt = require('bcryptjs');
const JWT = require('jsonwebtoken');
const express = require('express');
const db = require('../db');
const { v4: uuid } = require('uuid');

const ID_TOKEN_EXPIRY = 60 * 60 * 24; // 1 day
/**
    * 
    * @param {import('express').Request} req 
    * @param {import('express').Response} res 
    */
module.exports.refreshIdToken = function (req, res) {
    if (!req.body.refreshToken) {
        respondWithError(res, Errors.BAD_REQUEST);
        return;
    }
    JWT.verify(req.body.refreshToken, process.env.SECRET, (err, token) => {
        if (err) {
            handleTokenError(res, err, 'refresh');
        } else if (token.grant === 'refreshIdToken') {
            db.user.findFirst({
                where: { id: token.id }
            }).then(account => {
                if (account && token.password === account.password) {
                    const idToken = generateIdToken(account.id);
                    const payload = {
                        idToken: idToken,
                        refreshToken: req.body.refreshToken,
                        localId: account.id,
                        expiresIn: ID_TOKEN_EXPIRY,
                        email: account.email
                    }
                    res.status(200).json(payload);
                } else {
                    respondWithError(res, Errors.Token.INVALID_ID_TOKEN);
                }
            }).catch(e => handleInternalError(res, e));
        } else {
            respondWithError(res, Errors.Token.INVALID_REFRESH_TOKEN);
        }
    });
}
/**
* 
* @param {import('express').Request} req 
* @param {import('express').Response} res 
*/
module.exports.signUp = function (req, res) {
    const payload = {
        idToken: "idToken",
        refreshToken: "refreshToken",
        localId: 0,
        expiresIn: ID_TOKEN_EXPIRY,
        username: 'default'
    }
    res.status(201).json(payload);
    // UserDB.
        // UserDB.find({ fields: { localId: } })
    const idToken = uuid;

    return;







    req.body.password = Bcrypt.hashSync(req.body.password);
    db.user.create({
        data: req.body
    }).then(account => {
        const refreshToken = generateRefreshToken(account.id, account.password);
        const payload = {
            idToken: idToken,
            refreshToken: refreshToken,
            localId: account.id,
            expiresIn: ID_TOKEN_EXPIRY,
            email: account.email
        }
        res.status(201).json(payload);
    }).catch(err => {
        if (err.code === 'P2002') {
            respondWithError(res, Errors[err.meta.target.toUpperCase() + '_ALREADY_EXISTS']);
        } else {
            handleInternalError(res, err);
        }
    });
}
/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
module.exports.signIn = function (req, res) {
    if (requireRequestBody(req, res, signInSchema)) {
        db.user_view.findFirst({
            where: {
                email: req.body.email
            }
        }).then(account => {
            if (account && Bcrypt.compareSync(req.body.password, account.password)) {
                const idToken = generateIdToken(account.id);
                const refreshToken = generateRefreshToken(account.id, account.password);
                const payload = {
                    idToken: idToken,
                    refreshToken: refreshToken,
                    localId: account.id,
                    expiresIn: ID_TOKEN_EXPIRY,
                    email: account.email
                }
                res.status(200).json(payload);
            } else {
                respondWithError(res, Errors.WRONG_CREDENTIALS);
            }
        }).catch(e => handleInternalError(res, e));
    }

}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
module.exports.lookupUser = function (req, res) {
    if (!req.body.idToken) {
        respondWithError(res, Errors.BAD_REQUEST);
        return;
    }
    JWT.verify(req.body.idToken, process.env.SECRET, (err, token) => {
        if (err) {
            handleTokenError(res, err, 'id');
        } else {
            db.user_view.findFirst({
                where: { id: token.id }
            }).then(account => {
                if (account) {
                    account.password = undefined;
                    res.status(200).json(account);
                } else
                    respondWithError(res, Errors.USER_NOT_FOUND);
            }).catch(e => handleInternalError(res, e));
        }
    })
}

/**
 * 
 * @param {import('express').Request} req 
 * @param {import('express').Response} res 
 */
module.exports.deleteAccount = function (req, res) {
    if (!req.body.idToken) {
        respondWithError(res, Errors.BAD_REQUEST);
        return;
    }
    JWT.verify(req.body.idToken, process.env.SECRET, (err, token) => {
        if (err) {
            handleTokenError(res, err, 'id');
        } else {
            db.user.findFirst({
                where: { id: token.id }
            }).then(account => {
                if (account)
                    return db.user.delete({ where: { id: token.id } });
                else {
                    return Promise.reject(404);
                }
            }).then((x) => {
                res.status(204).json({});
            }).catch(e => {
                if (e === 404) {
                    respondWithError(res, Errors.USER_NOT_FOUND);
                } else {
                    handleInternalError(res, e)
                }
            });
        }
    });
}

