# WebGL3DFractalRenderer
This is a WebGL2 3D Fractal Real Time Renderer.

It is a free open source project that utilizes WebGL2 to render 3D fractals in real time, with the ability to edit any constants or iteration counts on the fly as it renders. There are several prebuilt fractal fold equations and geometric objects that you can use in combination with custom constants to make your own fractals and play with the constants in real time.

Originally based on: https://github.com/HackerPoet/PySpace

If you have questions feel free to E-mail me! marshalljdem@gmail.com

<h2>How to use it</h2>

Unless you want to dive really deep, this is designed so that you only really need to access main.js and presets.js.

presets.js contains a bunch of premade fractal setups that you can use. You can also follow the same format as them to make your own fractals. I'll explain this more in the next section.

In main.js just edit the line "var obj = Menger();" and replace "Menger" with whatever preset you want to use, such as "Tree".

<h2>Making your own fractals</h2>

Go into the presets.js file and look at all the examples that are in there. You will notice they follow a similar format. Start off by making a new instance of FractalObject:

  `var obj = new FractalObject()`
  
Then, you start a loop:

  `obj.add(new LoopStart(10));`

This loop controls how many times your Fractal folds will be applied - fractals are based on self-similar patterns and that is achieved by repeating a process of folds on your object. The "10" means that every fold that comes after the start of the loop will be done 10 times. So after you start your loop, you need to add in the folds:

  `obj.add(new FoldScaleTranslate(3.0, [-2,-2,0]))`

This is an example of the Fold Scale Translate fold, which scales the object and translates it (moves it). In this example the scale factor is 3.0 (it will shrink by a factor of 3) and will be shifted over -2 in the X and Y directions and 0 in the Z direction.

You can add in as many folds with whatever constants you want. Whether or not it looks cool is a result of experimentation. Once you are done adding folds, you have to end the loop:

  `obj.add(new LoopEnd());`
 
Then you need to tell it what geometric shape you want the base to be. A simple one is the box:

  `obj.add(new Box([2.0, 2.0, 2.0], [0.0,0.0,0.0], [1, 0.5, 1]))`
 
This is a box of Width/Length/Height of 2.0, position of 0,0,0, and RGB color of (1, 0.5, 1) which is a pinkish tint.

You will also see lines like this at the end:

	setStartValueForVar('VAR_5', 8);

Just ignore that for now. It's only relevant in the next section and it isn't necessary for your fractal to render.

You fractal is now complete. Just put this all in a new function named whatever you want, and have the function return the object. That way you can just call your function in main.js as shown in the above section.

Customizing and editing constants in real time

You will notice (and probably be initially confused by) the fact that some of the constants in the preset examples use a string instead of a number. For example: 

  `obj.add(new LoopStart('VAR_5'));`

This is using the string 'VAR_5' instead of a normal int like 5 or 7. This is because the string 'VAR_5' is actually referencing one of six variables that can be used in place of a constant so that it can be changed at render time. The variables are incremented/decremented by various keys on your keyboard. See keyboard shortcuts below for more information. In this example, VAR_5 is being used to control how many times the looping will occur. You can increase it by clicking M and decrease it by clicking N. NOTE: The available VARs are VAR_0 through VAR_5, and VAR_5 is an int whereas VAR_0 through VAR_4 are floats. This means that loops should ONLY use VAR_5 since the amount of loops is an integer. This is important for the rendering to happen properly since it is in C which is a very type sensitive language.

You will also notice this:


  `obj.add(new Box([1.0, 1.0, 1.0], [0.0,0.0,0.0], 'orbit'));`

'orbit' is in place of what would normally be an RGB color set like [1.0, 0.5, 1.0]. Using 'orbit' allows for a special kind of coloring that is more than just a solid color and is dependent on the fractal itself. It's reccomended you use this for coloring because it looks cooler...

<h2>Keyboard Shortcuts</h2>

WASD to move
Space Bar to go up
Shift to go down
Enter to full screen

N / M to decrease / increase VAR_5
