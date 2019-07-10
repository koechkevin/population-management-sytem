import models from '../../database/models';

export const validateLocationToUpdate = async (req, res, next) => {
  if (req.body.name) req.checkBody('name', 'name is required').notEmpty().isString().ltrim();
  if (req.body.males) req.checkBody('males', 'males is required').notEmpty().isInt().ltrim();
  if (req.body.females) req.checkBody('females', 'females is required').notEmpty().isInt().ltrim();
  if (req.body.parent) {
    req.checkBody('parent', 'please provide a value').notEmpty().isInt().ltrim();
    try {
      if (parseInt(req.body.parent, 10)) {
        const parent = await models.Location.findOne({ where: { id: req.body.parent } });
        if (!parent) return res.status(404).json({ message: 'No such location' });
      }
    } catch (error) {
      /* istanbul ignore next */
      return res.status(400).json({ errors: 'An error occurred' });
    }
  }
  const validationErrors = req.validationErrors();
  if (validationErrors) return res.status(422).json({ errors: validationErrors });
  return next();
};

export const updateLocation = async (req, res) => {
  try {
    const [didUpdate, updated] = await models.Location.update(
      { ...req.body }, { returning: true, where: { id: req.params.id } },
    );
    if (didUpdate) return res.status(200).json({ updated: updated[0] });
    return res.status(400).json({ error: 'No update executed' });
  } catch (e) {
    /* istanbul ignore next */
    return res.status(400).json({ error: e.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    await models.Location.update({ parent: null }, {
      where: {
        parent: req.params.id,
      },
    });
    await models.Location.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'This location has been successfully deleted' });
  } catch (e) {
    /* istanbul ignore next */
    res.status(400).json({ error: e.message });
  }
};
