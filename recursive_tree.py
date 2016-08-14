import Rhino.Geometry as rg

#tree variables
lines = []


#Define a Function
def Branch(startPt, angle, length, gen, rotate, scale):
    vector = rg.Vector3d(0,length,0)
    rg.Vector3d.Rotate(vector, angle, rg.Vector3d(0,0,1))
    endPt = rg.Vector3d.Add(startPt, vector)

    lines.append(rg.Line(rg.Point3d(startPt),rg.Point3d(endPt)))

    if gen <= genMax:
        newAngleA = angle + rotate
        newAngleB = angle - rotate

        Branch(endPt, newAngleA, len*scale, gen+1, rot, scl)
        Branch(endPt, newAngleB, len*scale, gen+1, rot, scl)

    print(endPt)

start = rg.Vector3d(10,0,0)
rot = Rhino.RhinoMath.ToRadians(rot)

#Use Function
Branch(start, 0, len, 0, rot, scl)
