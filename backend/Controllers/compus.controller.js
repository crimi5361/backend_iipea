const sql = require('mssql');
const dbConfig = require('../dbConfig');

exports.getAllCampus = async (req, res) => {
  try {
    await sql.connect(dbConfig);
    const result = await sql.query('SELECT * FROM Campus');
    res.json(result.recordset);
  } catch (err) {
    console.error('Erreur de récupération des campus :', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.addCampus = async (req, res) => {
  const { nom, localisation } = req.body;
  try {
    await sql.connect(dbConfig);
    const request = new sql.Request();
    request.input('nom', sql.NVarChar, nom);
    request.input('localisation', sql.NVarChar, localisation);

    await request.query(`
      INSERT INTO Campus (nom, localisation)
      VALUES (@nom, @localisation)
    `);

    res.status(201).json({ message: 'Campus ajouté avec succès' });
  } catch (err) {
    console.error("Erreur d'ajout du campus :", err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// Supprimer un campus
exports.deleteCampus = async (req, res) => {
    const { id } = req.params;
  
    try {
      await sql.connect(dbConfig);
  
      // Supprimer le campus de la base de données
      const request = new sql.Request();
      request.input('id', sql.Int, id);
  
      await request.query('DELETE FROM Campus WHERE id = @id');
  
      res.status(200).json({ message: 'Campus supprimé avec succès' });
    } catch (err) {
      console.error('Erreur lors de la suppression du campus :', err);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  };
  