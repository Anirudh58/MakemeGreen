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


            //var lastClicked;
            var grid = clickableGrid(vm.dimension, vm.dimension, function (el, row, col, i) {
                console.log("You clicked on element:", el);
                console.log("You clicked on row:", row);
                console.log("You clicked on col:", col);
                console.log("You clicked on item #:", i);

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
                        //cell.innerHTML = vm.grid[r][c];
                        cell.className = 'red';
                        cell.addEventListener('click', (function (el, r, c, i) {
                            return function () {
                                vm.grid[r][c] = 1-vm.grid[r][c];
                                if(c+1<vm.dimension){
                                    vm.grid[r][c+1] = 1-vm.grid[r][c+1];
                                }
                                if(c-1>=0){
                                    vm.grid[r][c-1] = 1-vm.grid[r][c-1];
                                }
                                if(r+1<vm.dimension){
                                    vm.grid[r+1][c] = 1-vm.grid[r+1][c];
                                }
                                if(r-1>=0){
                                    vm.grid[r-1][c] = 1-vm.grid[r-1][c];
                                }

                                //$(el).html(vm.grid[r][c]);
                                if($(el).attr('class') == 'red'){
                                    $(el).attr('class', 'green');
                                }
                                else{
                                    $(el).attr('class', 'red');
                                }

                                if($(el).next()){
                                    if(c+1<vm.dimension){
                                        //$(el).next().html(vm.grid[r][c+1]);
                                    }
                                    if($(el).next().attr('class') == 'red'){
                                        $(el).next().attr('class','green');
                                    }
                                    else{
                                        $(el).next().attr('class','red');
                                    }
                                }

                                if($(el).prev()){
                                    if(c-1>=0){
                                        //$(el).prev().html(vm.grid[r][c-1]);
                                    }
                                    if($(el).prev().attr('class') == 'red'){
                                        $(el).prev().attr('class','green');
                                    }
                                    else{
                                        $(el).prev().attr('class','red');
                                    }
                                }

                                //console.log('plus 8', $(el).nextAll().eq(3));

                                if($(el).parent().prev().children().eq(c) != null){
                                    if(r+1<vm.dimension){
                                        //$(el).parent().prev().children().eq(c).html(vm.grid[r+1][c]);
                                    }
                                    if($(el).parent().prev().children().eq(c).attr('class') == 'red'){
                                        $(el).parent().prev().children().eq(c).attr('class', 'green');
                                    }
                                    else{
                                        $(el).parent().prev().children().eq(c).attr('class', 'red');
                                    }
                                }

                                if($(el).parent().next().children().eq(c) != null){
                                    if(r-1>=0){
                                        //$(el).parent().next().children().eq(c).html(vm.grid[r-1][c]);
                                    }
                                    if($(el).parent().next().children().eq(c).attr('class') == 'red'){
                                        $(el).parent().next().children().eq(c).attr('class', 'green');
                                    }
                                    else{
                                        $(el).parent().next().children().eq(c).attr('class', 'red');
                                    }
                                }

                                /*el.nextSibling.className='green';
                                el.previousSibling.className='green';*/
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

