// For all 3d Geometry definition

var state = {
  "name": "My Splyt",
  "left": {
    "right": {},
    "left": {
      "right": {},
      "left": {}
    }
  },
  "right": {
    "left":{
      "right": {},
      "left": {
        "left": {}
          }
      }
  }
};

// Define Splyt Dimensions

var splytSize = {
  small: { r : 9.25, bHeight : 30, armLength : 40 },
  large: { r : 9.25, bHeight : 70, armLength : 80 }
};

// Create the actual 3d Splyt

function createSplytUnit(size) {

  var r = size.r;
  var bHeight = size.bHeight;
  var armLength = size.armLength;
  var radSegments = 24;
  var heightSegments = 8;

  var base = new THREE.CylinderGeometry(r, r, bHeight, radSegments, heightSegments, false);
  base.translate(0, bHeight/2, 0);

  var rArm = new THREE.CylinderGeometry(r, r, armLength, radSegments, heightSegments, false);
  rArm.rotateZ(-Math.radians(30));
  rArm.translate( 0.25 * armLength, bHeight + 0.25 * armLength * Math.sqrt(3), 0);

  var lArm = new THREE.CylinderGeometry(r, r, armLength, radSegments, heightSegments, false);
  lArm.rotateZ( Math.radians(30) );
  lArm.translate( -0.25 * armLength, bHeight + 0.25 * armLength * Math.sqrt(3), 0);

  var materials = [
    new THREE.MeshLambertMaterial( { color:  0xFFF9DC, shading: THREE.SmoothShading } )
    //new THREE.MeshBasicMaterial( { color: 0x000000, wireframe: true , transparent: true, opacity: 0.1} )
  ];

  var smallYGeo = new THREE.Geometry();
  smallYGeo.merge(base, base.matrix);
  smallYGeo.merge(rArm, rArm.matrix);
  smallYGeo.merge(lArm, lArm.matrix);
  smallYGeo.rotateY(Math.radians( 0 ));		//180 * Math.random()

  var smallYMesh = new THREE.SceneUtils.createMultiMaterialObject(smallYGeo, materials);
  smallYMesh.name = name;

  return smallYMesh;
};



// haven't updated - a skeletal wireframe of a Splyt
function createSplytWires(){

  var skeleton = new THREE.Geometry();

  skeleton.vertices.push(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 40, 0),
      new THREE.Vector3(20, 64.6, 0),
      new THREE.Vector3(0, 40, 0),
      new THREE.Vector3(-20, 64.6, 0)
  );

  var lineMaterial = new THREE.LineBasicMaterial({color: 0x0000ff});

  var extrudeSettings = {
      steps	: 200,
      bevelEnabled	: false,
      extrudePath		: skeleton
  };

  var pline = new THREE.Line(skeleton, lineMaterial);
  return pline;
}
