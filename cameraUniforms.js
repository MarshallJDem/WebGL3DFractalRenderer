var camUniforms = {}
var camUniformTypes = {}

// Number of additional samples on each axis to average and improve image quality.
// NOTE: This will slow down rendering quadratically.
// Recommended Range: 1 to 8 [integer]
camUniforms['ANTIALIASING_SAMPLES'] = 1 // INT
camUniformTypes['ANTIALIASING_SAMPLES'] = 'integer'
// The strength of the ambient occlusion.
// Recommended Range: 0.0 to 0.05
camUniforms['AMBIENT_OCCLUSION_STRENGTH'] = 0.005 // FLOAT
camUniformTypes['AMBIENT_OCCLUSION_STRENGTH'] = 'float'

// Represents the maximum RGB color shift that can result from ambient occlusion.
// Typically use positive values for 'glow' effects and negative for 'darkness'.
// Recommended Range: All values between -1.0 and 1.0
camUniforms['AMBIENT_OCCLUSION_COLOR_DELTA'] = [0.8, 0.8, 0.8] // VEC3[FLOAT]
camUniformTypes['AMBIENT_OCCLUSION_COLOR_DELTA'] = 'vec3'

// Color of the background when the ray doesn't hit anything
// Recommended Range: All values between 0.0 and 1.0
camUniforms['BACKGROUND_COLOR'] = [0.0, 0.0, 0.0] // VEC3 [FLOAT]
camUniformTypes['BACKGROUND_COLOR'] = 'vec3'

// The strength of the depth of field effect.
// NOTE: ANTIALIASING_SAMPLES must be larger than 1 to use depth of field effects.
// Recommended Range: 0.0 to 20.0
camUniforms['DEPTH_OF_FIELD_STRENGTH'] = 0.0 // FLOAT
camUniformTypes['DEPTH_OF_FIELD_STRENGTH'] = 'float'

// The distance from the camera where objects will appear in focus.
// NOTE: ANTIALIASING_SAMPLES must be larger than 1 to use depth of field effects.
// Recommended Range: 0.0 to 100.0
camUniforms['DEPTH_OF_FIELD_DISTANCE'] = 1.0 //FLOAT 
camUniformTypes['DEPTH_OF_FIELD_DISTANCE'] = 'float'

// Determines if diffuse lighting should be enabled.
// NOTE: This flag will be ignored if DIFFUSE_ENHANCED_ENABLED is set.
// NOTE: SHADOW_DARKNESS is also used to change diffuse intensity.
camUniforms['DIFFUSE_ENABLED'] = 0 //BOOL
camUniformTypes['DIFFUSE_ENABLED'] = 'integer'

// This is a 'less correct' but more aesthetically pleasing diffuse variant.
// NOTE: This will override the DIFFUSE_ENABLED flag.
// NOTE: SHADOW_DARKNESS is also used to change diffuse intensity.
camUniforms['DIFFUSE_ENHANCED_ENABLED'] = 1 //BOOL
camUniformTypes['DIFFUSE_ENHANCED_ENABLED'] = 'integer'

// Amount of light captured by the camera.
// Can be used to increase/decrease brightness in case pixels are over-saturated.
// Recommended Range: 0.1 to 10.0
camUniforms['EXPOSURE'] = 1.0 //FLOAT
camUniformTypes['EXPOSURE'] = 'float'

// Field of view of the camera in degrees
// NOTE: This will have no effect if ORTHOGONAL_PROJECTION or ODS is enabled.
// Recommended Range: 20.0 to 120.0
camUniforms['FIELD_OF_VIEW'] = 60.0 //FLOAT
camUniformTypes['FIELD_OF_VIEW'] = 'float'

// When enabled, adds a distance-based fog to the scene
// NOTE: Fog strength is determined by MAX_DIST and fog color is always BACKGROUND_COLOR.
// NOTE: If enabled, you usually also want VIGNETTE_FOREGROUND=true and SUN_ENABLED=false.
camUniforms['FOG_ENABLED'] = 0 // BOOL
camUniformTypes['FOG_ENABLED'] = 'integer'

// When enabled, adds object glow to the background layer.
camUniforms['GLOW_ENABLED'] = 0 // BOOL 
camUniformTypes['GLOW_ENABLED'] = 'integer'

// Represents the maximum RGB color shift that can result from glow.
// Recommended Range: All values between -1.0 and 1.0
camUniforms['GLOW_COLOR_DELTA'] = [-0.2, 0.5, -0.2] // VEC3[FLOAT]
camUniformTypes['GLOW_COLOR_DELTA'] = 'vec3'

// The sharpness of the glow.
// Recommended Range: 1.0 to 100.0
camUniforms['GLOW_SHARPNESS'] = 4.0 // FLOAT
camUniformTypes['GLOW_SHARPNESS'] = 'float'

// Color of the sunlight in RGB format.
// Recommended Range: All values between 0.0 and 1.0
camUniforms['LIGHT_COLOR'] = [1.0, 0.9, 0.6] // VEC3[FLOAT]
camUniformTypes['LIGHT_COLOR'] = 'vec3'

