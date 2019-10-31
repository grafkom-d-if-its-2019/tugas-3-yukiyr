precision mediump float;

attribute vec2 vPosition;
attribute vec2 wPosition;
attribute vec3 vColor;
attribute vec3 xColor;
varying vec3 fColor;
varying vec3 dColor;
uniform float theta;
uniform float scaleX;
uniform float scaleY;
uniform float flag;

void main() {
  fColor = vColor;
  dColor = xColor;
  vec3 translate = vec3(0.0, -0.1, 0.0);
  
  mat4 translationMatrix = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translate, 1.0
  );

  vec3 translate2 = vec3(0.5, 0.0, 0.0);
  mat4 translationTriangles = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translate2, 1.0
  );
  
  vec3 translate3 = vec3(-0.4, 0.0, 0.0);
  mat4 translationLines = mat4(
    1.0, 0.0, 0.0, 0.0,
    0.0, 1.0, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    translate3, 1.0
  );

  mat4 rotationMatrix = mat4(
    cos(theta), sin(theta), 0.0, 0.0,
    -sin(theta), cos(theta), 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  
  mat4 scalationMatrix = mat4(
    scaleX, 0.0, 0.0, 0.0,
    0.0, scaleY, 0.0, 0.0,
    0.0, 0.0, 1.0, 0.0,
    0.0, 0.0, 0.0, 1.0
  );
  if (flag>=1.0)
  {
      gl_Position = translationTriangles * scalationMatrix * vec4(wPosition, 0.0, 1.0);
  }
  else if (flag<=0.0)
  {

      gl_Position = translationLines * translationMatrix * rotationMatrix * vec4(vPosition, 0.0, 1.0);
  }
}
