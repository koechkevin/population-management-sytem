import models from '../../database/models';

export const createLocation = async (req, res) => {
  try {
    const {
      body: {
        name, males, location, parent, females,
      },
    } = req;
    const newLocation = await models.Location.create({
      name, males, location, parent: parent || null, females,
    });
    res.status(201).json({ newLocation });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
