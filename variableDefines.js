/// GlSL's
var vertexShader;
var fragmentShader;

/// The program used by WebGL
var program;

// The Frames per second to run at
var fps = 30;

/// Camera Uniforms Locations
var camUniformLocations = [];
// The string keys associated with each location for accessing the camUniforms object
var camUniformPropertyKeys = [];

/// Rendervar uniform locations
var rendervarUniformLocations = [];
/// Rendervar values
var rendervarValues = [1.3, 3.33, 0.15, 1.5, 1.0, 0];

/// The iResolution unfirom location
var iResolutionUniformLocation;
/// The iIPD uniform location
var iIPDUniformLocation;
/// The value to use for iIPD uniform
var iIPDUniformValue = 0.04;
/// The iMat uniform location
var iMatUniformLocation;
/// The iPrevMat uniform location
var iPrevMatUniformLocation;

/// The current calculated matrix for this frame AKA 'Mat'
/// Always 4x4
var currentMatrix = [1.0, 0.0, 0.0, 0.0,
                     0.0, 1.0, 0.0, 0.0,
                     0.0, 0.0, 1.0, 0.0,
                     3.5, 0.0, 7.0, 1.0];

/// The previous calculated matrix for last frame AKA 'prevMat'
/// Always 4x4
var prevMatrix = [1.0, 0.0, 0.0, 0.0,
                  0.0, 1.0, 0.0, 0.0,
                  0.0, 0.0, 1.0, 0.0,
                  0.0, 0.0, 24.0, 1.0];

/// The speed that the you look around at using the mouse
var mouseLookSpeed = 0.001;
/// The current x component of look direction
var look_x = 0.0;
/// The current y component of look direction
var look_y = 0.0;
/// The amount of movement acceleration
var speed_accel = 2.0;
/// The movement speed
var speed = 0.006;
/// The current movement velocity
var velocity = [0.0, 0.0, 0.0];
                  