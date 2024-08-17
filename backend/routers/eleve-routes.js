const express = require("express");
const router = express.Router();
const db = require("../models");
const { where } = require("sequelize");

router.post("/eleve", async (req, res) => {
  try {
    const eleveData = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      date_inscription: req.body.date_inscription,
      tel_parent: req.body.tel_parent,
      tel_eleve: req.body.tel_eleve,
      CentreId: req.body.centreId,
      NiveauxId: req.body.niveauxId,
      inscription_par: req.body.inscription_par,
    };
    const newEleve = await db.Eleves.create(eleveData);

    if (req.body.matiereIds && req.body.matiereIds.length > 0) {
      await newEleve.addMatieres(req.body.matiereIds);
    }

    res.status(201).json(newEleve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


router.get("/eleve", async (req, res) => {
  try {
    const eleves = await db.Eleves.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        { model: db.Niveaux, attributes: ["nom"] },
        { model: db.Centres, attributes: ["nom"] },
        {
          model: db.Matieres,
          attributes: ["nom"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json(eleves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/eleve/:id", async (req, res) => {
  try {
    const eleve = await db.Eleves.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        { model: db.Centres, attributes: ["nom"] },
        { model: db.Niveaux, attributes: ["nom"] },
        {
          model: db.Matieres,
          attributes: ["nom", "id"],
          through: { attributes: [] },
        },
      ],
    });
    res.status(200).json(eleve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/eleve/edite/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const eleve = await db.Eleves.findByPk(id);
    if (!eleve) {
      return res.status(404).json({ message: "Étudiant introuvable" });
    }

    await eleve.update(req.body);

    if (req.body.matiereIds && req.body.matiereIds.length > 0) {
      await eleve.setMatieres(req.body.matiereIds);
    }

    res.status(200).json(eleve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/eleve/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const eleve = await db.Eleves.findByPk(id);

    if (eleve) {
      await eleve.destroy();
      res.status(200).json(eleve);
    } else {
      res.status(404).json({ message: "étudiant introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
