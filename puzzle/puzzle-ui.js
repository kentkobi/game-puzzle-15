/* UI completely seperated from game logic (logic in puzzle.js) 
 * Game logic is independent, and can be applied to different UI experiences */

class PuzzleUI {
	constructor(options) {
		this.id = options.id;
		this.element = document.getElementById(options.id);
		this.puzzle = options.puzzle;
		this.tile = {
			width : 100/this.puzzle.cols, //needs cols from puzzle
			height : 100/this.puzzle.rows //needs rows from puzzle
		};
	}

	init(){
		this.puzzle.init();
		this.render(this.element,this.puzzle.board);
	}
	
	/* get elements, bind events, and apply layout */
	render (element, board) {
		element.innerHTML = '';

		Object.assign(element.style,{
			'width': "100%",
			'padding-top': 100/this.puzzle.cols*this.puzzle.rows + '%' //needs rows & cols from puzzle
		});
		
		for(let row = 0; row < board.tiles.length; row++) {
			for(let col = 0; col < board.tiles[row].length; col++) {
				let tile = document.createElement('span');
				tile.id = this.id + '-'+row+'-'+col;

				Object.assign(tile.style,{
					left: (col*this.tile.width)+'%',
					top: (row*this.tile.height)+'%',
					width: this.tile.width+'%',
					height: this.tile.height+'%'
				});

				if(board.tiles[row][col] < this.puzzle.cols*this.puzzle.rows){ //needs rows & cols from puzzle
					tile.classList.add('tile');
					tile.innerHTML = (board.tiles[row][col]).toString();
				} else {
					tile.className = 'empty';
				}
				
				element.appendChild(tile);
			}
		}

		element.addEventListener('click', (e) => {
			let selectedTile = e.target
			let position = {
				row: parseInt(selectedTile.id.split("-")[1]),
				col: parseInt(selectedTile.id.split("-")[2])
			}
			let emptyTile = document.getElementById(this.id).getElementsByClassName("empty")[0];

			if(this.puzzle.moveTile(position.row, position.col)){
				this.swapTiles (selectedTile, emptyTile)
			}

			if(this.puzzle.isSolved()){
				this.updateState(this.puzzle.state)
			}
		});

	}

	swapTiles (selectedTile, emptyTile) {
		let tmp = {style: selectedTile.style.cssText, id: selectedTile.id};

		selectedTile.style.cssText = emptyTile.style.cssText;
		selectedTile.id = emptyTile.id;
		emptyTile.style.cssText = tmp.style;
		emptyTile.id = tmp.id;
	}

	updateState(state) {
		if(state == "solved") {
			this.element.classList.add("completed");
		}
	}
}