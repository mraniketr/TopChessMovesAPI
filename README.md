# TopChessMovesAPI
 HackerEarth Hiring Challenge Submission - Aniket Rai


# HackerEarth Event URL 
https://assessment.hackerearth.com/challenges/hiring/leadschool-sde-nodejs-and-sde-golang-hiring-challenge/

# Problem Statement

1. Scrape data every time from https://www.chessgames.com/chessecohelp.html
2. Create api
- GET /
   To get all the data from source website
- GET /<CODE>
   To get all the data about the current code
 - GET/<CODE>/move1/move2/..../moven
   The API Should respond with next move according to the Data ~ Variable Path.
 - Cache the response to 3minutes
