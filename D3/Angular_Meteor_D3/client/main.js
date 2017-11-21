import angular from 'angular';
import angularMeteor from 'angular-meteor';
import todosList from '../imports/components/todosList/todosList'; 
import '../imports/startup/accounts-config.js';
import mainPageTemplate from "../imports/components/routedPages/entryPage.html";
import redTemplate from "../imports/components/routedPages/red.html";
import greenTemplate from "../imports/components/routedPages/green.html";
import blueTemplate from "../imports/components/routedPages/blue.html";
import todolistTemplate from "../imports/components/todosListRouted/todosList.html";
import D3SimpleTemplate from "../imports/components/d3Experiments/D3Simple.html";
import d3_N_Body_II_Template from "../imports/components/d3Experiments/d3_N_Body_II.html";
import d3_CanvasDonut_Template from "../imports/components/d3Experiments/D3CanvasDonut.html";
import d3_StackedNegativeValues_Template from "../imports/components/d3Experiments/StackedNegativeValues.html";
import d3_DensityContours_Template from "../imports/components/d3Experiments/D3DensityContours.html";
import d3_ScatterplotMatrix_Template from "../imports/components/d3Experiments/D3ScatterplotMatrix.html";
import d3_ForceDirectedGraph_Template from "../imports/components/d3Experiments/D3ForceDirectedGraph.html";
import d3_Tooltip_Template from "../imports/components/d3Experiments/D3Tooltip.html";

// import d3_N_Body_II_Controller from 'controllers/d3_N_Body_II_Controller.js';

import {Tasks} from '../imports/api/tasks.js';


console.log('Page Restarted');
// console.log(todosList.name);//<---todosList

// angular.module('simple-todos', [
//   angularMeteor,
//   todosList.name,
//   'accounts.ui'
// ]);


var app = angular.module('myApp', [
  angularMeteor,
  require('angular-route'),
  'accounts.ui'

]);

app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.hashPrefix('');
}]);

app.config(function($routeProvider) {
  $routeProvider
  .when("/main", {
    // templateUrl: "<a href='#red'>Red</a>"
      // templateUrl : "routedPages/entryPage.html"
      // templateUrl : "../imports/components/routedPages/entryPage.html"
      // templateUrl : "main.html"
      templateUrl : mainPageTemplate
      
  })
  .when("/red", {
      // templateUrl : "routedPages/red.html"
      templateUrl : redTemplate
      
  })
  .when("/green", {
      // templateUrl : "routedPages/green.html"
      templateUrl : greenTemplate
      
  })
  .when("/blue", {
      // templateUrl : "routedPages/blue.html"
      templateUrl : blueTemplate
  })
  .when("/todopage", {
    // templateUrl : "routedPages/blue.html"
    templateUrl : todolistTemplate,
    controller: "todolistController"
  })
  .when("/d3Simple", {
    // templateUrl : "routedPages/blue.html"
    templateUrl : D3SimpleTemplate,
    controller: "D3SimpleController"
  })

  .when("/d3_N_Body_II", {
    // templateUrl : "routedPages/blue.html"
    templateUrl : d3_N_Body_II_Template,
    controller: "d3_N_Body_II_Controller"
  })

  .when("/d3_CanvasDonut", {
    // templateUrl : "routedPages/blue.html"
    templateUrl : d3_CanvasDonut_Template,
    controller: "d3_CanvasDonut_Controller"
  })

  .when("/d3_StackedNegativeValues", {
    // templateUrl : "routedPages/blue.html"
    templateUrl : d3_StackedNegativeValues_Template,
    controller: "d3_StackedNegativeValues_Controller"
  })
  .when("/d3_Scatterplotmatrix", {
    // templateUrl : "routedPages/blue.html"
    templateUrl : d3_ScatterplotMatrix_Template,
    controller: "d3_ScatterplotMatrix_Controller"
  })
  .when("/d3_ForceDirectedGraph", {
    // templateUrl : "routedPages/blue.html"
    templateUrl : d3_ForceDirectedGraph_Template,
    controller: "d3_ForceDirectedGraph_Controller"
  })
  .when("/d3_tooltips", {
    // templateUrl : "routedPages/blue.html"
    templateUrl : d3_Tooltip_Template,
    controller: "d3_Tooltip_Controller"
  })
  // .when("/d3_DensityContours", {
  //   // templateUrl : "routedPages/blue.html"
  //   templateUrl : d3_DensityContours_Template,
  //   controller: "d3_DensityContours_Controller"
  // })
  .otherwise({
    redirectTo: '/main'
  });
});

