// Use or create your own fractal setups in this file

// Tree
function Tree(){
    var obj = new FractalObject()
    obj.add(new OrbitInitInf())
	obj.add(new LoopStart('VAR_5'));
	obj.add(new FoldRotateY(0.44))
	obj.add(new FoldAbs())
	obj.add(new FoldMenger())
	obj.add(new OrbitMinAbs([ 0.24, 2.28, 7.6]))
	obj.add(new FoldScaleTranslate('VAR_0', [-2,-4.8,0]))
	obj.add(new FoldPlane([0,0,-1], 0))
	obj.add(new LoopEnd());
    obj.add(new Box([4.8, 4.8, 4.8], [0.0,0.0,0.0], 'orbit'));
	setStartValueForVar('VAR_0', 1.3);
	setStartValueForVar('VAR_5', 30);
    return obj
}

// Cathedral
function MandelBox(){
    var obj = new FractalObject()
	obj.add(new OrbitInitInf())
	obj.add(new LoopStart('VAR_5')); // 16
	obj.add(new FoldBox([1.0, 1.0, 1.0]))
	obj.add(new FoldSphere(0.5, 1.0))
	obj.add(new FoldScaleOrigin(2.0))
	obj.add(new OrbitMinAbs([1.0, 1.0, 1.0]))
	obj.add(new LoopEnd());
	obj.add(new Box([6.0, 6.0, 6.0], [0.0,0.0,0.0],'orbit'))
	setStartValueForVar('VAR_5', 16);
	return obj
}

// Blocky thing
function Mausoleum(){
    var obj = new FractalObject()
	obj.add(new OrbitInitZero())
	obj.add(new LoopStart('VAR_5')); 
	obj.add(new FoldBox([0.34, 0.34, 0.34]))
	obj.add(new FoldMenger())
	obj.add(new FoldScaleTranslate('VAR_0', [-5.27,-0.34,0.0]))
	obj.add(new FoldRotateX(PI/2))
	obj.add(new OrbitMax([0.42,0.38,0.19]))
	obj.add(new LoopEnd());
	obj.add(new Box([2.0, 2.0, 2.0], [0.0,0.0,0.0],'orbit'))
	setStartValueForVar('VAR_5', 8);
	setStartValueForVar('VAR_0', 3.28);
	return obj
}

//Menger Sponge
function Menger(){
	var obj = new FractalObject()
	obj.add(new LoopStart('VAR_5'));
	obj.add(new FoldAbs())
	obj.add(new FoldMenger())
	obj.add(new FoldScaleTranslate('VAR_0', [-2,-2,0])) // 3.0
	obj.add(new FoldPlane([0,0,-1], -1))
	obj.add(new LoopEnd());
	obj.add(new Box([2.0, 2.0, 2.0], [0.0,0.0,0.0], [0.2, 0.5, 1]))
	setStartValueForVar('VAR_5', 8);
	setStartValueForVar('VAR_0', 3.0);
	return obj
}

function Learner(){
	var obj = new FractalObject()
	obj.add(new LoopStart('VAR_5'));
	obj.add(new FoldMenger())
	obj.add(new FoldScaleTranslate('VAR_0', [-1,-0,0]))
	obj.add(new LoopEnd());
	obj.add(new Box([2.0, 2.0, 2.0], [0.0,0.0,0.0], [1, 0.5, 1]))
	setStartValueForVar('VAR_5', 8);
	setStartValueForVar('VAR_0', 3.0);
	return obj
}

// New 1

function Random1(){
    var obj = new FractalObject()
    obj.add(new OrbitInitInf())
    for(var i=0; i<30; i++){
    }
    obj.add(new Box([1.0, 1.0, 1.0], [0.0,0.0,0.0], 'orbit'));
    return obj
}

function sierpinski_tetrahedron(){
	var obj = new FractalObject()
	obj.add(new OrbitInitZero())
	for (var i=0; i<10; i++){
		obj.add(new FoldSierpinski())
        obj.add(new FoldScaleTranslate('VAR_0', [-1, -1, -1]))
    }
	obj.add(new Tetrahedron(1.0, [0,0,0], [0.8,0.8,0.5]))
    return obj
}

function snow_stadium(){
	var obj = new FractalObject()
	obj.add(new OrbitInitInf())
	obj.add(new LoopStart('VAR_5')); // 30
	obj.add(new FoldRotateY('VAR_1')) //3.33
	obj.add(new FoldSierpinski())
	obj.add(new FoldRotateX('VAR_2'))// 0.15
	obj.add(new FoldMenger())
	obj.add(new FoldScaleTranslate('VAR_0', [-6.61, -4.0, -2.42])) // (1.57, [-6.61, -4.0, -2.42])) 
	obj.add(new OrbitMinAbs(1.0))
	obj.add(new LoopEnd());
	obj.add(new Box([4.8, 4.8, 4.8], [0.0, 0.0, 0.0], 'orbit'))
	setStartValueForVar('VAR_0', 1.57);
	setStartValueForVar('VAR_1', 3.33);
	setStartValueForVar('VAR_2', 0.15);
	setStartValueForVar('VAR_5', 30);
    return obj
}