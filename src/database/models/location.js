
module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    name: { type: DataTypes.STRING },
    males: { type: DataTypes.INTEGER },
    females: { type: DataTypes.INTEGER },
    parent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  }, {});
  Location.associate = function (models) {
    Location.hasMany(models.Location, {
      foreignKey: 'parent',
      as: 'parent_location',
    });
    Location.belongsTo(models.Location, {
      foreignKey: 'parent',
      as: 'p_location',
    });
  };
  return Location;
};
