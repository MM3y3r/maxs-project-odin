document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("resetButton")
        .addEventListener("click", (event) => {
            game.resetGame();
        });
    document.getElementById("playAsO").addEventListener("click", (event) => {
        console.log("switching current player to O");
        game.setCurrentPlayer("O");
    });
    document.getElementById("playAsX").addEventListener("click", (event) => {
        console.log("switching current player to X");
        game.setCurrentPlayer("X");
    });

    function createGame() {
        type Field = "X" | "O" | null | undefined;
        type Row = Array<Field>;
        type GameBoard = Array<Row>;
        type Player = "X" | "O";

        let GameBoard: GameBoard = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        let player1: Player = "X";
        let player2: Player = "O";
        let currentPlayer: null | Player = Math.random() > 0.5 ? "X" : "O";
        let turnCounter = 0;
        console.log(`starting as ${currentPlayer}...`);

        const setCurrentPlayer = (player: Player) => {
            currentPlayer = player;
        };

        const resetGame = () => {
            GameBoard = [
                [null, null, null],
                [null, null, null],
                [null, null, null],
            ];
            render();
        };

        const move = (player: Player, x: number, y: number) => {
            GameBoard[x][y] = player;
            setCurrentPlayer(currentPlayer == "O" ? "X" : "O");
            render();
            turnCounter++;
            determineWinner();
        };

        const determineWinner = () => {
            console.log("determining winner.. !");

            let winner = null;

            if (turnCounter === 9) {
                console.log("DRAW");
                document
                    .getElementById("maxsTicTacToeGame")
                    .appendChild(document.createTextNode("GAME OVER"));
            }

            try {
                // #### CROSSED

                if (
                    (!!GameBoard[0][0] &&
                        GameBoard[0][0] === GameBoard[1][1] &&
                        GameBoard[1][1] === GameBoard[2][2] &&
                        GameBoard[0][0] === GameBoard[2][2]) ||
                    (!!GameBoard[2][0] &&
                        GameBoard[2][0] === GameBoard[1][1] &&
                        GameBoard[0][2] === GameBoard[1][1] &&
                        GameBoard[0][2] === GameBoard[2][0])
                ) {
                    winner = GameBoard[0][0];
                }
            } catch (error) {
                console.log(error);
            }

            try {
                // #### Y

                if (
                    !!GameBoard[0][0] &&
                    GameBoard[0][0] === GameBoard[1][0] &&
                    GameBoard[1][0] === GameBoard[2][0] &&
                    GameBoard[1][0] === GameBoard[2][0]
                ) {
                    winner = GameBoard[0][0];
                }

                if (
                    !!GameBoard[0][1] &&
                    GameBoard[0][1] === GameBoard[1][1] &&
                    GameBoard[1][1] === GameBoard[2][1] &&
                    GameBoard[1][1] === GameBoard[2][1]
                ) {
                    winner = GameBoard[0][1];
                }

                if (
                    !!GameBoard[0][2] &&
                    GameBoard[0][2] === GameBoard[1][2] &&
                    GameBoard[1][2] === GameBoard[2][2] &&
                    GameBoard[1][2] === GameBoard[2][2]
                ) {
                    winner = GameBoard[0][2];
                }
            } catch (error) {
                console.log(error);
            }

            try {
                // #### X

                if (
                    !!GameBoard[0][0] &&
                    GameBoard[0][0] === GameBoard[0][1] &&
                    GameBoard[0][1] === GameBoard[0][2] &&
                    GameBoard[0][1] === GameBoard[0][2]
                ) {
                    winner = GameBoard[0][0];
                }

                if (
                    !!GameBoard[1][0] &&
                    GameBoard[1][0] === GameBoard[1][1] &&
                    GameBoard[1][1] === GameBoard[1][2] &&
                    GameBoard[1][1] === GameBoard[1][2]
                ) {
                    winner = GameBoard[1][0];
                }

                if (
                    !!GameBoard[2][0] &&
                    GameBoard[2][0] === GameBoard[2][1] &&
                    GameBoard[2][1] === GameBoard[2][2] &&
                    GameBoard[2][1] === GameBoard[2][2]
                ) {
                    winner = GameBoard[2][0];
                }
            } catch (error) {
                console.log(error);
            }

            if (!!winner) {
                console.log(`###### ${winner} has won the Game!`);

                document
                    .getElementById("maxsTicTacToeGame")
                    .appendChild(
                        document.createTextNode(`${winner} has won the Game!`)
                    );
            }
        };

        const render = () => {
            console.log("re-rendering...");

            const playerDiv = document.getElementById("currentPlayerText");

            playerDiv &&
                (playerDiv.innerHTML = `The current player is ${currentPlayer}`);

            const containerDiv = document.getElementById("maxsTicTacToeGame");

            // DISCARD OLD
            containerDiv.innerHTML = "";

            const table = document.createElement("table");
            const tbody = document.createElement("tbody");

            GameBoard.forEach((row, indexX) => {
                const tr = document.createElement("tr");
                row.forEach((field, indexY) => {
                    const cell = document.createElement("td");

                    if (field) {
                        const cellText = document.createTextNode(field);
                        cell.appendChild(cellText);
                    } else {
                        const button = document.createElement("button");
                        button.addEventListener("click", () => {
                            console.log(
                                `moving to [${indexX},${indexY} with ${currentPlayer}]`
                            );
                            move(currentPlayer, indexX, indexY);
                        });
                        cell.appendChild(button);
                    }

                    tr.appendChild(cell);
                });
                tbody.appendChild(tr);
            });
            table.appendChild(tbody);
            // table.classList.add("table");
            containerDiv.appendChild(table);
        };

        return {
            GameBoard,
            player1,
            player2,
            resetGame,
            move,
            setCurrentPlayer,
            render,
        };
    }

    const game = createGame();

    game.render();
});
