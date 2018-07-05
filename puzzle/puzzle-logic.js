/* Game logic completely seperated from UI (into puzzle-ui.js) 
 * Game logic is independent, and can be applied to different UI experiences */

class Puzzle {
	constructor(options) {
		this.rows = options.rows;
		this.cols = options.cols;
		this.board = {
			tiles: [],
			empty: {}
		};
		this.state = 'solved';
	}
	
	init () {
		let step = 1;

		for (let row = 0; row != this.rows; row++) {
			this.board.tiles[row] = new Array();
			for (let col = 0; col != this.cols; col++) {
				this.board.tiles[row].push(step);

				this.board.empty = {
					row: row,
					col: col
				}
				step++
			}
		}

		this.scramble();

		return this;
	}

	/* move tiles around to get into an unsolved state */
	scramble (){
		let limit = this.rows*this.cols*10;
		
		for(let move = 0; move <= limit; move++) {
			let possibleMoves = this.getValidMoves()

			let randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
			this.moveTile(randomMove[0], randomMove[1]);
		}

		return this;
	}

	getValidMoves () {
		let adjacent = [];
		let row = this.board.empty.row;
		let col = this.board.empty.col;
		
		if(row < this.rows-1){adjacent.push([row+1, col]);}			
		if(row > 0){adjacent.push([row-1, col]);}
		if(col < this.cols-1){adjacent.push([row, col+1]);}
		if(col > 0){adjacent.push([row, col-1]);}

		return adjacent;	
	}

	moveTile (row, col) {
		if( ((this.board.empty.col == col || this.board.empty.col-1 == col || this.board.empty.col+1 == col) && this.board.empty.row == row) 
			|| ((this.board.empty.row-1 == row || this.board.empty.row+1 == row) && this.board.empty.col == col) ) {
			
			// swap tile positions
			let tmp = this.board.tiles[this.board.empty.row][this.board.empty.col];
			this.board.tiles[this.board.empty.row][this.board.empty.col] = this.board.tiles[row][col]
			this.board.tiles[row][col] = tmp

			this.board.empty = {
				row: row,
				col: col
			}

			this.state = (this.isSolved) ? 'solved' : 'unsolved';

			return true;
		} else {
			console.error("invalid move!")
		}
		return false;
	}

	isSolved () {
		let order = 1;

		for (let row = 0; row != this.rows; row++) {
			for (let col = 0; col != this.cols; col++) {
				if(this.board.tiles[row][col] != order){
					return false;
				}
				order++;
			}
		}

		return true
	}
}