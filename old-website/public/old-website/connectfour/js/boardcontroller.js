'use strict';
/**
* Controller for the game board. Keeps track of the state of each
* space and the current move number. Also checks if a move was a
* winning move and resets the board when the new game button is
* clicked.
*/
app.controller('BoardController',
	function($scope, $element) {
		$scope.gameCount = 0;
		$scope.colFull = [false, false, false, false, false, false, false];
		$scope.emptyPos = [5,5,5,5,5,5,5];
		$scope.boardData = [
			[
				{"col":0, "row":0, "class":"circle"},
				{"col":0, "row":1, "class":"circle"},
				{"col":0, "row":2, "class":"circle"},
				{"col":0, "row":3, "class":"circle"},
				{"col":0, "row":4, "class":"circle"},
				{"col":0, "row":5, "class":"circle"}
			], 
			[
				{"col":1, "row":0, "class":"circle"},
				{"col":1, "row":1, "class":"circle"},
				{"col":1, "row":2, "class":"circle"},
				{"col":1, "row":3, "class":"circle"},
				{"col":1, "row":4, "class":"circle"},
				{"col":1, "row":5, "class":"circle"}
			],
			[
				{"col":2, "row":0, "class":"circle"},
				{"col":2, "row":1, "class":"circle"},
				{"col":2, "row":2, "class":"circle"},
				{"col":2, "row":3, "class":"circle"},
				{"col":2, "row":4, "class":"circle"},
				{"col":2, "row":5, "class":"circle"}
			],
			[
				{"col":3, "row":0, "class":"circle"},
				{"col":3, "row":1, "class":"circle"},
				{"col":3, "row":2, "class":"circle"},
				{"col":3, "row":3, "class":"circle"},
				{"col":3, "row":4, "class":"circle"},
				{"col":3, "row":5, "class":"circle"}
			],
			[
				{"col":4, "row":0, "class":"circle"},
				{"col":4, "row":1, "class":"circle"},
				{"col":4, "row":2, "class":"circle"},
				{"col":4, "row":3, "class":"circle"},
				{"col":4, "row":4, "class":"circle"},
				{"col":4, "row":5, "class":"circle"}
			],
			[
				{"col":5, "row":0, "class":"circle"},
				{"col":5, "row":1, "class":"circle"},
				{"col":5, "row":2, "class":"circle"},
				{"col":5, "row":3, "class":"circle"},
				{"col":5, "row":4, "class":"circle"},
				{"col":5, "row":5, "class":"circle"}
			],
			[
				{"col":6, "row":0, "class":"circle"},
				{"col":6, "row":1, "class":"circle"},
				{"col":6, "row":2, "class":"circle"},
				{"col":6, "row":3, "class":"circle"},
				{"col":6, "row":4, "class":"circle"},
				{"col":6, "row":5, "class":"circle"}
			]
		];

		$scope.hideIntro = function() {
			console.log('click start');
			$element.children('#intro-bkgd').fadeOut();
			$element.children('#intro').fadeOut();
			// $scope.updateCurrPlayer();
		}

		$scope.updateCurrPlayer = function() {
			console.log('update');
			if ($scope.gameCount % 2 === 0) {
				$element.find('#curr-player-piece').removeClass().addClass('circle-purple');
			} else {
				$element.find('#curr-player-piece').removeClass().addClass('circle-yellow');
			}
		}

		$scope.deactivateBoard = function() {
			$scope.$broadcast("deactivate");
		}

		$scope.$on('click', function(event, locationData) {
			// $scope.boardData[locationData.col][locationData.row]['class'] = locationData.color;

			console.log(locationData);

			if($scope.checkWin(locationData)) {
				console.log(locationData.color + ' wins');
				$scope.displayWinner(locationData.color);

				// reset column css background-color to white
				$element.find(".circle-col").css("background-color", "#FFFFFF");
				$scope.deactivateBoard();
			} else {
				if ($scope.gameCount == 41) {
					$element.find('#winner-status').addClass('red-text').text('Draw!');
				} else {
					$scope.gameCount++;
					console.log($scope.gameCount);
					$scope.updateCurrPlayer();
				}
			}
		});

		$scope.reset = function() {
			console.log('reset');
			$scope.gameCount = 0;
			$scope.boardData.forEach(function(col, colIndex) {
				col.forEach(function(row, rowIndex) {
					if (row.class !== "circle") {
						row.class = "circle";
					}
				});
			});
			$scope.$broadcast('reset');
			$scope.clearWinner();
			$scope.updateCurrPlayer();
			$scope.emptyPos = [5,5,5,5,5,5,5];
		}

		$scope.checkWin = function(locationData) {
			if ($scope.countColor(locationData, 1, 0) === 4 ||
				$scope.countColor(locationData, 0, 1) === 4 ||
				$scope.countColor(locationData, 1, 1) === 4 ||
				$scope.countColor(locationData, 1, -1) === 4) {
				return true;
			}
			return false;
		}

		$scope.countColor = function(locationData, xDir, yDir) {
			var count = 1;
			var currRow = locationData.row + xDir,
			currCol = locationData.col + yDir;
			// console.log("Row: " + currRow + ",col: " + currCol);

			while (currRow >= 0 && currRow <=  5 &&
					currCol >= 0 && currCol <= 6 &&
					$scope.boardData[currCol][currRow]['class'] == locationData.color) {
					count++;
					currRow += xDir;
					currCol += yDir;
			}

			currRow = locationData.row - xDir;
			currCol = locationData.col - yDir;
			// console.log("Row: " + currRow + ",col: " + currCol);

			while (currRow >= 0 && currRow <= 5 &&
					currCol >= 0 && currCol <= 6 &&
					$scope.boardData[currCol][currRow]['class'] == locationData.color) {
					count++;
					currRow -= xDir;
					currCol -= yDir;
			}

			// console.log(count);
			return count;
		}
			

		$scope.displayWinner = function(winnerColor) {
			if (winnerColor == 'circle-purple') {
				$element.find('#winner-status').addClass('purple-text').text('Purple wins!');
			} else {
				$element.find('#winner-status').addClass('yellow-text').text('Yellow wins!');
			}
		}

		$scope.clearWinner = function() {
			$element.find('#winner-status').removeClass().empty();
		}
});