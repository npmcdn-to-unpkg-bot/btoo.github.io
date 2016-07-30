portfolio.directive("bubbleGradient", [/*"ColorService",*/
    function(/*ColorService*/) {
        return {
            restrict: 'AE',
            // templateUrl: 'js/directives/bubble-gradient/bubble-gradient.html',
            link: function(scope, element, attr, ctrl) {

                var bg = $('<canvas id="bubble-gradient" width="'+element.width()+'" height="'+element.height()+'"></canvas>').css({
                    'z-index': 0,
                    'position': 'absolute'
                });
                element.append(bg);

                console.log(scope, element, this);
                var mainCanvas = document.querySelector("#bubble-gradient");
                var mainContext = mainCanvas.getContext("2d");

                var canvasWidth = mainCanvas.width;
                var canvasHeight = mainCanvas.height;

                // empty the canvas
                mainContext.clearRect(0, 0, canvasWidth, canvasHeight);

                // color in the background of the canvas
                mainContext.fillStyle = "#EEEEEE";
                mainContext.fillRect(0, 0, canvasWidth, canvasHeight);

                var Circle = function(x, y, full) { //x,y distance from top right; full is radius when fully grown
                    this.x = x;
                    this.y = y;
                    this.radius = 0;
                    this.angle = 0;
                    this.full = full;
                }
                Circle.prototype.grow = function() {
                    mainContext.beginPath();

                    this.radius = this.full * Math.abs(Math.sin(this.angle));
                    mainContext.arc(canvasWidth - this.x, this.y, this.radius, 0, Math.PI * 2, false);
                    mainContext.closePath();

                    // color in the circle
                    mainContext.fillStyle = "#006699";
                    mainContext.fill();

                    this.angle += .01;

                    // circle has not reached full radius length
                    if (this.radius < this.full) return false;
                    else return true;
                };

                var x, y, xmax, ymin, interval, xincrement, yincrement;
                x = y = xmax = ymin = 0;
                interval = 10;
                xincrement = canvasHeight/5;
                yincrement = canvasHeight/5;
                var bubble = setInterval(() => {
                            var circle = new Circle(x, y, canvasWidth/5);
                            var animateCircle = setInterval(() => {
                                if (circle.grow()) clearInterval(animateCircle);
                            }, 1);

                            if (x >= canvasWidth && y >= canvasHeight) { //filled up canvas
                                console.log('stopping');
                                clearInterval(bubble);
                            }
                            else if (x <= 0 || y >= canvasHeight) {
                                if (xmax < canvasWidth) {
                                    xincrement-=5;
                                    xmax += xincrement;
                                }
                                else {
                                    ymin += yincrement;
                                }
                                y = ymin;
                                x = xmax;
                            }
                            else {
                                x -= xincrement;
                                y += yincrement;
                            }

                            // interval+=10;
                            // if(interval>2) interval--;
                        }, interval
                );

            }
        };
    }
]);
