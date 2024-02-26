// backend/controllers/orderingController.js

const Ordering = require('../models/Order.house');

// Funzione per creare un nuovo ordine
exports.createOrdering = (req, res) => {
    const ordering = new Ordering(req.body);
    ordering.save()
        .then((ordering) => {
            res.status(201).json(ordering);
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
};

// Funzione per ottenere tutti gli ordini
exports.getAllOrderings = (req, res) => {
    Ordering.find()
        .then((orderings) => {
            res.status(200).json(orderings);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// Funzione per ottenere un singolo ordine per ID
exports.getOrderingById = (req, res) => {
    Ordering.findById(req.params.id)
        .then((ordering) => {
            if (!ordering) {
                return res.status(404).json({ message: 'Ordering not found' });
            }
            res.status(200).json(ordering);
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};

// actualizar
exports.updateOrdering = (req, res) => {
    Ordering.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((ordering) => {
            if (!ordering) {
                return res.status(404).json({ message: 'Ordering not found' });
            }
            res.status(200).json(ordering);
        })
        .catch((error) => {
            res.status(400).json({ error: error.message });
        });
};

// Borrar
exports.deleteOrdering = (req, res) => {
    Ordering.findByIdAndDelete(req.params.id)
        .then((ordering) => {
            if (!ordering) {
                return res.status(404).json({ message: 'Ordering not found' });
            }
            res.status(200).json({ message: 'Ordering deleted successfully' });
        })
        .catch((error) => {
            res.status(500).json({ error: error.message });
        });
};