app.controller("d3_Tooltip_Controller", function ($scope) {
  var margin = {top: 40, right: 20, bottom: 30, left: 40},
  width = 960 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

  var formatPercent = d3.format(".0%");

  var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .1);

  var y = d3.scale.linear()
    .range([height, 0]);

  // var xAxis = d3.svg.axis()
  //   .scale(x)
  //   .orient("bottom");

  // var yAxis = d3.svg.axis()
  //   .scale(y)
  //   .orient("left")
  //   .tickFormat(formatPercent);

  var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Frequency:</strong> <span style='color:red'>" + d.frequency + "</span>";
  })

  var svg = d3.select("#tooltipdiv").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

  d3.tsv("https://s3-us-west-2.amazonaws.com/videostoconvert/d3tipbarchartdata.tsv", type, function(error, data) {
    x.domain(data.map(function(d) { return d.letter; }));
    y.domain([0, d3.max(data, function(d) { return d.frequency; })]);
  
    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        // .call(xAxis);
  
    svg.append("g")
        .attr("class", "y axis")
        // .call(yAxis)
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Frequency");
  
    svg.selectAll(".bar")
        .data(data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return x(d.letter); })
        .attr("width", x.rangeBand())
        .attr("y", function(d) { return y(d.frequency); })
        .attr("height", function(d) { return height - y(d.frequency); })
        .on('mouseover', tip.show)
        .on('mouseout', tip.hide)
  
  });

  function type(d) {
    d.frequency = +d.frequency;
    return d;
  }

});  

app.controller("d3_ForceDirectedGraph_Controller", function ($scope) {
  var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
  // console.log(width);

  var color = d3.scaleOrdinal(d3.schemeCategory20);
  
  var simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id(function(d) { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));

  d3.json("https://s3-us-west-2.amazonaws.com/videostoconvert/miserables.json", function(error, graph) {
        if (error) throw error;
        // console.log(graph);
        var link = svg.append("g")
            .attr("class", "links")
          .selectAll("line")
          .data(graph.links)
          .enter().append("line")
            .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
      
        var node = svg.append("g")
            .attr("class", "nodes")
          .selectAll("circle")
          .data(graph.nodes)
          .enter().append("circle")
            .attr("r", 5)
            .attr("fill", function(d) { return color(d.group); })
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));
      
        node.append("title")
            .text(function(d) { return d.id; });
      
        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);
      
        simulation.force("link")
            .links(graph.links);
      
        function ticked() {
          link
              .attr("x1", function(d) { return d.source.x; })
              .attr("y1", function(d) { return d.source.y; })
              .attr("x2", function(d) { return d.target.x; })
              .attr("y2", function(d) { return d.target.y; });
      
          node
              .attr("cx", function(d) { return d.x; })
              .attr("cy", function(d) { return d.y; });
        }

        function dragstarted(d) {
          if (!d3.event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        }
        
        function dragged(d) {
          d.fx = d3.event.x;
          d.fy = d3.event.y;
        }
        
        function dragended(d) {
          if (!d3.event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        }

      });
      
      
});  

