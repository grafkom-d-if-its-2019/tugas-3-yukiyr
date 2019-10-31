precision mediump float;

varying vec3 fColor;
varying vec3 dColor;

void main() {
  gl_FragColor = vec4(fColor, 1.0);
  gl_FragColor = vec4(dColor, 1.0);
}
