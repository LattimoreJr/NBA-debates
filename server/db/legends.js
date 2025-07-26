const client = require('./client')
const {v4} = require('uuid')
const uuidv4 = v4

const createLegends = async (legend) => {
        const SQL = `
            INSERT INTO legends (
                id, first_name, last_name, championships, finals_mvps, season_mvps,
                points, rebounds, assists, field_goal_percentage, first_team_all_nba,
                first_team_all_defense, dpoy, scoring_titles, rebounding_titles, assist_titles,
                image_url, is_approved) 
            VALUES (
                $1, $2, $3, $4, $5, $6, $7,
                $8, $9, $10, $11, $12, $13,
                $14, $15, $16, $17, $18)
            RETURNING *    

        `
        const values = [
            uuidv4(),
            legend.first_name,
            legend.last_name,
            legend.championships,
            legend.finals_mvps,
            legend.season_mvps,
            legend.points,
            legend.rebounds,
            legend.assists,
            legend.field_goal_percentage,
            legend.first_team_all_nba,
            legend.first_team_all_defense,
            legend.dpoy,
            legend.scoring_titles,
            legend.rebounding_titles,
            legend.assist_titles,
            legend.image_url,
            legend.is_approved

        ]
        const response = await client.query(SQL, values)
        return response.rows[0]
    
    
}

const fetchLegends = async ({ approvedOnly } = {}) => {
    let SQL = `
        SELECT *
        FROM legends
    `;
    if (approvedOnly) {
        SQL += ` WHERE is_approved = true`;
    }
    const response = await client.query(SQL);
    return response.rows;
};

module.exports = {
    createLegends,
    fetchLegends
}