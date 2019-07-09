import models from '../../database/models';

export const updateLocation = async (req, res) => {
  try {
    const [didUpdate, updated] = await models.Location.update(
      { ...req.body }, { returning: true, where: { id: req.params.id } },
    );
    if (didUpdate) return res.status(200).json({ updated: updated[0] });
    return res.status(400).json({ error: 'No update executed' });
  } catch (e) {
    return res.status(400).json({ error: e.message });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    await models.Location.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'This has been successfully deleted' });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
