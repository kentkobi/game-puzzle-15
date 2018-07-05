// When the webpage has loaded
document.addEventListener("DOMContentLoaded", (event) => {
    
    // Initialise puzzle UI with the puzzle (logic) it presents
    new PuzzleUI({
        id: 'puzzle1',
        puzzle: new Puzzle({
            cols: 2,
            rows: 2
        })
    }).init();

    new PuzzleUI({
        id: 'puzzle2',
        puzzle: new Puzzle({
            cols: 3,
            rows: 4
        })
    }).init();

    new PuzzleUI({
        id: 'puzzle3',
        puzzle: new Puzzle({
            cols: 4,
            rows: 4
        })
    }).init();

    new PuzzleUI({
        id: 'puzzle4',
        puzzle: new Puzzle({
            cols: 8,
            rows: 8
        })
    }).init();

    new PuzzleUI({
        id: 'puzzle5',
        puzzle: new Puzzle({
            cols: 30,
            rows: 30
        })
    }).init();
});