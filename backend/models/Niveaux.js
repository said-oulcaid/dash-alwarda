module.exports = (sequelize, DataTypes) => {
  const Niveaux = sequelize.define("Niveaux", {
    nom: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });
  Niveaux.associate = (models) => {
    Niveaux.hasMany(models.Matieres,{
      onDelete: "cascade"
    });
    Niveaux.hasMany(models.Eleves,{
      onDelete: "cascade"
    });
  };

  
  return Niveaux;
};
