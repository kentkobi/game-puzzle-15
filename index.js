// When the webpage has loaded
document.addEventListener("DOMContentLoaded", (event) => {
    // Initialise a new board with the element ID, columns, rows, and tile size

    new PuzzleUI({
        id: 'canva1',
        puzzle: new Puzzle({
            cols: 2,
            rows: 2
        })
    }).init();

    new PuzzleUI({
        id: 'canva2',
        puzzle: new Puzzle({
            cols: 3,
            rows: 4
        })
    }).init();

    new PuzzleUI({
        id: 'canva3',
        puzzle: new Puzzle({
            cols: 4,
            rows: 4
        })
    }).init();

    new PuzzleUI({
        id: 'canva4',
        puzzle: new Puzzle({
            cols: 8,
            rows: 8
        })
    }).init();

    new PuzzleUI({
        id: 'canva5',
        puzzle: new Puzzle({
            cols: 30,
            rows: 30
        })
    }).init();
});