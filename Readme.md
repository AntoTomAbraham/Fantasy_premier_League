Installation

1.Clone the repository<br />
2.npm install<br />
3.Paste your mongoDB connection URL<br />
4.Run the below 2 Post request for bulk uploading teams and players<br />
  http://localhost:3000/script/uploadTeam <br />
  http://localhost:3000/script/UploadPlayers <br />
4.npm start<br />

Functionalities

1.Authentication <br />
2.Create Fantasy Team<br />
3.Get my fantasy team<br />
4.view all fantasy team<br />
5.View Players<br />
6.View Players by position<br />
7.View Player by ID<br />
8.View Players by rating<br />
9.Update team<br />
10.Update team rating<br />
11.Bulk upload Teams<br />
12.Bulk upload Players<br />

Routes

1.http://localhost:3000 <br />
2.http://localhost:3000/auth/signup <br />
3.http://localhost:3000/auth/signin <br />
4.http://localhost:3000/script/uploadTeam <br />
5.http://localhost:3000/script/UploadPlayers <br />
6.http://localhost:3000/player/Players <br />
7.http://localhost:3000/player/Players/CF <br />
8.http://localhost:3000/team/teams <br />
9.http://localhost:3000/team/players/:id <br />
10.http://localhost:3000/team/team/:id <br />
11.http://localhost:3000/player/Players/:id <br />
12.http://localhost:3000/player/highestRating <br />
13.http://localhost:3000/fantasyTeam/create <br />
14.http://localhost:3000/fantasyTeams <br />
15.http://localhost:3000/fantasyTeam/:id <br />
16.http://localhost:3000/fantasyTeams <br />
17.http://localhost:3000/fantasyTeam/getmyTeam <br />
18.http://localhost:3000/fantasygame/updateRate <br />