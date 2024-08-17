const express = require("express")
const router = express.Router()
const db = require('../models')

router.post('/matiere', async (req, res) => {
    try {
        const existingMatiere = await db.Matieres.count({ where: { nom: req.body.nom } });
        if (existingMatiere > 0) {
            return res.status(400).json({ message: 'Cette matière est déjà utilisée.' });
        }

        const matiere = await db.Matieres.create({
            nom: req.body.nom,
            prix: req.body.prix,
            NiveauxId: req.body.niveauId,
            EnseignantId: req.body.enseignantId,
        });

        res.status(201).json(matiere);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/matieres', async (req, res) => {
    try {
        const matieresWithTotalEleves = await db.Matieres.findAll({
            attributes: [
                'id',
                'nom',
                'prix',
                'NiveauxId',
                [db.sequelize.fn('COUNT', db.sequelize.col('eleves.id')), 'totalEleves']
            ],
            include: [{
                model: db.Eleves,
                attributes: [],
                through: { attributes: [] }
            },
            { model: db.Niveaux, attributes: ["nom"] },
            { model: db.Enseignants, attributes: ["nom"] },
            ],
            group: ['Matieres.id']
        });

        const formattedMatieres = matieresWithTotalEleves.map(matiere => ({
            id: matiere.id,
            nom: matiere.nom,
            prix: matiere.prix,
            NiveauxId: matiere.NiveauxId,
            enseignant: matiere.Enseignant,
            niveau: matiere.Niveaux,
            totalEleves: matiere.dataValues.totalEleves
        }));

        res.status(200).json(formattedMatieres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/matiere/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const matiere = await db.Matieres.findByPk(id, {
            include: [
                { model: db.Niveaux, attributes: ["nom"] },
                { model: db.Enseignants, attributes: ["nom"] },
                {
                    model: db.Eleves,
                    attributes: ['id', 'nom', 'prenom'],
                    through: { attributes: [] }
                }
            ]
        });

        if (matiere) {
            res.status(200).json(matiere);
        } else {
            res.status(404).json({ message: 'Matiere introuvable' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/matiere/:id/eleves', async (req, res) => {
    try {
        const matiereId = req.params.id;
        const matiere = await db.Matieres.findByPk(matiereId, {
            include: [
                { model: db.Niveaux, attributes: ["nom"] },
                { model: db.Enseignants, attributes: ["nom"] },
                {
                    model: db.Eleves,
                    attributes: ['id', 'nom', 'prenom'],
                    through: { attributes: [] }
                }
            ]
        });

        if (!matiere) {
            return res.status(404).json({ message: "Matière not found" });
        }

        const formattedEleves = matiere.Eleves.map(eleve => ({
            id: eleve.id,
            nom: eleve.nom,
            prenom: eleve.prenom,

        }));

        const result = {
            id: matiere.id,
            nom: matiere.nom,
            eleves: formattedEleves,
            niveau: matiere.Niveaux,
        };

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.put('/matiere/edite/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const existingMatiere = await db.Centres.count({ where: { nom: req.body.nom } });

        const matiere = await db.Matieres.findByPk(id);

        if (!matiere) {
            return res.status(404).json({ message: "Matiere introuvable" })
        }

        if (existingMatiere > 0) {
            return res.status(400).json({ message: "Ce Matiere est déjà utilisé." });
        }

        if (matiere) {
            matiere.nom = req.body.nom || matiere.nom;
            matiere.prix = req.body.prix !== undefined ? req.body.prix : matiere.prix;
            matiere.NiveauxId = req.body.niveauId || matiere.NiveauxId;
            matiere.EnseignantId = req.body.enseignantId || matiere.EnseignantId;

            await matiere.save();
            res.status(200).json(matiere);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// router.get('/matieres', async (req, res) => {
//     try {
//       const matieres = await db.Matieres.findAll({
//         attributes: ['id', 'nom'],
//         include: [
//           {
//             model: db.Eleves,
//             attributes: ['id', 'nom', 'prenom'],
//             through: { attributes: [] } // Exclude the attributes from the join table
//           }
//         ]
//       });

//       const formattedMatieres = matieres.map(matiere => ({
//         id: matiere.id,
//         nom: matiere.nom,
//         eleves: matiere.Eleves.map(eleve => ({
//           id: eleve.id,
//           nom: eleve.nom,
//           prenom: eleve.prenom
//         }))
//       }));

//       res.status(200).json(formattedMatieres);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
router.delete("/matiere/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const matiere = await db.Matieres.findByPk(id);

        if (matiere) {
            await matiere.destroy();
            res.status(200).json(matiere);
        } else {
            res.status(404).json({ message: "matiere introuvable" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = router