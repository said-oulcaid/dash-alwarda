const express = require("express")
const router = express.Router()
const db = require('../models')
const { verifyToken } = require('../middlewares/verifyToken')

router.post('/niveau', (req, res) => {
    db.Niveaux.count({ where: { nom: req.body.nom } }).then(doc => {
        if (doc != 0) {
            return res.status(400).json({ message: 'cet niveau est utilisé' })
        } {
            const niveau = {
                nom: req.body.nom,
            }
            db.Niveaux.create(niveau)
                .then((response) => res.status(201).json(response))
                .catch((err) => res.status(400).json(err))
        }
    })

})

router.get('/niveaux', async (req, res) => {
    try {
        const niveaux = await db.Niveaux.findAll({
            attributes: ['id', 'nom'],
        });

        const niveauxWithTotalEleves = await db.Niveaux.findAll({
            attributes: [
                'id', 'nom',
                [db.sequelize.fn('COUNT', db.sequelize.col('Eleves.id')), 'totalEleves']
            ],
            include: [{
                model: db.Eleves,
                attributes: []
            }],
            group: ['Niveaux.id']
        });

        const formattedNiveaux = niveaux.map(niveau => {
            const foundNiveau = niveauxWithTotalEleves.find(item => item.id === niveau.id);
            return {
                id: niveau.id,
                nom: niveau.nom,
                totalEleves: foundNiveau ? foundNiveau.dataValues.totalEleves : 0
            };
        });

        res.status(200).json(formattedNiveaux);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.put('/niveau/edite/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const { nom } = req.body;

        const niveau = await db.Niveaux.findByPk(id);

        if (!niveau) {
            return res.status(404).json({ message: "niveau introuvable" });
        }

        if (nom) {
            const niveauExists = await db.Niveaux.count({ where: { nom, id: { [db.Sequelize.Op.ne]: id } } });

            if (niveauExists) {
                return res.status(400).json({ message: 'cet niveau est utilisé' });
            }

            niveau.nom = nom;
        }

        await niveau.save();
        res.status(200).json(niveau);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get('/niveau/:id', async (req, res) => {
    try {
        const id = req.params.id

        const niveau = await db.Niveaux.findByPk(id)

        if (!niveau) {
            return res.status(404).json({ message: "niveau introuvable" });
        }
        res.status(200).json(niveau);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.get("/niveau/:id/eleves", async (req, res) => {
    try {
        const niveauId = req.params.id;
        const niveau = await db.Niveaux.findOne({
            where: { id: niveauId },
            include: [{
                model: db.Eleves,
                attributes: { exclude: ["createdAt", "updatedAt", "inscription_par", "tel_eleve", "tel_parent", "CentreId", "NiveauxId"] },
                include: [
                    { model: db.Centres, attributes: ["nom", "id"] },
                    {
                        model: db.Matieres,
                        attributes: ["nom", "id"],
                        through: { attributes: [] },
                    },
                ],
            }],
        });

        if (!niveau) {
            return res.status(404).json({ message: "Niveau introuvable" });
        }

        res.status(200).json(niveau);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

router.delete('/niveau/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const niveau = await db.Niveaux.findByPk(id);

        if (niveau) {
            await niveau.destroy();
            res.status(200).json(niveau);
        } else {
            res.status(404).json({ message: "niveau introuvable" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

module.exports = router