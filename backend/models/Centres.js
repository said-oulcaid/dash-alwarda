module.exports = (sequelize, DataTypes) => {
  const Centres = sequelize.define("Centres", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  Centres.associate = (models) => {
    Centres.hasMany(models.Eleves,{
      onDelete: "cascade"
    });
  };
  return Centres;
};
