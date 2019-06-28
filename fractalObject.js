class FractalObject {
    constructor(){
        this.transforms = [];
    }
    /// Compiles object for glsl
    compiled(){
        var s = "";
        var loopBuffer = "";
        //DE
        s += "float DE(vec4 p){\n";
            s += "\tvec4 o = p;\n";
            s += "\tfloat d = 1e20;\n";
            for (var i=0;i<this.transforms.length;i++){
                var t = this.transforms[i];
                if(t.type === "fold"){
                    s += t.glsl(loopBuffer)
                }else if(t.type === "geo"){
                    s += "\td = min(d, " + t.glsl(loopBuffer) + ");\n";
                }else if(t.type === "orbit"){
                    // Do nothing
                }else if(t.type === "loopStart"){
                    s += loopBuffer + '\t' + t.glsl();
                    loopBuffer += "\t";
                }else if(t.type === "loopEnd"){
                    loopBuffer = loopBuffer.slice(2, -1);
                    console.log("Buffer :" + loopBuffer + "adsf")
                    s += loopBuffer + '\t' + t.glsl();
                }else{
                    throw "ERR: Invalid transform type while compiling object";
                }
            }
            s += "\treturn d;\n";
        s += "}\n";

        loopBuffer = "";
        //COL
        s += "vec4 COL(vec4 p) {\n"
            s += "\tvec4 o = p;\n"
            s += "\tvec4 col = vec4(1e20);\n"
            s += "\tvec4 newCol;\n"
            for (var i=0;i<this.transforms.length;i++){
                var t = this.transforms[i];
                if(t.type === "fold"){
                    s += t.glsl(loopBuffer)
                }else if(t.type === "geo"){
                    s += "\tnewCol = " + t.glsl_color(loopBuffer) + ";\n"
				    s += "\tif (newCol.w < col.w) { col = newCol; }\n"
                }else if(t.type === "orbit"){
                    s += t.orbit(loopBuffer);
                }else if(t.type === "loopStart"){
                    s += loopBuffer + '\t' + t.glsl();
                    loopBuffer += "\t";
                }else if(t.type === "loopEnd"){
                    loopBuffer = loopBuffer.slice(2, -1);
                    s += loopBuffer + '\t' + t.glsl();
                }else{
                    throw "ERR: Invalid transform type while compiling object";
                }
            }
            s += "\treturn col;\n";
        s += "}\n";

        return s;
    }
    /// Adds a new transform to the transform stack
    add(transform){
        this.transforms.push(transform);
    }



}

// Helpers

class LoopStart{
    constructor(loops=1){
        this.loops = loops;
        this.type = "loopStart";
    }
    /// Compiles for glsl
    glsl(){
        return 'for(int i = 0; i < ' + compileVar(this.loops) + '; ++i){\n';
    }

}

class LoopEnd{
    constructor(){
        this.type = "loopEnd";
    }
    /// Compiles for glsl
    glsl(){
        return '}\n';
    }
}

//Geos

class Box{
    constructor(s=[1,1,1], c=[0,0,0], color=[1,1,1]){
        this.s = s;
        this.c = c;
        this.color = color;
        this.type = "geo";
    }
    /// Compiles geo for glsl
    glsl(){
        return "de_box(p " + cond_offset(this.c) + ', ' + compileVar(this.s) + ')';
    }
    /// Compiles color for glsl
    glsl_color(loopBuffer){
        return loopBuffer + compileColorForGeo(this);
    }

}

class Tetrahedron{
    constructor( r=1.0, c=[0,0,0], color=[1,1,1]){
        this.r = r;
        this.c = c;
        this.color = color;
        this.type = 'geo'
    }
    /// Compiles geo for glsl
    glsl(loopBuffer){
		return loopBuffer + 'de_tetrahedron(p' + cond_offset(this.c) + ', ' + compileVar(this.r) + ')'
    }
    /// Compiles color for glsl
    glsl_color(){
        return compileColorForGeo(this);
    }
}

// Folds

class FoldAbs{
    constructor(c=[0,0,0]){
        this.c = c;
        this.type = "fold";
    }
    /// Compiles fold for glsl
    glsl(loopBuffer){
        if(checkArraysEqual(this.c, [0,0,0])){
            return loopBuffer + "\tp.xyz = abs(p.xyz);\n";
        }
        return loopBuffer + "\tabsFold(p, " + compileVar(this.c) + ");\n";
    }
}

class FoldRotateY{
    constructor(a){
        this.a = a;
        this.type = "fold";
    }
    glsl(loopBuffer){
        return loopBuffer + '\trotY(p, sin(' + compileVar(this.a) + '), cos(' + compileVar(this.a) + '));\n'; // ?? questionable
    }
}class FoldRotateX{
    constructor(a){
        this.a = a;
        this.type = "fold";
    }
    glsl(loopBuffer){
        return loopBuffer + '\trotX(p, sin(' + compileVar((this.a)) + '), cos(' + compileVar((this.a)) + '));\n'; // ?? questionable
    }
}

class FoldBox{
    constructor(r=[1.0,1.0,1.0]){
        this.r = r;
        this.type = "fold";
    }
    glsl(loopBuffer){
        return loopBuffer + '\tboxFold(p,' + compileVar(this.r) + ');\n';
    }
}
class FoldSphere{
    constructor(minR = 0.5, maxR = 1.0){
        this.minR = minR;
        this.maxR = maxR;
        this.type = "fold";
    }
    glsl(loopBuffer){
        return loopBuffer + '\tsphereFold(p,' + compileVar(this.minR) + ',' + compileVar(this.maxR) + ');\n';
    }
}

