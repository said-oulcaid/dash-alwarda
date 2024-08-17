module.exports = (sequelize, DataTypes) => {
  const Enseignants = sequelize.define("Enseignants", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Enseignants.associate = (models) => {
    Enseignants.hasMany(models.Matieres);
  };
  return Enseignants;
};
