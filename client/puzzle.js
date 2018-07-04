/* 
including MIT License with project - while researching this, found Arnis Ritins' code clever in spots, particularily around collecting adjacent tiles, and subsequently used portions.  So credit where credit is due!
https://github.com/arnisritins/15-Puzzle
*/
class Puzzle {
	constructor(options) {
		this.id = options.id;
		this.rows = options.rows;
		this.cols = options.cols;
		this.element = null;
		this.tile = {
			width : 100/this.cols,
			height : 100/this.cols
		};
		this.maxShuffle = options.maxShuffle || 20;
		this.transitionDelay = options.transitionDelay || 50;
	}

	/* get handle(s) and bind events */
	init () {
		this.element = document.getElementById(this.id);
		this.element.addEventListener('click', (e) => this.moveTile(e.target));

		return this;
	}

	/* fill puzzle with tiles */
	populate () {
		let order = 1;

		this.element.innerHTML = '';
		
		for(let row = 0; row <= (this.rows-1); row++){
			for(let col = 0; col <= (this.cols-1); col++){
				let tile = document.createElement('span');
				tile.id = this.id + '-'+row+'-'+col;

				Object.assign(tile.style,{
					left: (col*this.tile.width)+'%',
					top: (row*this.tile.height)+'%',
					width: this.tile.width+'%',
					height: this.tile.height+'%'
				});

				if(order < this.cols*this.rows){
					tile.classList.add('tile');
					tile.innerHTML = (order++).toString();
				} else {
					tile.className = 'empty';
				}
				
				this.element.appendChild(tile);
			}
		}

		return this;
	}

	/* move tiles around to get into an unsolved state */
	scramble (){
		let self = this,
			previousTile,
			move = 1,
			maxMoves = (this.rows*this.cols < this.maxShuffle) ? this.rows*this.cols : this.maxShuffle;

		let interval = setInterval(function(){
			if(move <= maxMoves){
				let adjacent = self.getAdjacentTiles(self.getEmptyTile());

				// if there was a previously moved tile, remove it the from the list of potential tiles to move next
				if(previousTile){
					for(let i = adjacent.length-1; i >= 0; i--){
						if(adjacent[i].innerHTML == previousTile.innerHTML){
							adjacent.splice(i, 1);
						}
					}
				}

				// gets random adjacent tile and memorizes it for the next iteration
				previousTile = adjacent[self.rand(0, adjacent.length-1)];
				self.moveTile(previousTile);
				move++;
			}
		}, this.transitionDelay);

		return self;
	}

	/* if possible, move chosen tile to an adjacent available spot */
	moveTile (tile) {
		let emptyTile = this.getEmptyAdjacentTile(tile);

		// valid only if moving non-empty tile to an adjacent empty tile
		if(tile.className != 'empty'){			
			if(emptyTile){
				// move tile by swapping id and style (top,left) with empty tile
				let tmp = {style: tile.style.cssText, id: tile.id};

				tile.style.cssText = emptyTile.style.cssText;
				tile.id = emptyTile.id;
				emptyTile.style.cssText = tmp.style;
				emptyTile.id = tmp.id;
				
				if(this.isSolved()){
					this.completed();
				}
			}
		}		
	}

	/* check if tiles are ordered in a solved state */
	isSolved () {
		let order = 1;

		// first, check if the empty tile is in correct position
		if(this.getTile(this.rows-1, this.cols-1).className != 'empty'){
			return false;
		}
	
		// then go through all tiles and check order
		for(let i = 0; i <= this.rows-1; i++){
			for(let j = 0; j <= this.cols-1; j++){
				if(order <= (this.rows * this.cols-1) && this.getTile(i, j).innerHTML != order.toString()){
					return false; // Order of tiles is not correct
				}
				order++;
			}
		}
		return true
	}

	/* mark the puzzle as completed */
	completed () {
		this.element.classList.add("completed");
	}

	getTile (row, col) {
		return document.getElementById(this.id + '-'+row+'-'+col);	
	}

	getEmptyTile () {
		return this.element.querySelector('.empty');	
	}

	/* gets all possible adjacent tiles */
	getAdjacentTiles (tile) {
		let id = tile.id.split('-'),
			row = parseInt(id[1]),
			col = parseInt(id[2]),
			adjacent = [];
		
		if(row < this.rows-1){adjacent.push(this.getTile(row+1, col));}			
		if(row > 0){adjacent.push(this.getTile(row-1, col));}
		if(col < this.cols-1){adjacent.push(this.getTile(row, col+1));}
		if(col > 0){adjacent.push(this.getTile(row, col-1));}

		return adjacent;	
	}

	/* if possible, get an adjacent tile that is empty */
	getEmptyAdjacentTile (tile) {
		for (var tile of this.getAdjacentTiles(tile)) {
			if(tile.className == 'empty'){
				return tile;
			}
		}
		
		return false; // no empty adjacent tile was found
	}
	
	/* get random number within a range */
	rand (from, to) {
		return Math.floor(Math.random() * (to - from + 1)) + from;
	}
};
