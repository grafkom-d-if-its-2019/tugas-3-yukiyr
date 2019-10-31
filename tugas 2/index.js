(function() {

  glUtils.SL.init({ callback: function() { main(); }});
  function main() {
    var canvas = document.getElementById("glcanvas");
    var gl = glUtils.checkWebGL(canvas);
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    var program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    gl.useProgram(program);

    // Mendefinisikan verteks-verteks
    var vertices = [
      // x, y       r, g, b
      -0.09, 0.0,     1.0, 1.0, 0.0,  // kuning
      -0.36, 0.5,    0.0, 1.0, 1.0,  // cyan
      
      -0.36, 0.5,     1.0, 1.0, 0.0,  // kuning
      -0.18, 0.5,    0.0, 1.0, 1.0,  // cyan

      -0.18, 0.5,     1.0, 1.0, 0.0,  // kuning
      0.0, 0.0,    0.0, 1.0, 1.0,  // cyan

      0.0, 0.0,     1.0, 1.0, 0.0,  // kuning
      0.18, 0.5,    0.0, 1.0, 1.0,  // cyan

      0.18, 0.5,     1.0, 1.0, 0.0,  // kuning
      0.36, 0.5,    0.0, 1.0, 1.0,  // cyan

      0.36, 0.5,     1.0, 1.0, 0.0,  // kuning
      0.09, 0.0,    0.0, 1.0, 1.0,  // cyan

      0.09, 0.0,     1.0, 1.0, 0.0,  // kuning
      0.09, -0.6,    0.0, 1.0, 1.0,  // cyan

      0.09, -0.6,     1.0, 1.0, 0.0,  // kuning
      -0.09, -0.6,    0.0, 1.0, 1.0,  // cyan

      -0.09, -0.6,     1.0, 1.0, 0.0,  // kuning
      -0.09, 0.0,    0.0, 1.0, 1.0,  // cyan
    ];

    var vertices_2 = [
      -0.09, 0.0,    1.0, 1.0, 0.0,
      -0.36, 0.5,      0.0, 1.0, 1.0,
      -0.18, 0.5,     0.0, 1.0, 1.0,

      -0.18, 0.5,    1.0, 1.0, 0.0,
      -0.09, 0.0,      0.0, 1.0, 1.0,
      0.0, 0.0,     0.0, 1.0, 1.0,

      0.0, 0.0,    1.0, 1.0, 0.0,
      0.18, 0.5,      0.0, 1.0, 1.0,
      0.36, 0.5,     0.0, 1.0, 1.0,

      0.36, 0.5,    1.0, 1.0, 0.0,
      0.0, 0.0,      0.0, 1.0, 1.0,
      0.09, 0.0,     0.0, 1.0, 1.0,

      0.09, 0.0,    1.0, 1.0, 0.0,
      0.09, -0.7,      0.0, 1.0, 1.0,
      -0.09, 0.0,     0.0, 1.0, 1.0,

      -0.09, 0.0,    1.0, 1.0, 0.0,
      -0.09, -0.7,      0.0, 1.0, 1.0,
      0.09, -0.7,     0.0, 1.0, 1.0
    ];

    // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    
    // Membuat sambungan untuk attribute vPosition
    var vPosition = gl.getAttribLocation(program, 'vPosition');
    var vColor = gl.getAttribLocation(program, 'vColor');
    gl.vertexAttribPointer(
      vPosition,    // variabel yang memegang posisi attribute di shader
      2,            // jumlah elemen per atribut
      gl.FLOAT,     // tipe data atribut
      gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(vPosition);
    gl.enableVertexAttribArray(vColor);

    // Membuat vertex buffer object (CPU Memory <==> GPU Memory)
    var vertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices_2), gl.STATIC_DRAW);

    // Membuat sambungan untuk attribute wPosition
    var wPosition = gl.getAttribLocation(program, 'wPosition');
    var xColor = gl.getAttribLocation(program, 'xColor');
    gl.vertexAttribPointer(
      wPosition,    // variabel yang memegang posisi attribute di shader
      2,            // jumlah elemen per atribut
      gl.FLOAT,     // tipe data atribut
      gl.FALSE, 
      5 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks (overall) 
      0                                   // offset dari posisi elemen di array
    );
    gl.vertexAttribPointer(xColor, 3, gl.FLOAT, gl.FALSE,
      5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
    gl.enableVertexAttribArray(wPosition);
    gl.enableVertexAttribArray(xColor);

    // Membuat sambungan untuk uniform
    var thetaUniformLocation = gl.getUniformLocation(program, 'theta');
    var theta = 0;
    var scaleXUniformLocation = gl.getUniformLocation(program, 'scaleX');
    var scaleX = 1.0;
    gl.uniform1f(scaleXUniformLocation, scaleX);
    var scaleYUniformLocation = gl.getUniformLocation(program, 'scaleY');
    var scaleY = 1.0;
    gl.uniform1f(scaleYUniformLocation, scaleY);
    var flagUniformLocation = gl.getUniformLocation(program, 'flag');
    var flag = 1.0;
    gl.uniform1f(flagUniformLocation, flag);

    var melebar = 1.0;

    function render() {
      theta += 0.023;
      gl.uniform1f(thetaUniformLocation, theta);

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      flag=1.0;
      gl.uniform1f(flagUniformLocation, flag);
      gl.drawArrays(gl.TRIANGLES, 0, 18);

      if (scaleX >= 1.0) melebar = -1.0;
      else if (scaleX <= -1.0) melebar = 1.0;
      scaleX += 0.023 * melebar;
      gl.uniform1f(scaleXUniformLocation, scaleX);
      flag=0.0;
      gl.uniform1f(flagUniformLocation, flag);
      gl.drawArrays(gl.LINES, 0, 18);
  
      requestAnimationFrame(render);
      }
    render();
  }
})();