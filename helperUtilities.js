function make_rot(angle, axis_ix){
	var s = sin(angle)
	var c = cos(angle)
	if (axis_ix == 0){
		return [[ 1,  0,  0],
                [ 0,  c, -s],
                [ 0,  s,  c]];
	}else if (axis_ix == 1){
		return [[ c,  0,  s],
                [ 0,  1,  0],
                [-s,  0,  c]];
	}else if (axis_ix == 2 ){
		return [[ c, -s,  0],
                [ s,  c,  0],
                [ 0,  0,  1]];
    }
}

function reorthogonalize(mat){
	var svdX = svd(mat); // ??? Dunno if im using lalolib right
	return math.dot(svdX.U, svdX.V);
}


mmultiply = function(a,b) {
	return a.map(function(x,i) {
		return transpose(b).map(function(y,k) {
			return dotproduct(x, y)
		});
	});
}

dotproduct = function(a,b) {
	return a.map(function(x,i) {
		return a[i] * b[i];
	}).reduce(function(m,n) { return m + n; });
}

transpose = function(a) {
	return a[0].map(function(x,i) {
		return a.map(function(y,k) {
			return y[i];
		})
	});
}
function transpose(matrix) {
    return matrix[0].map((col, i) => matrix.map(row => row[i]));
}

var canvas; // Reference to main doc canvas

/// Sets up the mouse locking features
function setupMouseLocking(){
    canvas = document.getElementById('c');
    canvas.requestPointerLock = canvas.requestPointerLock ||
                                canvas.mozRequestPointerLock;

    document.exitPointerLock = document.exitPointerLock ||
                            document.mozExitPointerLock;

}
// Hook pointer lock state change events for different browsers
document.addEventListener('pointerlockchange', lockChangeAlert, false);
document.addEventListener('mozpointerlockchange', lockChangeAlert, false);
/// Helper function for mouse locking alerts
function lockChangeAlert() {
  if (document.pointerLockElement === canvas ||
      document.mozPointerLockElement === canvas) {
    console.log('The pointer lock status is now locked');
    document.addEventListener("mousemove", updatePosition, false);
  } else {
    console.log('The pointer lock status is now unlocked');  
    document.removeEventListener("mousemove", updatePosition, false);
  }
}
// Called when mouse is locked and moved
function updatePosition(e) {
    look_x += e.movementX * mouseLookSpeed;
    look_y += e.movementY * mouseLookSpeed;
    look_y = Math.min(Math.max(look_y, -PI/2), PI/2)
    rx = make_rot(look_x, 1)
    ry = make_rot(look_y, 0)
    var newMat = mmultiply(ry, rx);
    for(var i=0; i< 3; i++){
      for (var j=0; j<3; j++){
        currentMatrix[j + 4 * i] = newMat[i][j];
      }
    }
}
/// Conveniance function for getting the [:3, :3]
function getThreeMatrix(matrix){
    var newMatrix = [[]];
    for(var i=0; i<3; i++){
        for(var j=0; j<3; j++){
            newMatrix[i][j] = matrix[[i][j]];
        }
    }
}

/// Fullscreen Shenanigans
document.addEventListener("keypress", function(e) {
  if (e.keyCode === 13) {
    toggleFullScreen();
  }
}, false);

function toggleFullScreen() {
  if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen(); 
    }
  }
}

/*
/// Gets the "value" of the variable. Allows you to use the current value of rendervarValues
function getValue(any){
  if(typeof any === "string"){
    return rendervarValues[parseInt(any, 10)];
  }else if(typeof any === "object"){
    var array = [];
    for(var i=0; i<any.length;i++){
      array.push(getValue(any[i]));
    }
    return array;
  }else{
    return any;
  }
}

*/

function cond_offset(p){
  if(p.length > 0){
    return " - vec4(" + compileVar(p) + ",0.0)";
  }
  return "";
}

/// Checks if two arrays are equal
function checkArraysEqual(v1, v2){
    if(typeof v1 === "object" && typeof v2 === "object"){
      if(v1.length !== v2.length){
        return false;
      }
      for(var i=0; i<v1.length; i++){
        if(v1[i] !== v2[i]){
          return false;
        }
      }
    }
    return false
}

/// Compiles the color for a geo object into a string usable in the glsl files
function compileColorForGeo(geo){
  if(typeof geo.color === "object"){
    return "vec4(" + compileVar(geo.color) + ", " + geo.glsl() + ")"
  }else if(geo.color === "orbit"){
    return "vec4(orbit, " + geo.glsl() + ")";
  }else{
    throw "ERR: Invalid coloring type on geo";
  }
}
/// Sets the start value for one of the render time variables. Input the name like this : "VAR_5"
function setStartValueForVar(name, value){
  rendervarValues[parseInt(name.substring(4))] = value;
}


/// Gets the string version of a var for use in a glsl file
function compileVar(v){
  if(typeof v === "object"){
    return "vec3(" + compileVar(v[0]) + "," + compileVar(v[1]) + ","+ compileVar(v[2]) + ")";
  }else if(typeof v === "number"){
    if(v % 1 === 0 || v === 0){ // if its an int
      return (v).toFixed(1);
    }
    return v.toString();
  }else if(typeof v === "string"){
    console.log(v);
    return "_" + v.substring(4);
  }
  return "0";
}