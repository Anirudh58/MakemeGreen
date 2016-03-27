var app = angular.module('mgApp', []);

app.controller('MainController', ['$scope',
    function($scope){
        var vm = this;

        vm.dimension=0;
        vm.grid=[];
        vm.array=[];
        vm.clicks=0;
        vm.difficulty="";
        vm.GameDone = false;

        vm.initialize = function() {
            $('#myModal').modal({ show: false})
            console.log(vm.dimension);
            for (var i = 0; i < vm.dimension; i++) {
                vm.array.push(0);
            }
            for (var i = 0; i < vm.dimension; i++) {
                vm.grid.push(vm.array);
            }
            console.log(vm.grid);
            vm.drawBoard();
            triggerRandomClicks();
            vm.clickFunc();
        };

        vm.drawBoard = function(){
            //var lastClicked;
            var grid = clickableGrid(vm.dimension, vm.dimension, function (el, row, col, i) {
                console.log("You clicked on element:", el);
                console.log("You clicked on row:", row);
                console.log("You clicked on col:", col);

                if(isGameDone()){
                    vm.GameDone = true;
                    $('#myModal').modal('show');

                    //do popup
                }
            });

            document.body.appendChild(grid);

            function clickableGrid(rows, cols, callback) {
                var i = 0;
                var grid = document.createElement('table');
                grid.className = 'grid';
                $(grid).attr('id', 'biggrid');
                for (var r = 0; r < rows; ++r) {
                    var tr = grid.appendChild(document.createElement('tr'));
                    for (var c = 0; c < cols; ++c) {
                        var cell = tr.appendChild(document.createElement('td'));
                        cell.className = 'green';
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
        };

        vm.clickFunc = function(){
            document.getElementById('biggrid').addEventListener("click", function(){
                if(!GameDone){
                    vm.clicks++;
                }
                $scope.$apply();
                console.log('table clicked ', vm.clicks);
            });
        };

        var triggerRandomClicks = function(){
            var grid = document.getElementById('biggrid');

            console.log('grid ka children ', $(grid).children());
            console.log('children ka children ', $(grid).children().children().eq(10));

            var times;

            switch(vm.difficulty){
                case 'Easy': times = 10; break;
                case 'Medium': times = 12; break;
                case 'Difficult': times = 14; break;
            }

            for(var i=0;i<times;i++){
                var temp = Math.floor(Math.random()*63);
                console.log('randomly clicked', temp);
                $(grid).children().children().eq(temp).click();
            }

        };

        function isGameDone(){
            var grid = document.getElementById('biggrid');

            var flag=0;

            for(var i=0; i<vm.dimension*vm.dimension; i++){
                if($(grid).children().children().eq(i).attr('class') == 'red'){
                    flag=1;
                }
            }

            if(flag==0){
                console.log('game over');
                return true;
            }
            else {
                console.log('game on!');
                return false;
            }
        }

    }
]);

