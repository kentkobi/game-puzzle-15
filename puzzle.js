class Puzzle {
	constructor(options) {
		this.id = options.id;
		this.rows = options.rows;
		this.cols = options.cols;
		this.tile = {
			width : 100/this.cols,
			height : 100/this.rows
		};
		this.board = {
			tiles: [],
			empty: []
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

		this.scramble()
		
		this.render(this.id, this.board);

		return this;
	}

	/* get elements and bind events */
	render (id, board) {
		let element = document.getElementById(id);

		element.innerHTML = '';

		Object.assign(element.style,{
			'width': "100%",
			'padding-top': 100/this.cols*this.rows + '%'
		});
		
		for(let row = 0; row < this.board.tiles.length; row++) {
			for(let col = 0; col < this.board.tiles[row].length; col++) {
				let tile = document.createElement('span');
				tile.id = this.id + '-'+row+'-'+col;

				Object.assign(tile.style,{
					left: (col*this.tile.width)+'%',
					top: (row*this.tile.height)+'%',
					width: this.tile.width+'%',
					height: this.tile.height+'%'
				});

				if(this.board.tiles[row][col] < this.cols*this.rows){
					tile.classList.add('tile');
					tile.innerHTML = (this.board.tiles[row][col]).toString();
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

			if( this.moveTile(position.row, position.col) ){
				// move tile by swapping id and style (top,left) with empty tile
				let tmp = {style: selectedTile.style.cssText, id: selectedTile.id};

				selectedTile.style.cssText = emptyTile.style.cssText;
				selectedTile.id = emptyTile.id;
				emptyTile.style.cssText = tmp.style;
				emptyTile.id = tmp.id;
			}
			
			if(this.isSolved()){
				element.classList.add("completed");
			}
		});
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