// Direction of the sunlight.
// NOTE: This must be a normalized quantity [magnitude = 1.0]
camUniforms['LIGHT_DIRECTION'] = [-0.36, 0.48, 0.80] //VEC3[FLOAT]
camUniformTypes['LIGHT_DIRECTION'] = 'vec3'

// Number of additional renderings between frames.
// NOTE: This will slow down rendering linearly.
// Recommended Range: 0 to 10 [integer]
camUniforms['MOTION_BLUR_LEVEL'] = 0 // INT
camUniformTypes['MOTION_BLUR_LEVEL'] = 'integer'

// Maximum number of marches before a ray is considered a non-intersection.
// Recommended Range: 10 to 10000 [integer]
camUniforms['MAX_MARCHES'] = 1000 //INT
camUniformTypes['MAX_MARCHES'] = 'integer'

// Maximum distance before a ray is considered a non-intersection.
// Recommended Range: 0.5 to 200.0
camUniforms['MAX_DIST'] = 50.0 // FLOAT
camUniformTypes['MAX_DIST'] = 'float'

// Minimum march distance until a ray is considered intersecting.
// Recommended Range: 0.000001 to 0.01
camUniforms['MIN_DIST'] = 0.00001 // FLOAT
camUniformTypes['MIN_DIST'] = 'float'

// If true will render an omnidirectional stereo 360 projection.
camUniforms['ODS'] = 0 // BOOL
camUniformTypes['ODS'] = 'integer'

// Determines if the projection view should be orthographic instead of perspective.
camUniforms['ORTHOGONAL_PROJECTION'] = 0 // BOOL
camUniformTypes['ORTHOGONAL_PROJECTION'] = 'integer'

// When ORTHOGONAL_PROJECTION is enabled, this will determine the size of the view.
// NOTE: Larger numbers mean the view will appear more zoomed out.
// Recommended Range: 0.5 to 50.0
camUniforms['ORTHOGONAL_ZOOM'] = 5.0 // FLOAT
camUniformTypes['ORTHOGONAL_ZOOM'] = 'float'

// Number of additional bounces after a ray collides with the geometry.
// Recommended Range: 0 to 8 [integer]
camUniforms['REFLECTION_LEVEL'] = 0 // INT
camUniformTypes['REFLECTION_LEVEL'] = 'integer'

// Proportion of light lost each time a reflection occurs.
// NOTE: This will only be relevant if REFLECTION_LEVEL is greater than 0.
// Recommended Range: 0.25 to 1.0
camUniforms['REFLECTION_ATTENUATION'] = 0.6 // FLOAT
camUniformTypes['REFLECTION_ATTENUATION'] = 'float'

// When enabled, uses an additional ray march to the light source to check for shadows.
camUniforms['SHADOWS_ENABLED'] = 0 // BOOL
camUniformTypes['SHADOWS_ENABLED'] = 'integer'

// Proportion of the light that is 'blocked' by the shadow or diffuse light.
// Recommended Range: 0.0 to 1.0
camUniforms['SHADOW_DARKNESS'] = 0.8 // FLOAT
camUniformTypes['SHADOW_DARKNESS'] = 'float'

// How sharp the shadows should appear.
// Recommended Range: 1.0 to 100.0
camUniforms['SHADOW_SHARPNESS'] = 16.0 // FLOAT
camUniformTypes['SHADOW_SHARPNESS'] = 'float'

// Used to determine how sharp specular reflections are.
// NOTE: This is the 'shininess' parameter in the phong illumination model.
// NOTE: To disable specular highlights, use the value 0.
// Recommended Range: 0 to 1000 [integer]
camUniforms['SPECULAR_HIGHLIGHT'] = 60 // INT
camUniformTypes['SPECULAR_HIGHLIGHT'] = 'integer'

// Determines if the sun should be drawn in the sky.
camUniforms['SUN_ENABLED'] = 1 // BOOL
camUniformTypes['SUN_ENABLED'] = 'integer'

// Size of the sun to draw in the sky.
// NOTE: This only takes effect when SUN_ENABLED is enabled.
// Recommended Range: 0.0001 to 0.05
camUniforms['SUN_SIZE'] = 0.005 // FLOAT
camUniformTypes['SUN_SIZE'] = 'float'

// How sharp the sun should appear in the sky.
// NOTE: This only takes effect when SUN_ENABLED is enabled.
// Recommended Range: 0.1 to 10.0
camUniforms['SUN_SHARPNESS'] = 2.0 // FLOAT
camUniformTypes['SUN_SHARPNESS'] = 'float'

// When enabled, vignetting will also effect foreground objects.
camUniforms['VIGNETTE_FOREGROUND'] = 0 // BOOL 
camUniformTypes['VIGNETTE_FOREGROUND'] = 'integer'

// The strength of the vignetting effect.
// Recommended Range: 0.0 to 1.5
camUniforms['VIGNETTE_STRENGTH'] = 0.5 // FLOAT
camUniformTypes['VIGNETTE_STRENGTH'] = 'float'