export function d3_N_Body_II_Controller($scope) {
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
  
    $scope.stroke = d3.scaleLinear()
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
    
  }