const { Credential } = require('../db/models');
const CredentialModelObj = require('../db/models/Credential');

const createCredential = async (req, res) => {
  const credential = new Credential(req.body);

  try {
    const newCredential = await credential.save();
    res.status(201).send(newCredential);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
};

const fetchCredentials = async (req, res) => {
  const { userId } = req.params;

  try {
    const credential = await Credential.find({ userId });
    res.status(200).send(credential);
  } catch (e) {
    res.status(500).send(e);
  }
};

const findCredential = async (req, res) => {
  const { userId, id } = req.params;

  try {
    const credential = await Credential.find({ userId, _id: id });
    res.status(200).send(credential);
  } catch (e) {
    res.status(500).send(e);
  }
};

const updateCredential = async (req, res) => {
  const { params: { userId, id }, body } = req;

  const fieldsToUpdate = Object.keys(body);
  const allowedUpdates = Object.keys(CredentialModelObj);
  const isValidUpdate = fieldsToUpdate.every(field => {
    return allowedUpdates.includes(field);
  });

  if (!isValidUpdate) {
    return res.status(403).send({ error: 'Invalid Update' });
  }
  try {
    const credential = await Credential.findOneAndUpdate({ userId, _id: id }, body, { runValidators: true, new: true });
    res.status(202).send(credential);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteCredential = async (req, res) => {
  const { userId, id } = req.params;

  try {
    const credential = await Credential.findOneAndDelete({ userId, _id: id });

    if (!credential) {
      return res.status(404).send();
    }
    res.status(200).send(credential);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  fetchCredentials,
  createCredential,
  findCredential,
  updateCredential,
  deleteCredential
};
