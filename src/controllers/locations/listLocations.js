import models from '../../database/models';

export const listLocations = async (req, res) => {
  try {
    const locations = await models.Location.findAll();
    res.status(200).json({ locations });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

export const getOneLocation = async (req, res) => {
  try {
    const location = await models.Location.findOne({
      where: { id: req.params.id },
    });
    res.status(200).json({ location });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
