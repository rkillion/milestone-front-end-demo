# Milestone Front End Demo

To start the app, run `npm i && npm start` in the project directory.

The API is set to http://localhost:4000/. If you open the backend on a different server port, simply change 4000 in the apiAddress string found in /apiAddress.js of the project directory to the port number you want.

There is not currently an interface to switch users or create users. Two users will be generated with the seed data. To view the app from a different users perspective than the default (user_id: 1), change line 17 in /App.js to the user id you want to view (either 1 or 2).

## Extra Node Packages Used
(Styled Components) styled-components
(Material UI) @mui/material @emotion/react @emotion/styled @mui/icons-material
(Carousel) pure-react-carousel
(React Router DOM) react-router-dom