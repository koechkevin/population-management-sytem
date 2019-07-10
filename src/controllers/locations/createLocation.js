import models from '../../database/models';

export const validateLocation = async (req, res, next) => {
  req
    .checkBody('name', 'name is required')
    .notEmpty().isString()
    .ltrim();
  req
    .checkBody('males', 'males is required')
    .notEmpty().isInt()
    .ltrim();
  req
    .checkBody('females', 'females is required')
    .notEmpty().isInt()
    .ltrim();
  if (req.body.parent) {
    req
      .checkBody('parent', 'please provide a value')
      .notEmpty().isInt()
      .ltrim();
    try {
      if (parseInt(req.body.parent, 10)) {
        const parent = await models.Location.findOne({ where: { id: req.body.parent } });
        if (!parent) {
          return res.status(404).json({
            message: 'No such location',
          });
        }
      }
    } catch (error) {
      return res.status(400).json({ errors: 'An error occurred' });
    }
  }
  const validationErrors = req.validationErrors();
  if (validationErrors) return res.status(422).json({ errors: validationErrors });
  return next();
};

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
