const client = require('./client')
const path = require('path')
const fs = require('fs')
const { createLegends } = require('./legends')
const { createUsers } = require('./users')
const { createFavorites } = require('./favorites')

const loadImage = (filePath) => {
    return new Promise((resolve, reject) => {
      const fullPath = path.join(__dirname,filePath)
      fs.readFile(fullPath, 'base64', (err, result) => {
            if(err){
                reject(err)
            }else{
                resolve(`data:image/png;base64, ${result}`)
            }
      })
    })
}

const seed = async () => {
    const SQL = `

        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


        DROP TABLE IF EXISTS favorites;
        DROP TABLE IF EXISTS legends;
        DROP TABLE IF EXISTS users;


        CREATE TABLE users (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            username VARCHAR(100) NOT NULL UNIQUE,
            password VARCHAR(100) NOT NULL,
            is_admin BOOLEAN DEFAULT false 
        );


        CREATE TABLE legends (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            first_name TEXT NOT NULL,
            last_name TEXT NOT NULL,
            championships INTEGER DEFAULT 0,
            finals_mvps INTEGER DEFAULT 0,
            season_mvps INTEGER DEFAULT 0,
            points REAL DEFAULT 0.0,
            rebounds REAL DEFAULT 0.0,
            assists REAL DEFAULT 0.0,
            field_goal_percentage REAL DEFAULT 0.0,
            first_team_all_nba INTEGER DEFAULT 0,
            first_team_all_defense INTEGER DEFAULT 0,
            dpoy INTEGER DEFAULT 0,
            scoring_titles INTEGER DEFAULT 0,
            rebounding_titles INTEGER DEFAULT 0,
            assist_titles INTEGER DEFAULT 0,
            image_url TEXT,
            is_approved BOOLEAN DEFAULT false
        );


        CREATE TABLE favorites (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID REFERENCES users(id) ON DELETE CASCADE,
            legend_id UUID REFERENCES legends(id) ON DELETE CASCADE,
            UNIQUE (user_id, legend_id)
        );
    `
    await client.query(SQL)

    const jordanImage = await loadImage('images/jordan.png')
    const magicImage = await loadImage('images/magic.png.avif')
    const lebronImage = await loadImage('images/lebron.png.avif')
    const birdImage = await loadImage('images/bird.png.avif')
    const kobeImage = await loadImage('images/kobe.png.avif')
    const timImage = await loadImage('images/duncan.png.avif')
    const shaqImage = await loadImage('images/shaq.png.avif')
    const russellImage = await loadImage('images/russell.png.avif')
    const wiltImage = await loadImage('images/wilt.png.avif')
    const curryImage = await loadImage('images/curry.png')
    const durantImage = await loadImage('images/durant.png.avif')
    const hakeemImage = await loadImage('images/hakeem.png.webp')
    const robinsonImage = await loadImage('images/robinson.png.avif')
    const kareemImage = await loadImage('images/kareem.jpeg')
    const iversonImage = await loadImage('images/ai.png.webp')
    const maloneImage = await loadImage('images/malone.png.webp')
    const mosesImage = await loadImage('images/moses.png.webp')
    const drjImage = await loadImage('images/drj.png.webp')
    const charlesImage = await loadImage('images/chuck.png.webp')
    const dirkImage = await loadImage('images/dirk.png.avif')
   

    const [Michael, Magic, LeBron, Larry, Kobe, Tim, Shaquille, Bill, Wilt, Stephen,
        Kevin, Hakeem, David, Dirk, Kareem, Allen, Karl, Moses, Julius, Charles
     ] = await Promise.all([
        createLegends({
        first_name: 'Michael',
        last_name: 'Jordan',
        championships: 6,
        finals_mvps: 6,
        season_mvps: 5,
        points: 30.1,
        rebounds: 6.2,
        assists: 5.3,
        field_goal_percentage: 49.7,
        first_team_all_nba: 10,
        first_team_all_defense: 9,
        dpoy: 1,
        scoring_titles: 10,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: jordanImage,
        is_approved: true}),

        createLegends({
        first_name: 'Magic',
        last_name: 'Johnson',
        championships: 5,
        finals_mvps: 3,
        season_mvps: 3,
        points: 19.5,
        rebounds: 7.2,
        assists: 11.2,
        field_goal_percentage: 52.0,
        first_team_all_nba: 9,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 0,
        assist_titles: 4,
        image_url: magicImage,
        is_approved: true}),

        createLegends({
        first_name: 'Lebron',
        last_name: 'James',
        championships: 4,
        finals_mvps: 4,
        season_mvps: 4,
        points: 27.1,
        rebounds: 7.5,
        assists: 7.4,
        field_goal_percentage: 50.5,
        first_team_all_nba: 13,
        first_team_all_defense: 5,
        dpoy: 0,
        scoring_titles: 1,
        rebounding_titles: 0,
        assist_titles: 1,
        image_url: lebronImage,
        is_approved: true}),

        createLegends({
        first_name: 'Larry',
        last_name: 'Bird',
        championships: 3,
        finals_mvps: 2,
        season_mvps: 3,
        points: 24.3,
        rebounds: 10.0,
        assists: 6.3,
        field_goal_percentage: 49.6,
        first_team_all_nba: 9,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: birdImage,
        is_approved: true}),

        createLegends({
        first_name: 'Kobe',
        last_name: 'Bryant',
        championships: 5,
        finals_mvps: 2,
        season_mvps: 1,
        points: 25.0,
        rebounds: 5.2,
        assists: 4.7,
        field_goal_percentage: 44.7,
        first_team_all_nba: 11,
        first_team_all_defense: 9,
        dpoy: 0,
        scoring_titles: 2,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: kobeImage,
        is_approved: true}),

        createLegends({
        first_name: 'Tim',
        last_name: 'Duncan',
        championships: 5,
        finals_mvps: 3,
        season_mvps: 2,
        points: 19.0,
        rebounds: 10.8,
        assists: 3.0,
        field_goal_percentage: 50.6,
        first_team_all_nba: 10,
        first_team_all_defense: 8,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 1,
        assist_titles: 0,
        image_url: timImage,
        is_approved: true}),

        createLegends({
        first_name: 'Shaquille',
        last_name: 'O Neal',
        championships: 4,
        finals_mvps: 3,
        season_mvps: 1,
        points: 23.7,
        rebounds: 10.9,
        assists: 2.5,
        field_goal_percentage: 58.2,
        first_team_all_nba: 8,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 2,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: shaqImage,
        is_approved: true}),

        createLegends({
        first_name: 'Bill',
        last_name: 'Russell',
        championships: 11,
        finals_mvps: 0,
        season_mvps: 5,
        points: 15.1,
        rebounds: 22.5,
        assists: 4.3,
        field_goal_percentage: 44.0,
        first_team_all_nba: 11,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 5,
        assist_titles: 0,
        image_url: russellImage,
        is_approved: true}),

        createLegends({
        first_name: 'Wilt',
        last_name: 'Chamberlain',
        championships: 2,
        finals_mvps: 1,
        season_mvps: 4,
        points: 30.1,
        rebounds: 22.9,
        assists: 4.4,
        field_goal_percentage: 54.0,
        first_team_all_nba: 10,
        first_team_all_defense: 2,
        dpoy: 1,
        scoring_titles: 7,
        rebounding_titles: 11,
        assist_titles: 0,
        image_url: wiltImage,
        is_approved: true}),

        createLegends({
        first_name: 'Stephen',
        last_name: 'Curry',
        championships: 4,
        finals_mvps: 1,
        season_mvps: 2,
        points: 24.8,
        rebounds: 4.7,
        assists: 6.4,
        field_goal_percentage: 47.1,
        first_team_all_nba: 4,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 2,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: curryImage,
        is_approved: true}),

        createLegends({
        first_name: 'Kevin',
        last_name: 'Durant',
        championships: 2,
        finals_mvps: 2,
        season_mvps: 1,
        points: 27.3,
        rebounds: 7.0,
        assists: 4.4,
        field_goal_percentage: 50.0,
        first_team_all_nba: 6,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 4,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: durantImage,
        is_approved: true}),

        createLegends({
        first_name: 'Hakeem',
        last_name: 'Olajuwon',
        championships: 2,
        finals_mvps: 2,
        season_mvps: 1,
        points: 21.8,
        rebounds: 11.1,
        assists: 2.5,
        field_goal_percentage: 51.2,
        first_team_all_nba: 6,
        first_team_all_defense: 5,
        dpoy: 2,
        scoring_titles: 0,
        rebounding_titles: 2,
        assist_titles: 0,
        image_url: hakeemImage,
        is_approved: true}),

        createLegends({
        first_name: 'David',
        last_name: 'Robinson',
        championships: 2,
        finals_mvps: 0,
        season_mvps: 1,
        points: 21.1,
        rebounds: 10.6,
        assists: 2.5,
        field_goal_percentage: 51.8,
        first_team_all_nba: 4,
        first_team_all_defense: 4,
        dpoy: 1,
        scoring_titles: 1,
        rebounding_titles: 1,
        assist_titles: 0,
        image_url: robinsonImage,
        is_approved: true}),

        createLegends({
        first_name: 'Dirk',
        last_name: 'Nowitzki',
        championships: 1,
        finals_mvps: 1,
        season_mvps: 1,
        points: 20.7,
        rebounds: 7.5,
        assists: 2.4,
        field_goal_percentage: 47.1,
        first_team_all_nba: 4,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: dirkImage,
        is_approved: true}),

        createLegends({
        first_name: 'Kareem',
        last_name: 'Abdul-Jabbar',
        championships: 6,
        finals_mvps: 2,
        season_mvps: 6,
        points: 24.6,
        rebounds: 11.2,
        assists: 5.4,
        field_goal_percentage: 55.9,
        first_team_all_nba: 11,
        first_team_all_defense: 3,
        dpoy: 0,
        scoring_titles: 2,
        rebounding_titles: 1,
        assist_titles: 0,
        image_url: kareemImage,
        is_approved: true}),

        createLegends({
        first_name: 'Allen',
        last_name: 'Iverson',
        championships: 0,
        finals_mvps: 0,
        season_mvps: 1,
        points: 26.7,
        rebounds: 3.7,
        assists: 6.2,
        field_goal_percentage: 42.5,
        first_team_all_nba: 3,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 4,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: iversonImage,
        is_approved: true}),

        createLegends({
        first_name: 'Karl',
        last_name: 'Malone',
        championships: 0,
        finals_mvps: 0,
        season_mvps: 2,
        points: 25.0,
        rebounds: 10.6,
        assists: 3.6,
        field_goal_percentage: 51.6,
        first_team_all_nba: 11,
        first_team_all_defense: 3,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: maloneImage,
        is_approved: true}),

        createLegends({
        first_name: 'Moses',
        last_name: 'Malone',
        championships: 1,
        finals_mvps: 1,
        season_mvps: 3,
        points: 20.3,
        rebounds: 12.3,
        assists: 1.3,
        field_goal_percentage: 49.5,
        first_team_all_nba: 4,
        first_team_all_defense: 1,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 6,
        assist_titles: 0,
        image_url: mosesImage,
        is_approved: true}),

        createLegends({
        first_name: 'Julius',
        last_name: 'Erving',
        championships: 1,
        finals_mvps: 0,
        season_mvps: 2,
        points: 24.2,
        rebounds: 8.5,
        assists: 4.2,
        field_goal_percentage: 50.6,
        first_team_all_nba: 5,
        first_team_all_defense: 1,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 0,
        assist_titles: 0,
        image_url: drjImage,
        is_approved: true}),

        createLegends({
        first_name: 'Charles',
        last_name: 'Barkely',
        championships: 0,
        finals_mvps: 0,
        season_mvps: 1,
        points: 22.1,
        rebounds: 11.7,
        assists: 3.9,
        field_goal_percentage: 54.1,
        first_team_all_nba: 5,
        first_team_all_defense: 0,
        dpoy: 0,
        scoring_titles: 0,
        rebounding_titles: 1,
        assist_titles: 0,
        image_url: charlesImage,
        is_approved: true})
    ])

    

    const [Will, Test, Johnny] = await Promise.all([
        createUsers({username:'Will', password:'2redfred', is_admin: true}),
        createUsers({username:'Test', password:'1234', is_admin: false}),
        createUsers({username:'Johnny', password:'bravo2', is_admin: false})
    ])

    await Promise.all([
        createFavorites({user_id:Will.id, legend_id:Michael.id}),
        createFavorites({user_id:Will.id, legend_id:Magic.id})
        
    ])


    console.log('database seeded successfully')
  }


module.exports = {
  client,
  seed
};
