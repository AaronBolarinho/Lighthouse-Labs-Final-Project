// Application entrypoint.

// Load up the application styles
require("../styles/application.scss");

// Render the top-level React component
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import 'bulma/css/bulma.css';
import '../node_modules/bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js';
import '../node_modules/bulma-extensions/bulma-carousel/dist/css/bulma-carousel.min.css';

//import bulmaCarousel from './node_modules/bulma-extensions/bulma-carousel/dist/bulma-carousel.min.js';

ReactDOM.render(<App />, document.getElementById('react-root'));
//var carousels = bulmaCarousel.attach(); // carousels now contains an array of all Carousel instances

