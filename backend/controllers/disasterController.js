const disasterService = require('../services/disasterService');

exports.createDisaster = async (req, res) => {
  try {
    const data = await disasterService.createDisaster(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDisasters = async (req, res) => {
  try {
    const { tag } = req.query;
    const data = await disasterService.getDisasters(tag);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDisaster = async (req, res) => {
  try {
    const data = await disasterService.updateDisaster(req.params.id, req.body);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDisaster = async (req, res) => {
  try {
    await disasterService.deleteDisaster(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
