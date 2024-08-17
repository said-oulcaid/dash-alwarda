module.exports = (sequelize, DataTypes) => {
  const Matieres = sequelize.define("Matieres", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    prix: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Matieres.associate = (models) => {
    Matieres.belongsTo(models.Niveaux, {
      foreignKey: {
        allowNull: false,
      },
    });
    Matieres.belongsTo(models.Enseignants, {
      foreignKey: {
        allowNull: false,
      },
    });
    Matieres.belongsToMany(models.Eleves, {
      through: "eleve_matieres",
      foreignKey: "MatiereId",
      otherKey: "EleveId",
    });
  };
  return Matieres;
};
