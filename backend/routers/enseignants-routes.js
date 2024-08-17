const express = require("express");
const router = express.Router();
const db = require("../models");

router.post("/enseignant", async (req, res) => {
  try {
    const enseignant = {
      nom: req.body.nom,
      prenom: req.body.prenom,
      email: req.body.email,
      tel: req.body.tel,
    };
    const newEnseignant = await db.Enseignants.create(enseignant);
    res.status(201).json(newEnseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/enseignants", async (req, res) => {
  try {
    const enseignants = await db.Enseignants.findAll();

    res.status(200).json(enseignants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/enseignant/:id", async (req, res) => {
  try {
    const enseignant = await db.Enseignants.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });

    if (!enseignant) {
      return res.status(404).json({ message: "Enseignant not found" });
    }

    res.status(200).json(enseignant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.put("/enseignant/edite/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const enseignant = await db.Enseignants.findByPk(id);
    if (!enseignant) {
      return res.status(404).json({ message: "Enseignant introuvable" });
    }

    await enseignant.update(req.body);

    res.status(200).json(eleve);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete("/enseignant/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const enseignant = await db.Enseignants.findByPk(id);

    if (enseignant) {
      await enseignant.destroy();
      res.status(200).json(enseignant);
    } else {
      res.status(404).json({ message: "enseignant introuvable" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
