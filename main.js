var canvas = document.getElementById("c");
var outerContainer = document.getElementById("outer");
var gl = canvas.getContext("webgl2");


// Setup the four vertices that will just cover the whole screen
var primitiveType = gl.TRIANGLE_STRIP;
var offset = 0;
var count = 4;


var renderingContextSetup = false;


// Replace this line to change which fractal is being used
var obj = Mausoleum();

function createRenderingContext(){
  renderingContextSetup = true;

  setupShaders(gl, obj.compiled());
  setupUniforms(gl);
  
  gl.useProgram(program);

  updateUniforms(gl);
  gl.drawArrays(primitiveType, offset, count);
}

createRenderingContext();

// Setup Function
function setup(){
  frameRate(fps);

  setupMouseLocking();

  // Canvas Setup
  gl.canvas.width = outerContainer.offsetWidth
  gl.canvas.height = outerContainer.offsetHeight
  gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  

}



// Update function
// Called 60 times per second
function draw(){
  if(renderingContextSetup){
    updateUniforms(gl);

    mat[12] = velocity[0];
    mat[13] = velocity[1];
    mat[14] = velocity[2];

    if(!fullRendering){
      prevMatrix = currentMatrix;
      // Movement
      var acc = [0.0, 0.0, 0.0];
      if (keyIsDown(65)) {  //a
        currentMatrix[12] -= speed;
        acc[0] -= speed_accel / fps;
      } if (keyIsDown(83)){ //s
        currentMatrix[14] += speed;
        acc[2] += speed_accel / fps;
      } if (keyIsDown(68)){ //d
        currentMatrix[12] += speed;
        acc[0] += speed_accel / fps;
      } if (keyIsDown(87)){ //w
        currentMatrix[14] -= speed;
        acc[2] -= speed_accel / fps;
      }if (keyIsDown(32)){ // SPACE
        currentMatrix[13] += speed/2;
      }if (keyIsDown(SHIFT)){ // SHIFT
        currentMatrix[13] -= speed/2;
      } if (keyIsDown(38)){ // UP ARROW
        speed *= 1.1;
      } if (keyIsDown(40)){// DOWN ARROW
        speed /= 1.1;
      } 
      // This is where the VAR_'s are changed. Change the 0.1 if you want to edit how quickly the value changes. The '/ 60' part is to compensate for framerate (like deltaTime in games)
      if (keyIsDown(85)){ // U
        rendervarValues[0] += 0.1 / 60;
      } if (keyIsDown(73)){ // I
        rendervarValues[0] -= 0.1 / 60;
      } if (keyIsDown(72)){ // H
        rendervarValues[1] += 0.1 / 60;
      } if (keyIsDown(74)){ // J
        rendervarValues[1] -= 0.1 / 60;
      } if (keyIsDown(86)){ // V
        rendervarValues[2] += 0.1 / 60;
      } if (keyIsDown(66)){ // B
        rendervarValues[2] -= 0.1 / 60;
      } if (keyIsDown(79)){ // O
        rendervarValues[3] += 0.1 / 60;
      } if (keyIsDown(80)){ // P
        rendervarValues[3] -= 0.1 / 60;
      } if (keyIsDown(75)){ // K
        rendervarValues[4] += 0.1 / 60;
      } if (keyIsDown(76)){ // L
        rendervarValues[4] -= 0.1 / 60;
      }
      // N and M are not here since they increment once each key click rather than once every frame the key is pressed. See "keyPressed" function for N / M

      // The WebGL draw function
      gl.drawArrays(primitiveType, offset, count);
    }
  }

}


var fullRendering = false;

function keyPressed(){
  if (keyIsDown(82)) {//r
    if(fullRendering){
      fullRendering = false;
    }else{
      fullRendering = true;
    }
  }
  if (keyIsDown(78)){ // N
    rendervarValues[5] -= 1;
  } if (keyIsDown(77)){ // M
    rendervarValues[5] += 1;
  }
}
function mousePressed() {
  canvas.requestPointerLock();
}