class FoldScaleTranslate{
    constructor(s=1.0, t=[0,0,0]){
        this.s = s;
        this.t = t;
        this.type = "fold";
    }
    glsl(loopBuffer){
        var str = '';
        var s = compileVar(this.s);
        var t = compileVar(this.t);
        str += loopBuffer + '\tif(' + s + ' != 1.0){\n';
        str += loopBuffer + '\t\tif( ' + s + ' >= 0.0){\n';
        str += loopBuffer + '\t\t\tp *= ' + s + ';\n';
        str += loopBuffer + '\t\t} else{\n';
        str += loopBuffer + '\t\t\tp.xyz *= ' + s + ';\n';
        str += loopBuffer + '\t\t\tp.w *= abs(' + s + ');\n';
        str += loopBuffer + '\t\t}\n';
        str += loopBuffer + '\t}\n';
        str += loopBuffer + '\tif(' + t + ' != vec3(0.0, 0.0, 0.0)){\n';
        str += loopBuffer + '\t\tp.xyz += ' + t + ';\n';
        str += loopBuffer + '\t}\n';
        return str;
    }
}
class FoldMenger{
    constructor(){
        this.type = 'fold';

    }
    glsl(loopBuffer){
        return loopBuffer + '\tmengerFold(p);\n';
    }
}
class FoldPlane{
    constructor(n, d=0.0){
        this.n = n;
        this.d = d;
        this.type = 'fold';
    }
    glsl(loopBuffer){
        var n = compileVar(this.n);
        var d = compileVar(this.d);
        var str = ''
        str += loopBuffer + '\tif(' + n + ' == vec3(1.0, 0.0, 0.0)){\n'
        str += loopBuffer + '\t\tp.x = abs(p.x - ' + d + ') + ' + d + ';\n';
        str += loopBuffer + '\t} else if(' + n + ' == vec3(0.0, 1.0, 0.0)){\n'
        str += loopBuffer + '\t\tp.y = abs(p.y - ' + d + ') + ' + d + ';\n';
        str += loopBuffer + '\t} else if(' + n + ' == vec3(0.0, 0.0, 1.0)){\n'
        str += loopBuffer + '\t\tp.z = abs(p.z - ' + d + ') + ' + d + ';\n';
        str += loopBuffer + '\t} else if(' + n + ' == vec3(-1.0, 0.0, 0.0)){\n'
        str += loopBuffer + '\t\tp.x = -abs(p.x + ' + d + ') - ' + d + ';\n';
        str += loopBuffer + '\t} else if(' + n + ' == vec3(0.0, -1.0, 0.0)){\n'
        str += loopBuffer + '\t\tp.y = -abs(p.y + ' + d + ') - ' + d + ';\n';
        str += loopBuffer + '\t} else if(' + n + ' == vec3(0.0, 0.0, -1.0)){\n'
        str += loopBuffer + '\t\tp.z = -abs(p.z + ' + d + ') - ' + d + ';\n';
        str += loopBuffer + '\t} else{\n'
        str += loopBuffer + '\t\tplaneFold(p, ' + n + ', ' + d + ');\n'
        str += loopBuffer + '\t}\n'
        return str;
    }
}
class FoldScaleOrigin{
    constructor(s=1.0){
        this.type = "fold";
        this.s = s;
        this.o = [0,0,0];
    }
    glsl(loopBuffer){
        var str = '';
        var s = compileVar(this.s);
        str += loopBuffer + "\tif(" + s + " != 1.0){\n";
        str += loopBuffer + "\t\tp = p* " + s + ";\n\t\tp.w = abs(p.w);\n\t\tp += o;\n";
        str += loopBuffer + "\t} else {\n";
        str += loopBuffer + "\t\tp += o;\n";
        str += loopBuffer + "\t}\n";
        return str;
    }
}

class FoldSierpinski{
    constructor(){
        this.type ="fold"
    }
    glsl(loopBuffer){
        return loopBuffer + '\tsierpinskiFold(p);\n'
    }
}


// Orbit 
class OrbitInitZero{
    constructor(){
        this.type = "orbit";
    }
    /// Compiles orbit for glsl
    orbit(loopBuffer){
        return loopBuffer + '\tvec3 orbit = vec3(0.0);\n'
    }
}
class OrbitInitInf{
    constructor(){
        this.type = "orbit";
    }
    /// Compiles orbit for glsl
    orbit(loopBuffer){
        return loopBuffer + '\tvec3 orbit = vec3(1e20);\n'
    }
}
class OrbitMinAbs{
    constructor(scale=[1.0,1.0,1.0], origin=[0.0,0.0,0.0]){
        this.scale = scale;
        this.origin = origin;
        this.type = 'orbit';
    }
    orbit(loopBuffer){
        return loopBuffer + '\torbit = min(orbit, abs((p.xyz - ' + compileVar(this.origin) + ')*' + compileVar(this.scale) + '));\n'
    }
}
class OrbitMax{
    constructor(scale =[1,1,1], origin=[0,0,0]){
        this.scale = scale;
        this.origin = origin;
        this.type = 'orbit'
    }
    orbit(loopBuffer){
        return loopBuffer + '\torbit = max(orbit, (p.xyz - ' + compileVar(this.origin) + ')*' + compileVar(this.scale) + ');\n' 
    }
}