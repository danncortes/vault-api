const { Cred, credSchema } = require('../db/models/Cred');
const { decryptData } = require('../helpers/cryptDecrypt');

const createCred = async (req, res) => {
  const cred = new Cred({
    ...req.body,
    userId: req.user._id
  });

  try {
    await cred.save();
    cred.data = decryptData(cred.data);
    res.status(201).send(cred);
  } catch (e) {
    res.status(400).send(e);
  }
};

const fetchCred = async (req, res) => {
  try {
    const cred = await Cred.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    if (cred.length > 0) {
      cred.forEach(cr => {
        cr.data = decryptData(cr.data);
      });
    }
    res.status(201).send(cred);
  } catch (e) {
    res.status(400).send(e);
  }
};

const findCred = async (req, res) => {
  const { id } = req.params;

  try {
    const cred = await Cred.findOne({ userId: req.user._id, _id: id });
    if (!cred) {
      return res.status(404).send();
    }
    cred.data = decryptData(cred.data);
    res.status(200).send(cred);
  } catch (e) {
    res.status(400).send(e);
  }
};

const updateCred = async (req, res) => {
  const { params: { id }, user: { _id }, body } = req;

  const fieldsToUpdate = Object.keys(body);
  const allowedUpdates = Object.keys(credSchema.obj);
  const isValidUpdate = fieldsToUpdate.every(field => {
    return allowedUpdates.includes(field);
  });

  if (!isValidUpdate) {
    return res.status(403).send({ error: 'Invalid Update' });
  }
  try {
    const cred = await Cred.findOne({ userId: _id, _id: id });
    if (!cred) {
      return res.status(404).send();
    }
    fieldsToUpdate.forEach(field => { cred[field] = body[field]; });
    await cred.save();
    cred.data = decryptData(cred.data);
    res.status(202).send(cred);
  } catch (e) {
    res.status(500).send(e);
  }
};

const deleteCred = async (req, res) => {
  const { params: { id }, user: { _id } } = req;

  try {
    const cred = await Cred.findOneAndDelete({ userId: _id, _id: id });

    if (!cred) {
      return res.status(404).send();
    }
    res.status(200).send(cred);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  createCred,
  fetchCred,
  findCred,
  updateCred,
  deleteCred
};
