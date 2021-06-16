// cs-sketch.js; P5 key animation fcns.  // CF p5js.org/reference
// Time-stamp: <2020-02-02 15:58:23 Chuck Siska>

// Make global g_canvas JS 'object': a key-value 'dictionary'.
var g_canvas = { cell_size:16, wid:41, hgt:41 }; // JS Global var, w canvas size info.
var g_frame_cnt = 0; // Setup a P5 display-frame counter, to do anim
var g_frame_mod = 24; // Update ever 'mod' frames.
var g_stop = 0; // Go by default.

function setup() // P5 Setup Fcn
{
    let sz = g_canvas.cell_size;
    let width = sz * g_canvas.wid;  // Our 'canvas' uses cells of given size, not 1x1 pixels.
    let height = sz * g_canvas.hgt;
    createCanvas( width, height );  // Make a P5 canvas.
    draw_grid( 16, 41, 'orange', 'orange' );
}

var g_bot = { dir:0, x:20, y:20, color:255, dx:0, dy:0 }; // Dir is 0..7 clock, w 0 up.
var g_box = { t:1, hgt:41, l:1, wid:41 }; // Box in which bot can move.

function move_bot( )
{
    bot_dir( );
    let x = (g_bot.dx + g_bot.x + g_box.wid) % g_box.wid; // Move-x.  Ensure positive b4 mod.
    let y = (g_bot.dy + g_bot.y + g_box.hgt) % g_box.hgt; // Ditto y.
    g_bot.x = x; // Update bot x.
    g_bot.y = y;
    //console.log( "bot x,y,dir,clr = " + x + "," + y + "," + dir + "," +  color );
}
function draw_bot( ) // Draws a triangle connecting the current cell to the next cell
{
    /*
    Note: This implementation assumes the most recently colored cell is where the bot currently is, 
    and the triangle drawn here indicates which neighboring cell the bot is moving to next frame, 
    so the triangle is not drawn IN the current cell, but instead ATTATCHED to the current cell and IN the next cell, pointing towards the next cell's center.
    */

    //get next direction to move, giving both orientation and cell to draw to
    bot_dir();
    //draw the triangle on the next cell
    let sz = g_canvas.cell_size;
    let sx = 8+ (g_bot.x+g_bot.dx)*sz; // Set x in the center of the next sz-by-sz cell.
    let sy = 8+ (g_bot.y+g_bot.dy)*sz;
    let dx = g_bot.dx; //obtain direction information from bot
    let dy = g_bot.dy;
    stroke( "black" ); //give bot a contrasting border
    fill ( g_bot.color ); //set fill to white
    triangle(sx-(2*dx), sy-(2*dy),   sx-(7*dx + 4*dy), sy-(7*dy + 4*dx),   sx-(7*dx - 4*dy), sy-(7*dy - 4*dx)); //draw triangle connecting current cell to next cell
}

function draw_cell( ) // Convert bot pox to grid pos & draw the newly colored cell
{
    let sz = g_canvas.cell_size;
    let sz2 = sz / 2;
    let x = 1+ g_bot.x*sz; // Set x one pixel inside the sz-by-sz cell.
    let y = 1+ g_bot.y*sz;
    let big = sz -2; // Stay inside cell walls.
    // Fill 'color': its a keystring, or a hexstring like "#5F", etc.  See P5 docs.  
    
    //console.log( "x,y,big = " + x + "," + y + "," + big );
    let acolors = get( x + sz2, y + sz2 ); // Get cell interior pixel color [RGBA] array.
    let my_color = color(acolors[ 0 ], acolors[ 1 ], acolors[ 2 ]); // store content of acolors as a color object

    turn_bot( my_color.toString('rgb') ); // turn the bot based on the color of the cell before color change

    fill( inc_color_rgb( my_color.toString('rgb') ) ); // fill cell using the next color in the color sequence
    
    stroke("orange"); //turn stroke back to grid color
    rect( x, y, big, big ); // Paint the cell.
}

function draw_update()  // Update our display.
{
    //console.log( "g_frame_cnt = " + g_frame_cnt );
    draw_cell( );
    draw_bot( );
    move_bot( );
}

function inc_color_rgb( col ) // Cycle through the allowed cell colors in RGB format and return next color in p5.Color format.
{
    switch (col) {
    case 'rgb(0, 0, 0)'         : { return color( 255,   0,   0);  }
    case 'rgb(255, 0, 0)'       : { return color( 255, 255,   0);  }
    case 'rgb(255, 255, 0)'     : { return color(   0,   0, 255);  }
    case 'rgb(0, 0, 255)'       : { return color(   0, 255,   0);  }
    case 'rgb(0, 255, 0)'       : { return color(   0,   0,   0);  }
    default                     : { return color(   0,   0,   0);  }
    }
}

function bot_dir ()
{
    g_bot.dx = 0;
    g_bot.dy = 0;
    switch (g_bot.dir) { // Convert dir to x,y deltas: dir = clock w 0=Up,2=Rt,4=Dn,6=Left.
    case 0 : {                g_bot.dy = -1; break; }
    case 1 : { g_bot.dx = 1;  g_bot.dy = -1; break; }
    case 2 : { g_bot.dx = 1;  break; }
    case 3 : { g_bot.dx = 1;  g_bot.dy = 1; break; }
    case 4 : {                g_bot.dy = 1; break; }
    case 5 : { g_bot.dx = -1; g_bot.dy = 1; break; }
    case 6 : { g_bot.dx = -1; break; }
    case 7 : { g_bot.dx = -1; g_bot.dy = -1; break; }
    }
}

function turn_bot( col ) // Change direction of the bot based on the color of current cell.
{
    switch (col) {
    case 'rgb(255, 0, 0)'       : { }
    case 'rgb(0, 0, 255)'       : { g_bot.dir = (g_bot.dir + 2) % 8; break; } //turn right when red or blue
    default                     : { g_bot.dir = (8 + (g_bot.dir - 2)) % 8; break; } //default to left 
    }
    //console.log( "dir = " + g_bot.dir );
}

function draw()  // P5 Frame Re-draw Fcn, Called for Every Frame.
{
    ++g_frame_cnt;
    if (0 == g_frame_cnt % g_frame_mod)
    {
        if (!g_stop) draw_update();
    }
}

function keyPressed( )
{
    g_stop = ! g_stop;
}

function mousePressed( )
{
    let x = mouseX;
    let y = mouseY;
    //console.log( "mouse x,y = " + x + "," + y );
    let sz = g_canvas.cell_size;
    let gridx = round( (x-0.5) / sz );
    let gridy = round( (y-0.5) / sz );
    //console.log( "grid x,y = " + gridx + "," + gridy );
    //console.log( "box wid,hgt = " + g_box.wid + "," + g_box.hgt );
    g_bot.x = gridx + g_box.wid; // Ensure its positive.
    //console.log( "bot x = " + g_bot.x );
    g_bot.x %= g_box.wid; // Wrap to fit box.
    g_bot.y = gridy + g_box.hgt;
    //console.log( "bot y = " + g_bot.y );
    g_bot.y %= g_box.hgt;
    //console.log( "bot x,y = " + g_bot.x + "," + g_bot.y );
    draw_cell( );
}