app.controller("d3_ScatterplotMatrix_Controller", function ($scope) {
  var width = window.screen.width,//960
  size = width/8,//230
  padding = 20;

  var x = d3.scale.linear()
  .range([padding / 2, size - padding / 2]);

  var y = d3.scale.linear()
  .range([size - padding / 2, padding / 2]); 

  // var xAxis = d3.svg.axis()
  // .scale(x)
  // .orient("bottom")
  // .ticks(6);

  // var yAxis = d3.svg.axis()
  //   .scale(y)
  //   .orient("left")
  //   .ticks(6);

  var color = d3.scale.category10();

  d3.csv("https://s3-us-west-2.amazonaws.com/videostoconvert/flowers.csv", function(error, data) {
    if (error) throw error;
    // console.log(data.length);
    var domainByTrait = {},
      traits = d3.keys(data[0]).filter(function(d) { return d !== "species"; }),
      n = traits.length;

      traits.forEach(function(trait) {
        domainByTrait[trait] = d3.extent(data, function(d) { return d[trait]; });
      });
    
      // xAxis.tickSize(size * n);
      // yAxis.tickSize(-size * n);
      
      var svg = d3.select("#scatterplotdiv").append("svg", "#first")
      .attr("width", size * n + padding)
      .attr("height", size * n + padding)
      .append("g")
      .attr("transform", "translate(" + padding + "," + padding / 2 + ")");   
      
      svg.selectAll(".x.axis")
      .data(traits)
      .enter().append("g", "#second")
      .attr("class", "x axis")
      .attr("transform", function(d, i) { return "translate(" + (n - i - 1) * size + ",0)"; })
      .each(function(d) { 
        x.domain(domainByTrait[d]); 
        // d3.select(this).call(xAxis); 
      });

      svg.selectAll(".y.axis")
      .data(traits)
      .enter().append("g")
      .attr("class", "y axis")
      .attr("transform", function(d, i) { return "translate(0," + i * size + ")"; })
      .each(function(d) { 
        y.domain(domainByTrait[d]); 
        // d3.select(this).call(yAxis); 
      });

      var cell = svg.selectAll(".cell")
      .data(cross(traits, traits))
      .enter().append("g")
      .attr("class", "cell")
      .attr("transform", function(d) { return "translate(" + (n - d.i - 1) * size + "," + d.j * size + ")"; })
      .each(plot);

      // Titles for the diagonal.
      cell.filter(function(d) { return d.i === d.j; }).append("text")
      .attr("x", padding)
      .attr("y", padding)
      .attr("dy", ".71em")
      .text(function(d) { return d.x; });

      function plot(p) {
        var cell = d3.select(this);
    
        x.domain(domainByTrait[p.x]);
        y.domain(domainByTrait[p.y]);
    
        cell.append("rect")
            .attr("class", "frame")
            .attr("x", padding / 2)
            .attr("y", padding / 2)
            .attr("width", size - padding)
            .attr("height", size - padding);
    
        cell.selectAll("circle")
            .data(data)
          .enter().append("circle")
            .attr("cx", function(d) { return x(d[p.x]); })
            .attr("cy", function(d) { return y(d[p.y]); })
            .attr("r", 4)
            .style("fill", function(d) { return color(d.species); });
      }      

      function cross(a, b) {
        // console.log('cross called');
        var c = [], n = a.length, m = b.length, i, j;
        for (i = -1; ++i < n;) for (j = -1; ++j < m;) c.push({x: a[i], i: i, y: b[j], j: j});
        return c;
      }
      
  })    
})  

app.controller("d3_StackedNegativeValues_Controller", function ($scope) {

  var data = [
    {month: "Q1-2016", apples: 3840, bananas: 1920, cherries: -1960, dates: -400},
    {month: "Q2-2016", apples: 1600, bananas: 1440, cherries: -960, dates: -400},
    {month: "Q3-2016", apples:  640, bananas:  960, cherries: -640, dates: -600},
    {month: "Q4-2016", apples:  320, bananas:  480, cherries: -640, dates: -400}
  ];
  
  var series = d3.stack()
      .keys(["apples", "bananas", "cherries", "dates"])
      .offset(d3.stackOffsetDiverging)
      (data);
  
  var svg = d3.select("svg"),
      margin = {top: 20, right: 30, bottom: 30, left: 60},
      width = +svg.attr("width"),
      height = +svg.attr("height");
  
  var x = d3.scaleBand()
      .domain(data.map(function(d) { return d.month; }))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.1);
  
  var y = d3.scaleLinear()
      .domain([d3.min(series, stackMin), d3.max(series, stackMax)])
      .rangeRound([height - margin.bottom, margin.top]);
  
  var z = d3.scaleOrdinal(d3.schemeCategory10);
  svg.append("g")
  .selectAll("g")
  .data(series)
  .enter().append("g")
    .attr("fill", function(d) { return z(d.key); })
  .selectAll("rect")
  .data(function(d) { return d; })
  .enter().append("rect")
    .attr("width", x.bandwidth)
    .attr("x", function(d) { return x(d.data.month); })
    .attr("y", function(d) { return y(d[1]); })
    .attr("height", function(d) { return y(d[0]) - y(d[1]); })

  svg.append("g")
      .attr("transform", "translate(0," + y(0) + ")")
      .call(d3.axisBottom(x));

  svg.append("g")
      .attr("transform", "translate(" + margin.left + ",0)")
      .call(d3.axisLeft(y));

  function stackMin(serie) {
    return d3.min(serie, function(d) { return d[0]; });
  }
  
  function stackMax(serie) {
    return d3.max(serie, function(d) { return d[1]; });
  }
  
});
  
