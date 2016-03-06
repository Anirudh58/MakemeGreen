var app = angular.module('mgApp', []);

app.controller('MainController', ['$scope',
    function($scope){
        var vm = this;

        vm.dimension=0;
        vm.grid=[];
        vm.array=[];
        vm.initialize = function() {
            console.log(vm.dimension);

            for (var i = 0; i < vm.dimension; i++) {
                vm.array.push(0);
            }

            for (var i = 0; i < vm.dimension; i++) {
                vm.grid.push(vm.array);
            }

            console.log(vm.grid);


            var lastClicked;
            var grid = clickableGrid(vm.dimension, vm.dimension, function (el, row, col, i) {
                console.log("You clicked on element:", el);
                console.log("You clicked on row:", row);
                console.log("You clicked on col:", col);
                console.log("You clicked on item #:", i);

                console.log(el.innerHTML);
                //el.className = 'clicked';
                if(el.innerHTML == 1){
                    el.className = 'green';
                }
                else{
                    el.className = 'red';
                }

                /*if (lastClicked) lastClicked.className = '';
                lastClicked = el;*/
            });

            document.body.appendChild(grid);

            function clickableGrid(rows, cols, callback) {
                var i = 0;
                var grid = document.createElement('table');
                grid.className = 'grid';
                for (var r = 0; r < rows; ++r) {
                    var tr = grid.appendChild(document.createElement('tr'));
                    for (var c = 0; c < cols; ++c) {
                        var cell = tr.appendChild(document.createElement('td'));
                        cell.innerHTML = vm.grid[r][c];
                        cell.className = 'red';
                        cell.addEventListener('click', (function (el, r, c, i) {
                            return function () {
                                vm.grid[r][c] = 1-vm.grid[r][c];

                                el.innerHTML=vm.grid[r][c];
                                callback(el, r, c, i);
                            }
                        })(cell, r, c, i), false);
                    }
                }
                return grid;
            }
        }
    }
]);

