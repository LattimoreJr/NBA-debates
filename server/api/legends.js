const express = require('express')
const router = express.Router()

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
        res.send(await fetchLegends({approvedOnly: true}))
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
  try {
    const legend = await getLegendById(req.params.id);
    if (!legend) {
      return res.status(404).send({ error: 'Legend not found or not approved' });
    }
    res.send(legend);
  } catch (err) {
    next(err);
  }
});

router.post('/submit', isLoggedIn, async (req, res, next) => {
  try {
    const SQL = `
      INSERT INTO nba_legends (
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
      req.body.first_name, req.body.last_name, req.body.championships,
      req.body.finals_mvps, req.body.season_mvps, req.body.points,
      req.body.rebounds, req.body.assists, req.body.field_goal_percentage,
      req.body.first_team_all_nba, req.body.first_team_all_defense,
      req.body.dpoy, req.body.scoring_titles, req.body.rebounding_titles,
      req.body.assist_titles, req.body.image_url
    ];
    const response = await client.query(SQL, values);
    res.status(201).send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.get('/pending', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const SQL = 'SELECT * FROM nba_legends WHERE is_approved = false';
    const response = await client.query(SQL);
    res.send(response.rows);
  } catch (err) {
    next(err);
  }
});


router.put('/:id/approve', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const SQL = `
      UPDATE nba_legends
      SET is_approved = true
      WHERE id = $1
      RETURNING *;
    `;
    const response = await client.query(SQL, [req.params.id]);
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', isLoggedIn, isAdmin, async (req, res, next) => {
  try {
    const SQL = `
      DELETE FROM nba_legends
      WHERE id = $1
      RETURNING *;
    `;
    const response = await client.query(SQL, [req.params.id]);
    if (response.rows.length === 0) {
      return res.status(404).send({ error: 'Legend not found' });
    }
    res.send(response.rows[0]);
  } catch (err) {
    next(err);
  }
});


module.exports = router