app.controller("d3_DensityContours_Controller", function ($scope) {
  // $scope.svg = d3.select("svg");
  // $scope.width = +$scope.svg.attr("width");
  // $scope.height = +$scope.svg.attr("height");
  // $scope.margin = {top: 20, right: 30, bottom: 30, left: 40};
  var svg = d3.select("svg"),
  width = +svg.attr("width"),  
  height = +svg.attr("height"),
  margin = {top: 20, right: 30, bottom: 30, left: 40};
  // console.log(width);
  // console.log(height);
  var x = d3.scaleLinear()
  .rangeRound([margin.left, width - margin.right]);

  var y = d3.scaleLinear()
  .rangeRound([height - margin.bottom, margin.top]);

  d3.tsv("faithful.tsv", function(d) {
    d.eruptions = +d.eruptions;
    d.waiting = +d.waiting;
    return d;
  }, function(error, faithful) {
    if (error) throw error;
  
    x.domain(d3.extent(faithful, function(d) { return d.waiting; })).nice();
    y.domain(d3.extent(faithful, function(d) { return d.eruptions; })).nice();
  
    svg.append("g", "g")
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
      .selectAll("path")
      .data(d3.contourDensity()
          .x(function(d) { return x(d.waiting); })
          .y(function(d) { return y(d.eruptions); })
          .size([width, height])
          .bandwidth(40)
        (faithful))
      .enter().append("path")
        .attr("d", d3.geoPath());
  
    svg.append("g")
        .attr("stroke", "white")
      .selectAll("circle")
      .data(faithful)
      .enter().append("circle")
        .attr("cx", function(d) { return x(d.waiting); })
        .attr("cy", function(d) { return y(d.eruptions); })
        .attr("r", 2);
  
    svg.append("g")
        .attr("transform", "translate(0," + (height - margin.bottom) + ")")
        .call(d3.axisBottom(x))
      .select(".tick:last-of-type text")
      .select(function() { return this.parentNode.appendChild(this.cloneNode()); })
        .attr("y", -3)
        .attr("dy", null)
        .attr("font-weight", "bold")
        .text("Idle (min.)");
  
    svg.append("g")
        .attr("transform", "translate(" + margin.left + ",0)")
        .call(d3.axisLeft(y))
      .select(".tick:last-of-type text")
      .select(function() { return this.parentNode.appendChild(this.cloneNode()); })
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text("Erupting (min.)");
  });
  
});


app.controller("d3_CanvasDonut_Controller", function ($scope) {
  $scope.canvas = document.querySelector("canvas"),
  $scope.context = $scope.canvas.getContext("2d");

  $scope.width = $scope.canvas.width,
  $scope.height = $scope.canvas.height,
  // console.log($scope.width);
  // console.log($scope.width);
  $scope.radius = Math.min($scope.width, $scope.height) / 2;

  $scope.colors = ["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];

  $scope.arc = d3.arc()
    .outerRadius($scope.radius - 10)
    .innerRadius($scope.radius - 70)
    .context($scope.context);

  $scope.labelArc = d3.arc()
    .outerRadius($scope.radius - 40)
    .innerRadius($scope.radius - 40)
    .context($scope.context);

  $scope.pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.population; });

  $scope.context.translate($scope.width / 2, $scope.height / 2);
    

    //$scope.force = function() {
  $scope.drawDonut = function(){  
    d3.tsv("https://s3-us-west-2.amazonaws.com/videostoconvert/CanvasDonutdata.tsv", function(d) {
      // console.log(d);
      // console.log(d.population);
      d.population = +d.population;
      return d;
    }, function(error, data) {
      if (error) 
      {
        // console.log('error');
        throw error;
      }
      // console.log(data.length);
      var arcs = $scope.pie(data);
    
      arcs.forEach(function(d, i) {
        $scope.context.beginPath();
        $scope.arc(d);
        $scope.context.fillStyle = $scope.colors[i];
        $scope.context.fill();
      });
    
      $scope.context.beginPath();
      arcs.forEach($scope.arc);
      $scope.context.strokeStyle = "#fff";
      $scope.context.stroke();
    
      $scope.context.textAlign = "center";
      $scope.context.textBaseline = "middle";
      $scope.context.fillStyle = "#000";
      arcs.forEach(function(d) {
        // console.log('d');
        var c = $scope.labelArc.centroid(d);
        // console.log(d.data.age)
        $scope.context.fillText(d.data.age, c[0], c[1]);
      });
    })
  };

  $scope.drawDonut();
    


});  


