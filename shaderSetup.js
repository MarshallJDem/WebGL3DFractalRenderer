/// Sets up the shader files and compiles them into a program. Adds in the object DE & COL GLSL code that you provide (if any)
function setupShaders(gl, objectGlslCode = "none"){
    // Shader and Programs setup
    vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    var comboFragSource = "";
    if(objectGlslCode == "none"){
        comboFragSource = fragmentShaderSource;
    }else{
        var splitStart = fragmentShaderSource.indexOf('// [objectGLSL]');
        var splitEnd = fragmentShaderSource.indexOf('// [/objectGLSL]');
        comboFragSource = fragmentShaderSource.substring(0, splitStart) + '// [objectGLSL]\n' + objectGlslCode + fragmentShaderSource.substring(splitEnd)
        console.log(comboFragSource);
    }
    fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, comboFragSource);
    program = createProgram(gl, vertexShader, fragmentShader);

}

/// Sets up the uniforms for use inside the gl
function setupUniforms(gl){
    // Camera uniform locations
    Object.keys(camUniforms).forEach(function(key,index) {
        camUniformLocations.push( gl.getUniformLocation(program, key) );
        camUniformPropertyKeys.push(key);
    });

    // Rendervar uniform locations
    for(var i =0; i<rendervarValues.length; i++){
        rendervarUniformLocations.push(gl.getUniformLocation(program, '_' + i.toString()));
    }

    // Misc Uniforms
    iResolutionUniformLocation = gl.getUniformLocation(program, 'iResolution');
    iIPDUniformLocation = gl.getUniformLocation(program, 'iIPD');

    // Matrixes
    iMatUniformLocation = gl.getUniformLocation(program, 'iMat');
    iPrevMatUniformLocation = gl.getUniformLocation(program, 'iPrevMat');
}

/// Updates/sets the uniform values into WebGL
function updateUniforms(gl){

    // Camera Uniforms
    for(var i=0; i<camUniformLocations.length; i++){
        var location = camUniformLocations[i];
        var type = camUniformTypes[camUniformPropertyKeys[i]];
        var value = camUniforms[camUniformPropertyKeys[i]];
        //console.log('uniform ' + type + ' ' + camUniformPropertyKeys[i] + ';')
        if(type === 'integer'){
            gl.uniform1i(location, value);
        }else if (type === 'float'){
            gl.uniform1f(location, value);
        }else if (type === 'vec2'){
            gl.uniform2fv(location, value);
        }else if (type === 'vec3'){
            gl.uniform3fv(location, value);
        }
    }

    // Rendervar Uniforms
    for(var i =0; i<rendervarValues.length - 1; i++){
        var location = rendervarUniformLocations[i];
        var value = rendervarValues[i];
        gl.uniform1f(location, value);
    }
    var location = rendervarUniformLocations[5];
    var value = rendervarValues[5];
    gl.uniform1i(location, value);

    //Misc Uniforms
    gl.uniform1f(iIPDUniformLocation, iIPDUniformValue);
    var iResolutionValue = [gl.canvas.width, gl.canvas.height];
    gl.uniform2fv(iResolutionUniformLocation, iResolutionValue);

    //Matrix Uniforms
    gl.uniformMatrix4fv(iMatUniformLocation, false, currentMatrix);
    gl.uniformMatrix4fv(iPrevMatUniformLocation, false, prevMatrix);

}

/// Creates and compiles a shader
function createShader(gl, type, source) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
      return shader;
    }
    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
  }
  
// Create a program
function createProgram(gl, vertexShader, fragmentShader) {
    var program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    var success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }

    console.log(gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
}