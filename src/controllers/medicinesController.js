const Medicine = require('../models/medicines');
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log('Redis client error:', err);
});

module.exports = {
  addMedicine: async (req, res) => {
    try {
      const { name, price, discountPrice, quantity, manufacturer, imageUrl } = req.body;
      if (!name || !price || !quantity || !manufacturer) {
        return res.status(400).json({ status: false, message: "Missing required fields" });
      }

      const newMedicine = new Medicine({
        name, price, discountPrice, quantity, manufacturer, imageUrl
      });

      await newMedicine.save();
      // Clear cache after adding new medicine
      client.del('medicines');
      res.status(201).json({ status: true, message: "Medicine has been successfully created" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getMedicineById: async (req, res) => {
    const id = req.params.id;
    try {
      const medicine = await Medicine.findById(id);
      if (!medicine) {
        return res.status(404).json({ status: false, message: "Medicine not found" });
      }
      res.status(200).json(medicine);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getAllMedicines: async (req, res) => {
    try {
      client.get('medicines', async (err, data) => {
        if (err) throw err;

        if (data) {
          res.status(200).json(JSON.parse(data));
        } else {
          const medicines = await Medicine.find();
          client.setex('medicines', 600, JSON.stringify(medicines)); // Cache for 10 minutes
          res.status(200).json(medicines);
        }
      });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  updateMedicine: async (req, res) => {
    const id = req.params.id;
    try {
      const { name, price, discountPrice, quantity, manufacturer, imageUrl } = req.body;
      const updatedData = { name, price, discountPrice, quantity, manufacturer, imageUrl };

      const updatedMedicine = await Medicine.findByIdAndUpdate(id, updatedData, { new: true });
      if (!updatedMedicine) {
        return res.status(404).json({ status: false, message: "Medicine not found" });
      }

      // Clear cache after updating medicine
      client.del('medicines');
      res.status(200).json({ status: true, message: "Medicine has been successfully updated", updatedMedicine });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  deleteMedicine: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedMedicine = await Medicine.findByIdAndDelete(id);
      if (!deletedMedicine) {
        return res.status(404).json({ status: false, message: "Medicine not found" });
      }
      // Clear cache after deleting medicine
      client.del('medicines');
      res.status(200).json({ status: true, message: "Medicine has been successfully deleted" });
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  searchMedicines: async (req, res) => {
    const query = req.query.q;
    try {
      const medicines = await Medicine.find({ name: { $regex: query, $options: 'i' } });
      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  filterMedicines: async (req, res) => {
    const filters = req.query;
    try {
      const medicines = await Medicine.find(filters);
      res.status(200).json(medicines);
    } catch (error) {
      res.status (500).json({ status: false, message: error.message });
    }
  },

  sortMedicines: async (req, res) => {
    const { sortBy, order } = req.query;
    try {
      const medicines = await Medicine.find().sort({ [sortBy]: order === 'desc' ? -1 : 1 });
      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ status: false, message: error.message });
    }
  },

  getCachedMedicines: async (req, res) => {
    client.get('medicines', async (err, data) => {
      if (err) throw err;

      if (data) {
        res.status(200).json(JSON.parse(data));
      } else {
        try {
          const medicines = await Medicine.find();
          client.setex('medicines', 600, JSON.stringify(medicines));
          res.status(200).json(medicines);
        } catch (error) {
          res.status(500).json({ status: false, message: error.message });
        }
      }
    });
  }
};
