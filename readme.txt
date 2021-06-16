Readme for cella_ant_x15
Time-stamp: <2020-09-16 14:32:20 Colin Hughes>
------------------------------------------------------------

Class Number: 335-02
Team Name: Walkin
Team Member(s): Colin Hughes
Project Number 1, Cella Ant #x15


Intro

  This html page features a 41x41 cell grid navigated by a bot that turns either left or right when it enters a cell depending on the color of the cell. All cells begin as black, as the bot enters the cell, the color will change to red, a second contact with cell changes the color to yellow, then blue, then green, then back to black. The position and orientation of the bot is represented by a white triangle, which sits between the bot's current cell and next cell the bot will move to, pointing towards it's center.

  The direction the bot will turn is derived from the binary reading of the hexadecimal number 15, which the algorithm is named after. For each bit in 10101 (Hexadecimal 15), a 1 signifies turning 90 degrees to the left, and 0 signifies turning 90 degrees to the right, and the order of the bits signifies the order of the color of cells, so the cells effectivly change from being a cell that turns the bot in the order of left, right, left, right, left, reapting with left, right, etc. As the bot turns left slightly more frequently than right, a pattern does not come about where the bot will straighten out, move diagonally, or make complete circles regularly. The movement of the bot is chaotic as a result.


Features 

  The bot starts at the center of the grid when the page starts, but left clicking in the page will place the bot at a new position, starting the same pattern at a new position. 

  Pressing a key on your keyboard will pause the bot, allowing you to more easily view it's current location and direction. Pressing any key will then resume movement.

  Reseting the cells must be done by manually starting the webpage again.


Zip Contents

  File readme.txt.  This file.

  File cella_ant_x15.html. Drag and drop this into a browser to
    run the example.
    Click to start the bot in a new location (via mousePressed).
    Hit (almost) any key to pause or unpause the bots movement (via keyPressed).

  File p5.js. This is the P5 package.  It is loaded inside the html.

  File cs-sketch.js; This contains several P5 user-defined linkage functions
   (setup, draw, keyPressed, and mousePressed), as well as example
    support functions.  P5's setup() is run once before page display.
    P5's draw() is run once per display frame, so you can do animation.

  File assets/styles.css.  This is an extra-small example of controlling
    webpage styling.  // Loaded inside the html.

  File assets/draw-stuff.js. This is an example to show loading a JS
    script file from a folder other than the index HTML file's
    folder location.  It also includes the utility draw_grid function
    written in P5+JS. // Loaded inside the html.


Installation & Running

  1. Extract the .zip file into a folder.

  2. Drag the main HTML file, cella_ant_x15.html, into a browser
    window.  The example P5 program should start immediately.  You
    should see a 41 by 41 cell grid made of orange lines on a black background.


Known Bugs

  o- Black lines or smudges may appear in the orange margin between cells due to issues with drawing order.

  o- The white triangle representing the bot will not disappear if the bot is moved to another spot via clicking, so several clicks will result in several stationary triangles.


Warnings

  o- Clicking outside the grid wraps the mouse coordinates back around the grid.

  o- Function keys, such as f12, will still pause the bot, but inputs in the inspection window may not be recieved by the webpage. Refocus on the webpage to presume the bot's movement.


Testing

  o- Following installation instruction, above, watched it run, and
  tryed a few keypresses and mouse clicks, reliability appears identical to starter code.
  Only tested on Google Chrome.


Credits

  Code based on Professor Siska's starter code, which was based on Stuart's book.  
    Introducing JavaScript Game Development: Build a 2D Game from the
    Ground Up, by Graeme Stuart, 2018, 209 pages.

  And, of course, thanks to the HTML and P5.js developers.
