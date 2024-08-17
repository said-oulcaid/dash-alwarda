module.exports = (sequelize, DataTypes) => {
  const Eleves = sequelize.define("Eleves", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prenom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_inscription: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tel_parent: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel_eleve: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inscription_par: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Eleves.associate = (models) => {
    Eleves.belongsTo(models.Niveaux, {
      foreignKey: {
        allowNull: false,
      },
    });
    Eleves.belongsTo(models.Centres, {
      foreignKey: {
        allowNull: false,
      },
    });
    Eleves.belongsToMany(models.Matieres, {
      through: "eleve_matieres", 
      foreignKey: "EleveId", 
      otherKey: "MatiereId",
    });
  };

  return Eleves;
};
