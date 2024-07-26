const express = require('express');
const router = express.Router();
const medicineController = require('../controllers/medicinesController');

// Route to add a new medicine
router.post('/medicines', medicineController.addMedicine);

// Route to get a medicine by ID
router.get('/medicines/:id', medicineController.getMedicineById);

// Route to get all medicines
router.get('/medicines', medicineController.getAllMedicines);

// Route to update a medicine by ID
router.put('/medicines/:id', medicineController.updateMedicine);

// Route to delete a medicine by ID
router.delete('/medicines/:id', medicineController.deleteMedicine);

// Route to search for medicines
router.get('/medicines/search', medicineController.searchMedicines);

// Route to filter medicines
router.get('/medicines/filter', medicineController.filterMedicines);

// Route to sort medicines
router.get('/medicines/sort', medicineController.sortMedicines);

// Route to get cached medicines
router.get('/medicines/cache', medicineController.getCachedMedicines);

module.exports = router;
