import { Op } from 'sequelize';
import models from '../../database/models';

const calculateTotals = async () => {
  const locationsWithParents = await models.Location
    .findAll({ where: { parent: { [Op.ne]: null } } });
  const parentLocations = locationsWithParents.map(each => each.parent);
  const locations = await models.Location.findAll();
  return locations.map((location) => {
    if (parentLocations.includes(location.id)) {
      const locationChildren = locationsWithParents.filter(child => child.parent === location.id);
      const locationMales = locationChildren.map(a => a.males);
      const locationFemales = locationChildren.map(a => a.females);
      const maleTotals = locationMales.reduce((a, b) => a + b);
      const femaleTotals = locationFemales.reduce((a, b) => a + b);
      return {
        name: location.name,
        id: location.id,
        male: maleTotals,
        female: femaleTotals,
        parent: location.parent,
        createdAt: location.createdAt,
        updatedAt: location.updatedAt,
      };
    }
    return location;
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
