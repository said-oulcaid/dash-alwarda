const express = require("express");
const router = express.Router();
const db = require("../models");
const { verifyToken } = require("../middlewares/verifyToken");

router.post("/centre", async (req, res) => {
  // if (!req.isOwner)
  //   return res.status(403).json({ message: "Vous n'avez pas le droit d'ajouter un centre." });

  try {
    const existingCentre = await db.Centres.count({ where: { nom: req.body.nom } });
    if (existingCentre > 0) {
      return res.status(400).json({ message: "Ce centre est déjà utilisé." });
    }
    const centre = await db.Centres.create({ nom: req.body.nom });
    res.status(201).json(centre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/centres", async (req, res) => {
  try {
    const centres = await db.Centres.findAll({
      attributes: ['id', 'nom'],
    });

    const centresWithTotalEleves = await db.Centres.findAll({
      attributes: [
        'id', 'nom',
        [db.sequelize.fn('COUNT', db.sequelize.col('Eleves.id')), 'totalEleves']
      ],
      include: [{
        model: db.Eleves,
        attributes: []
      }],
      group: ['Centres.id']
    });

    const formattedCentres = centres.map(centre => {
      const foundCentre = centresWithTotalEleves.find(item => item.id === centre.id);
      return {
        id: centre.id,
        nom: centre.nom,
        totalEleves: foundCentre ? foundCentre.dataValues.totalEleves : 0
      };
    });

    res.status(200).json(formattedCentres);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/centre/:id", async (req, res) => {
  try {
    const id = req.params.id
    
    const centre = await db.Centres.findByPk(id)

    if(!centre){
      return res.status(404).json({ message: "Centre introuvable" });
    }
    res.status(200).json(centre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.get("/centre/:id/eleves", async (req, res) => {
  try {
    const centreId = req.params.id;
    const centre = await db.Centres.findOne({
      where: { id: centreId },
      include: [{
        model: db.Eleves,
        attributes: { exclude: ["createdAt", "updatedAt", "inscription_par", "tel_eleve", "tel_parent", "CentreId", "NiveauxId"] },
        include: [
          { model: db.Niveaux, attributes: ["nom" , "id"] },
          {
            model: db.Matieres,
            attributes: ["nom"  , "id"],
            through: { attributes: [] },
          },
        ],
      }],
    });

    if (!centre) {
      return res.status(404).json({ message: "Centre introuvable" });
    }

    res.status(200).json(centre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.put('/centre/edite/:id', async (req, res) => {
  try {

    const id = req.params.id;
    const existingCentre = await db.Centres.count({ where: { nom: req.body.nom } });

    const centre = await db.Centres.findByPk(id);
    if (!centre) {
      return res.status(404).json({ message: "Centre introuvable" })
    }
    
    if (existingCentre > 0) {
      return res.status(400).json({ message: "Ce centre est déjà utilisé." });
    }
    await centre.update(req.body);
    res.status(200).json(centre);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

router.delete("/centre/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const centre = await db.Centres.findByPk(id);

    if (centre) {
      await centre.destroy();
      res.status(200).json(centre);
    } else {
      res.status(404).json({ message: "centre introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
