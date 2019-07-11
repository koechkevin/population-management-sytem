import { Op } from 'sequelize';
import models from '../../database/models';

const calculateTotals = async () => {
  const children = await models.Location.findAll({ where: { parent: { [Op.ne]: null } } });
  const parentLocations = children.map(each => each.parent);
  const locations = await models.Location.findAll();
  return locations.map((location) => {
    if (parentLocations.includes(location.id)) {
      const locationChildren = children.filter(child => child.parent === location.id);
      const locationMales = locationChildren.map(a => a.males);
      const locationFemales = locationChildren.map(a => a.females);
      const maleTotals = locationMales.reduce((a, b) => a + b);
      const femaleTotals = locationFemales.reduce((a, b) => a + b);
      const output = {
        // eslint-disable-next-line max-len
        name: location.name, id: location.id, parent: location.parent, createdAt: location.createdAt, updatedAt: location.updatedAt,
      };
      return {
        ...output, males: maleTotals, females: femaleTotals, totals: maleTotals + femaleTotals,
      };
    }

    return {
      // eslint-disable-next-line max-len
      name: location.name, id: location.id, males: location.males, females: location.females, totals: location.males + location.females, parent: location.parent, createdAt: location.createdAt, updatedAt: location.updatedAt,
    };
  });
};

export const listLocations = async (req, res) => {
  try {
    const calculatedTotals = await calculateTotals();
    res.status(200).json({ locations: calculatedTotals });
  } catch (e) {
    /* istanbul ignore next */
    res.status(400).json({ error: e.message });
  }
};

export const getOneLocation = async (req, res) => {
  try {
    const calculatedTotals = await calculateTotals();
    const locationFromTotals = calculatedTotals.filter(e => e.id.toString() === req.params.id);
    if (locationFromTotals.length) return res.status(200).json({ location: locationFromTotals[0] });
    return res.status(404).json({ message: 'Location not found' });
  } catch (e) {
    /* istanbul ignore next */
    return res.status(400).json({ error: e.message });
  }
};
