angular.module('t3Controller',[])
	.controller('mainController',function($scope,$http){
		// Size of the table
		$scope.tsize = 10;
		$scope.tvalue = [];
		$scope.score = [];
		$scope.check = [];
		$scope.player;

		class Check {
			constructor(){
				this.tl=1;
				this.tm=1;
				this.tr=1;
				this.l=1;
				this.m=1;
				this.r=1;
				this.bl=1;
				this.bm=1;
				this.br=1;
				this.value='';
			}
		}

		$scope.init = function(){
			$scope.score = [0,0];
			for (var i = 0; i <$scope.tsize; i++) {
				$scope.check.push([]);
			}
			$scope.newGame();
		}

		$scope.newGame = function(){
			$scope.player = 1;
			$scope.tvalue = [];
			for (var i = 0; i <$scope.tsize ; i++){
				$scope.tvalue.push([]);
				for (var j = 0; j< $scope.tsize; j++){
					$scope.tvalue[i][j] = new Check();
				}
			}
		}

		$scope.setit = function(i,j){
			if ($scope.player == 1){
				$scope.tvalue[i][j].value='X';
				fillchar();
				// incVal(i,j);
				// console.log($scope.check);
				// console.log(isWin(i,j,1));
				// if (isWin(i,j,1)){
				console.log(calVal(i,j));
				
				if (calVal(i,j)==5){
					alert("win player "+$scope.player);
					$scope.score[0]++;
					$scope.newGame();
				}
				$scope.player=2;
			}
			else {
				$scope.tvalue[i][j].value='O';
				fillchar();
				// incVal(i,j);
				// console.log($scope.check);
				// console.log(isWin(i,j,1));
				// if (isWin(i,j,1)){
				console.log(calVal(i,j));
				if (calVal(i,j)==5){
					alert("win player "+$scope.player);
					$scope.score[1]++;
					$scope.newGame();
				}
				$scope.player=1;
			}

		}
		
		function calVal(i,j){
			$scope.check[i][j]=false;
			var checki1=true,checki2=true,checkj1=true,checkj2 =true;
			var blockv1=false,blockv2=false,
				blockh1=false,blockh2=false,
				blockdd1=false,blockdd2=false,
				blockdu1=false,blockdu2=false
			var h=1,v=1,dd=1,du=1;
			for (var n=1; n<=5; n++){
				if (i-n<0) checki1=false;
				if (j-n<0) checkj1=false;
				if (i+n>=$scope.tsize) checki2=false;
				if (j+n>=$scope.tsize) checkj2=false;
				// vertical
				if (checki1)
					if ($scope.tvalue[i][j].value==$scope.tvalue[i-n][j].value) v++;
					else if ($scope.tvalue[i-n][j].value!='') blockv1=true;
				if (checki2)
					if ($scope.tvalue[i][j].value==$scope.tvalue[i+n][j].value)v++;
					else blockv2=true;
				// horizontal
				if (checkj1)
					if ($scope.tvalue[i][j].value==$scope.tvalue[i][j-n].value)h++;
					else blockh1=true;
				if (checkj2)
					if ($scope.tvalue[i][j].value==$scope.tvalue[i][j+n].value)h++;
					else blockh2=true;
				// dd
				if ((checki1)&&(checkj1))
					if ($scope.tvalue[i][j].value==$scope.tvalue[i-n][j-n].value)dd++;
					else blockdd1=true;
				if ((checki2)&&(checkj2))
					if ($scope.tvalue[i][j].value==$scope.tvalue[i+n][j+n].value)dd++;
					else blockdd2=true;
				// du
				if ((checki1)&&(checkj2))
					if($scope.tvalue[i][j].value==$scope.tvalue[i-n][j+n].value)du++;
					else blockdu1=true;
				if ((checki2)&&(checkj1))
					if($scope.tvalue[i][j].value==$scope.tvalue[i+n][j-n].value)du++;
					else blockdu2=true;
			}
			var max = 0;
			if (!blockv1 && !blockv2) v++;
			if (!blockh1 && !blockh2) h++;
			if (!blockdd1 && !blockdd2) dd++;
			if (!blockdu1 && !blockdu2) dd++;

			if (v>max) max=v;
			if (h>max) max=h;
			if (dd>max) max=dd;
			if (du>max) max=du;

			return max;
		}

		function fillchar(){
			for (var i=0; i<$scope.tsize; i++)
				for (var j=0; j<$scope.tsize; j++){
					$scope.check[i][j]=true;
				}
		}
	})