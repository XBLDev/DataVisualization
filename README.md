# DataVisualization
Data visualization exercise, for now with D3.js and Python(matplotlib, seaborn etc)

Comment 21/11/2017, 8:10 pm:

Added more Mocha tests based on the original tests in thte tutorial: https://www.meteor.com/tutorials/angular/testing

For now it seems that it won't be easy, or even possible, to write tests that can test front + back end, just like when testing ReactJS/Redux + NodeJS with Jest + Enzyme, for now the input to backend can only be simulated/hardcoded, and for the front end in the todo-list the tasks contained in the controller also have to be hard-coded.

The aspects that can test with backend: mostly just function calls, but because some meteor built-in functions such as meteor.userId() cannot be called when doing the test, mock function for each real function is needed to run the test.

The asepcts that can test with frontend: certain UI element values, such as the value for a checkbox(on/off), value for an input field, or the number of li elements contained in the ul element; controller and its function calls, mostly just checking if a meteor method is called and if it's called with the appropriate parameters provided by the frontend.

Comment 21/11/2017, 2:58 pm:

Added D3/Angular_Meteor_D3, basically a combination of: 1. the beginner angular2 + meteor tutorial from: https://www.meteor.com/tutorials/angular/creating-an-app, 2. AngularJS routing with angular-route, 3. Some example D3 data visulisation from: https://bl.ocks.org/. 

The idea is that for each different page there's a different routing, and with each routing there's a different template, which is a usually just a html file with svg or div, and a controller, which is the D3 JS script that controls what the the template renders. 

For now problems include: some function calls are only available in 1 version of D3 but not in others; layout of the rendering often goes out of the container div; some examples from the website contain JS files that generate errors. 
