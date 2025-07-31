const express = require('express')
const router = express.Router()
const client = require('../db/client');

const {
    fetchLegends,
    createLegends,
    getLegendById
} = require('../db/legends')
const {
    isLoggedIn,
    isAdmin
} = require('./middleware')

router.get('/', async (req, res, next) => {
  try {
    const SQL = `SELECT * FROM legends WHERE is_approved = true ORDER BY last_name ASC;`;
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (error) {
    next(error);
  }
});


router.get('/pending', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const SQL = 'SELECT * FROM legends WHERE is_approved = false';
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (err) {
    console.error("Error fetching pending players:", err.message);
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const legend = await getLegendById(req.params.id);
    if (!legend) {
      return res.status(404).send({ error: 'Legend not found or not approved' });
    }
    res.send(legend);
  } catch (err) {
    console.error("Error fetching legend by ID:", err.message);
    next(err);
  }
});

router.post('/', isLoggedIn, async (req, res, next) => {
  
  const sanitizeNumber = (val) => {
    if (val === '' || val === undefined || val === null) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };
  try {
    const SQL = `
      INSERT INTO legends (
        id, first_name, last_name, championships, finals_mvps, season_mvps,
        points, rebounds, assists, field_goal_percentage,
        first_team_all_nba, first_team_all_defense, dpoy,
        scoring_titles, rebounding_titles, assist_titles,
        image_url, is_approved
      )
      VALUES (
        uuid_generate_v4(), $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        $10, $11, $12,
        $13, $14, $15,
        $16, false
      )
      RETURNING *;
    `;
    const values = [
      req.body.first_name,
      req.body.last_name,
      sanitizeNumber(req.body.championships),
      sanitizeNumber(req.body.finals_mvps),
      sanitizeNumber(req.body.season_mvps),
      sanitizeNumber(req.body.points),
      sanitizeNumber(req.body.rebounds),
      sanitizeNumber(req.body.assists),
      sanitizeNumber(req.body.field_goal_percentage),
      sanitizeNumber(req.body.first_team_all_nba),
      sanitizeNumber(req.body.first_team_all_defense),
      sanitizeNumber(req.body.dpoy),
      sanitizeNumber(req.body.scoring_titles),
      sanitizeNumber(req.body.rebounding_titles),
      sanitizeNumber(req.body.assist_titles),
      req.body.image_url || null
    ];
    const response = await client.query(SQL, values);
    res.status(201).send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.post('/submit', isLoggedIn, async (req, res, next) => {
  const sanitizeNumber = (val) => {
    if (val === '' || val === undefined || val === null) return null;
    const num = Number(val);
    return isNaN(num) ? null : num;
  };
  try {
    const SQL = `
      INSERT INTO legends (
        id, first_name, last_name, championships, finals_mvps, season_mvps,
        points, rebounds, assists, field_goal_percentage,
        first_team_all_nba, first_team_all_defense, dpoy,
        scoring_titles, rebounding_titles, assist_titles,
        image_url, is_approved
      )
      VALUES (
        uuid_generate_v4(), $1, $2, $3, $4, $5,
        $6, $7, $8, $9,
        $10, $11, $12,
        $13, $14, $15,
        $16, false
      )
      RETURNING *;
    `;
    const values = [
      req.body.first_name,
      req.body.last_name,
      sanitizeNumber(req.body.championships),
      sanitizeNumber(req.body.finals_mvps),
      sanitizeNumber(req.body.season_mvps),
      sanitizeNumber(req.body.points),
      sanitizeNumber(req.body.rebounds),
      sanitizeNumber(req.body.assists),
      sanitizeNumber(req.body.field_goal_percentage),
      sanitizeNumber(req.body.first_team_all_nba),
      sanitizeNumber(req.body.first_team_all_defense),
      sanitizeNumber(req.body.dpoy),
      sanitizeNumber(req.body.scoring_titles),
      sanitizeNumber(req.body.rebounding_titles),
      sanitizeNumber(req.body.assist_titles),
      req.body.image_url || null
    ];
    const response = await client.query(SQL, values);
    res.status(201).send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.put('/:id/approve', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const SQL = `
      UPDATE legends
      SET is_approved = true
      WHERE id = $1
      RETURNING *;
    `;
    const response = await client.query(SQL, [req.params.id]);
    if (!response.rows.length) {
      return res.status(404).send({ error: 'Legend not found' });
    }
    res.status(200).send(response.rows[0]);
  } catch (err) {
    console.error("Error approving legend:", err.message);
    next(err);
  }
});

router.delete('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const SQL = `
      DELETE FROM legends
      WHERE id = $1
      RETURNING *;
    `;
    const response = await client.query(SQL, [req.params.id]);
    if (response.rows.length === 0) {
      return res.status(404).send({ error: 'Legend not found' });
    }
    res.send(response.rows[0]);
  } catch (err) {
    console.error("Error deleting legend:", err.message);
    next(err);
  }
});

// Route for updating a legend's image URL (admin only)
router.put('/:id/image', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const { image_url } = req.body;
    if (!image_url) {
      return res.status(400).send({ error: 'Image URL is required' });
    }

    const SQL = `
      UPDATE legends
      SET image_url = $1
      WHERE id = $2
      RETURNING *;
    `;
    const response = await client.query(SQL, [image_url, req.params.id]);
    if (!response.rows.length) {
      return res.status(404).send({ error: 'Legend not found' });
    }
    res.status(200).send(response.rows[0]);
  } catch (err) {
    console.error("Error updating legend image:", err.message);
    next(err);
  }
});


module.exports = router