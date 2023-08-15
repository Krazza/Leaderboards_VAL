# Valorant Leaderboards
## Description
A personal MERN-stack project created to compare in-game ratings and player statistics of our small friend group. Build using <a href="https://github.com/Henrik-3/unofficial-valorant-api/tree/main">unofficial game API</a> and official<a href="https://www.riotgames.com/en/DevRel/valorant-api-launch"> Riot Games API</a>.

### In Detail

MongoDB stores the unique player identifiers which are needed to make game-related requests. Each time user visits the leaderboard page, a request (using player identifiers) fetching player data from the backend is made. If cache data exists, server returns it in the response, otherwise, a request to Henrik API is made. Once frontend has the required data, it is displayed on the leaderboard.

### Technologies 
* JavaScript
* React (functional components, react-router-dom, react-bootstrap)
* Node.js (node-cache, express, express-async-errors, mongoose)
* MongoDB

## Future goals
In the future, I plan to contact <a href="https://www.riotgames.com/en/DevRel/valorant-api-launch">Riot Games</a> in order to inquire a permission for developing my idea further. I want to create more detailed infographics of player statistics and an in-game store visualistion for logged in users of my application.