app.controller("d3_N_Body_II_Controller", function ($scope) {
  $scope.canvas = document.querySelector("canvas"),
  $scope.context = $scope.canvas.getContext("2d"),
  $scope.width = $scope.canvas.width,
  $scope.height = $scope.canvas.height;
  // console.log($scope.width);
  // console.log($scope.height);
  $scope.n = 400,
  $scope.pi = Math.PI,
  $scope.tau = 2 * $scope.pi;

  $scope.nodes = d3.range($scope.n).map(function() {
  var r = Math.random() * $scope.width / 3,
      a = Math.random() * $scope.tau,
      x = $scope.width / 2 + r * Math.cos(a),
      y = $scope.height / 2 + r * Math.sin(a);
  return {
    x: x,
    y: y,
    vx: ($scope.height / 2 - y) * 0.006,
    vy: (x - $scope.width / 2) * 0.006
  };
  });

  // $scope.force = d3.forceSimulation($scope.nodes)
  // .drag(0)
  // .alphaDecay(0)
  // .force("charge", d3.forceManyBody().strength(0.02))
  // .force("center", d3.forceCenter($scope.width / 2, $scope.height / 2))
  // .on("tick", $scope.ticked);

  $scope.force = function() {
    d3.forceSimulation($scope.nodes)
    .drag(0)
    .alphaDecay(0)
    .force("charge", d3.forceManyBody().strength(0.02))
    .force("center", d3.forceCenter($scope.width / 2, $scope.height / 2))
    .on("tick", $scope.ticked);
  }

  $scope.stroke = d3.scale.linear()
  .domain([0, 10])
  .range(["magenta", "yellow"]);
  
  $scope.ticked = function() {
    $scope.context.clearRect(0, 0, $scope.width, $scope.height);
    $scope.context.lineWidth = 4;
    $scope.context.lineCap = "square";
  
    for (var i = 0, node, vx, vy; i < $scope.n; ++i) {
      node = $scope.nodes[i];
      $scope.context.beginPath();
      $scope.context.moveTo(node.x, node.y);
      $scope.context.lineTo(node.x + node.vx * 3, node.y + node.vy * 3);
      $scope.context.strokeStyle = $scope.stroke(node.vx * node.vx + node.vy * node.vy);
      $scope.context.stroke();
    }
  }    

  $scope.force();
  
});  


app.controller("D3SimpleController", function ($scope) {
  // $scope.viewModel(this);
  $scope.chart_data = "40, 80, 15, 60, 23, 95";
  $scope.updateChart = function() {
    var index = 0;
    var data = angular.fromJson("[" + $scope.chart_data + "]");
    var bar_width = 500 / (data.length); 

    /* Clear out the existing elements. */
    d3.selectAll('.chart').selectAll('div').remove();

    d3.select(".chart")
        .selectAll("div")
        .data(data)
        .enter().append("div")
        .style("width", function(d) { return bar_width + "px"; })
        .style("height", function(d) { return d + "%"; })
        .style("left", function(d) { return (index++) * (bar_width + 2) + "px"; }); /* +2 as we have a 1px margin*/
  }

  /* Show the chart on load. */
  $scope.updateChart();

});

app.controller("todolistController", function ($scope) {
  // $scope.msg = "I love Paris";
  $scope.viewModel(this);
  // $scope.incompleteCount = 12;
  $scope.subscribe('tasks');
  $scope.hideCompleted = false;

  $scope.helpers({
    tasks() {
        const selector = {};

        if($scope.getReactively('hideCompleted'))
        {
            selector.checked = {
                $ne: true
            };
        }
    // Show newest tasks at the top
        return Tasks.find(selector, {
            sort: {
            createdAt: -1
            }
        });
    },

    incompleteCount() {
        return Tasks.find({
          checked: {
            $ne: true
          }
        }).count();
    },

    currentUser()
    {
        return Meteor.user();
    },

    // addTask(newTask) {
    //   Meteor.call('tasks.insert', newTask);
    //   $scope.newTask = '';
    // },
    // setChecked(task) {
    //   Meteor.call('tasks.setChecked', task._id, !task.checked);
    // },

    // removeTask(task) {
    //     Meteor.call('tasks.remove', task._id);
    // },

    // setPrivate(task){
    //     Meteor.call('tasks.setPrivate', task._id, !task.private);
    // }


  });

  $scope.addTask = function(newTask){
    Meteor.call('tasks.insert', newTask);
    $scope.newTask = '';  
  }
  $scope.setChecked = function(task){
    Meteor.call('tasks.setChecked', task._id, !task.checked);
  }
  $scope.removeTask = function(task){
    Meteor.call('tasks.remove', task._id);
  }
  $scope.setPrivate = function(task){
    Meteor.call('tasks.setPrivate', task._id, !task.private);
  }  
  // $scope.addTask(newTask) 
  // {
  //   Meteor.call('tasks.insert', $scope.newTask);
  //   $scope.newTask = '';
  // }
  // $scope.setChecked(task) 
  // {
  //   Meteor.call('tasks.setChecked', task._id, !task.checked);
  // }
  
//}





});