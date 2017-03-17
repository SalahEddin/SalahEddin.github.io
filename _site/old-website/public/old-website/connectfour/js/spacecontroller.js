'use strict';

app.controller("SpaceController", 
	function($scope, $element, $attrs) {
		$scope.finished = false;

		$scope.onClick = function() {
			if (!$scope.finished) {
				var row = parseInt($attrs.row);
				var col = parseInt($attrs.col);
				var color;

				// If column is not full
				if ($scope.emptyPos[col] >= 0) {
					// place corresponding token into column
					if ($scope.gameCount % 2 == 0) {
						color = "circle-purple";
						placeToken(col, color);
						console.log($scope.emptyPos);

					} else {
						color = "circle-yellow";
						placeToken(col, color);
						console.log($scope.emptyPos);
					}

					$scope.$emit('click',
						{
							'row':$scope.emptyPos[col]+1,
							'col':col,
							'color':color
						}
					);
				}
			}
		}

		function placeToken(col, color) {
			// var row = 5;
			var col = parseInt($attrs.col);
			var row = $scope.emptyPos[col];

			if (row < 0) return;

			// var emptySpace = $($element.parent().children()[row]).children(".circle");

			// Should be function call to start drop down animation
			// emptySpace.removeClass().addClass(color);
			$scope.boardData[col][row]['class'] = color;
			$scope.emptyPos[col] -= 1;
		}

		$scope.mouseEnter = function() {
			if (!$scope.finished) {
				var col = parseInt($attrs.col);
				if ($scope.emptyPos[col] >= 0) {
					$element.parent().css("background-color", "#FFFF9C");
				}
			}
		}

		$scope.mouseLeave = function() {
			if (!$scope.finished) {
				$element.parent().css("background-color", "#FFFFFF");
			}
		}

		$scope.$on('reset', function(event) {
			$scope.finished = false;
			console.log("reset");
		});
		
		$scope.$on('deactivate', function(event) {
			$scope.finished = true;
		});
});