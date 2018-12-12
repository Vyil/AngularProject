const User = require('../models/user');
const errorModel = require('../models/errorModel');
const auth = require('../authentication/authentication');

module.exports = {

    createNewUser(req, res) {
        console.log('CreateNewUser called: ' + req.body);
        User.findOne({
                userName: req.body.userName
            })
            .then(result => {
                if (result) {
                    res.status(409).send(new errorModel(409, 'Username already exists')).end();
                } else {
                    const newUser = new User(req.body, {});
                    newUser.save()
                        .then(result => {
                            res.status(200).json({
                                message: "Created user: " + result
                            }).end();
                            return;
                        })
                        .catch(err => {
                            res.status(400).send(new errorModel(400, 'Error occured: ' + err)).end();
                            return;
                        });
                }
            })
            .catch(err => {
                res.status(409).send(new errorModel(409, 'Username already exists: ' + err)).end();
            })
    },

    getUser(req, res) {
        console.log('getUser called');
        var queryParam = req.query.getSelf;
        let token = req.get('Authorization')

        //Find all
        if (!queryParam) {
            User.find({})
                .then(result => {
                    if (result) {
                        res.status(200).json(result).end();
                        return;
                    } else {
                        res.status(404).send(new errorModel(400, 'Something went wrong, no results found')).end();
                        return;
                    }
                })
                .catch(error => {
                    res.status(400).errorModel(400, 'Error occoured: ' + error).end();
                    return;
                })
            //Find by query
        } else if (queryParam == 'yes') {
            if (!token) {
                res.status(401).json(new errorModel(401, 'Not authorized, no valid token')).end();
                return;
            }
            let cleanToken = token.substr(7)
            let cleanedid = auth.decodeToken(cleanToken).sub;
            User.findOne({
                    _id: cleanedid
                })
                .then(result => {
                    res.status(200).json(result).end();
                    return;
                })
                .catch(err => {
                    res.status(500).send(new errorModel(500, 'Error occured: ' + err)).end();
                    return;
                })
        } else {
            res.status(404).send(new errorModel(404, 'Unknown request')).end();
            return;
        }
    },

    getById(req, res) {
        let idUrl = req.params.id;

        User.findOne({
                _id: idUrl
            })
            .then(result => {
                if (!result) {
                    res.status(404).send(new errorModel(404, 'User with given ID not found')).end();
                    return;
                } else {
                    res.status(200).json(result).end();
                    return;
                }
            })
            .catch(err => {
                res.status(400).send(new errorModel(400, 'Error occured: ' + err)).end();
                return;
            })
    },

    editUser(req, res) {
        console.log('editUser called');
        let token = req.get('Authorization')

        let idUrl = req.params.id;
        let username = req.body.userName;

        User.findOneAndUpdate({_id: idUrl}, {userName: username})
            .then(result => {
                res.status(200).send(new errorModel(200, 'User updated')).end();
            })
            .catch(err => {
                res.status(500).send(new errorModel(500, 'Something went wrong trying to update the user: ' + err)).end();
            })
    },

    deleteUser(req, res) {
        console.log('deleteUser called');
        let idUrl = req.params.id;
        let token = req.get('Authorization')
        let cleanToken = token.substr(7)
        let cleanedid = auth.decodeToken(cleanToken).sub;

        User.findOne({
                _id: idUrl
            })
            .then(result => {
                if (result._id == cleanedid) {
                    result.remove()
                        .then(
                            res.status(200).send(new errorModel(200, 'User with ID: ' + idUrl + ' removed')).end()
                        )
                        .catch(err => {
                            res.status(500).send(new errorModel(500, 'Something went wrong trying to remove the user')).end();
                        })
                } else {
                    res.status(401).send(new errorModel(401, 'You are not allowed to remove this user')).end()
                }
            })
            .catch(err => {
                res.status(500).send(new errorModel(500, 'Something went wrong trying to remove the user')).end();
            })
    },

    addGold(req, res) {
        let token = req.get('Authorization')
        let cleanToken = token.substr(7)
        let cleanedid = auth.decodeToken(cleanToken).sub;
        User.findOneAndUpdate({_id: cleanedid}, {$inc: {gold: 200}})
            .then(res.status(200).json({
                message: 'success!'
            }).end());
    }
}