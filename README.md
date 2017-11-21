# DataVisualization
Data visualization exercise, for now with D3.js and Python(matplotlib, seaborn etc)

Comment 21/11/2017, 2:58 pm:

Added D3/Angular_Meteor_D3, basically a combination of: 1. the beginner angular2 + meteor tutorial from: https://www.meteor.com/tutorials/angular/creating-an-app, 2. AngularJS routing with angular-route, 3. Some example D3 data visulisation from: https://bl.ocks.org/. 

The idea is that for each different page there's a different routing, and with each routing there's a different template, which is a usually just a html file with svg or div, and a controller, which is the D3 JS script that controls what the the template renders. 

For now problems include: some function calls are only available in 1 version of D3 but not in others; layout of the rendering often goes out of the container div; some examples from the website contain JS files that generate errors. 
