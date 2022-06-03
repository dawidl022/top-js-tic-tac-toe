# Tic Tac Toe

## JavaScript course - The Odin Project

Project for getting started with factory functions and the module pattern in
JavaScript by creating a simple Tic-Tac-Toe game.

[Project: Tic Tac Toe](https://www.theodinproject.com/lessons/javascript-tic-tac-toe)
is part of [The Odin Project](https://www.theodinproject.com/) curriculum.

## About the Application

The classical Tic-Tac-Toe game. Play with a friend in 2 Players mode, or against
the bot in 1 Player mode. The bot uses a minimax algorithm to determine the next
move, so it cannot loose. The best you can hope for against the bot is a draw.

The game comes in a light and dark theme. It uses whichever you have set as
default on your device.

## Screenshots

![Main Menu Screen](docs/screenshots/menu.png)

![Game Screen on Desktop](docs/screenshots/game.png)

<img alt="Game Screen on Mobile (light theme)" src="docs/screenshots/game-mobile-light.png" width="40%" />

## TypeScript

Most of the game logic is written in TypeScript, however, this project does not
use ES6 modules and relies on including the compiled JS files in `index.html`.
Therefore, the TypeScript source files do not properly import one another, but
the compiled JavaScript files still work.

The bash script `compile-ts` watches files in the `script` directory for changes
and recompiles TypeScript files if needed. A custom script was needed to get
around `tsc` adding an empty `export` statement at the end of the compiled JS
files when types were exported in the source TS files, which caused a syntax
error in the browser. The script, after compiling the TS files, strips this
problematic line from the compiled JS files.
