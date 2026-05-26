"use client";
import { useEffect, useRef } from "react";

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision mediump float;
uniform float u_time;
uniform vec2 u_res;
uniform vec2 u_mouse;

vec3 lime    = vec3(0.769, 1.0, 0.0);
vec3 darkGreen = vec3(0.02, 0.12, 0.0);
vec3 nearBlack = vec3(0.04, 0.04, 0.04);

float sdot(vec2 a, vec2 b) {
  return clamp(dot(a, b), 0.0, 1.0);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / u_res) * 2.0 - 1.0;
  uv.x *= u_res.x / u_res.y;

  // 4 control points moving on slow sine waves
  vec2 p0 = vec2(sin(u_time * 0.31) * 0.6, cos(u_time * 0.27) * 0.5);
  vec2 p1 = vec2(cos(u_time * 0.19) * 0.5, sin(u_time * 0.23) * 0.6);
  vec2 p2 = vec2(sin(u_time * 0.22 + 1.0) * 0.7, cos(u_time * 0.15 + 2.0) * 0.4);
  vec2 p3 = vec2(cos(u_time * 0.28 + 0.5) * 0.4, sin(u_time * 0.33 + 1.5) * 0.5);

  // Mouse gravity — pulls control point p0
  vec2 mouse = (u_mouse / u_res) * 2.0 - 1.0;
  mouse.y = -mouse.y;
  mouse.x *= u_res.x / u_res.y;
  float mdist = distance(uv, mouse);
  float pull = smoothstep(0.5, 0.0, mdist) * 0.18;
  p0 += normalize(mouse - p0) * pull;

  float d0 = 1.0 / (length(uv - p0) + 0.3);
  float d1 = 1.0 / (length(uv - p1) + 0.5);
  float d2 = 1.0 / (length(uv - p2) + 0.4);
  float d3 = 1.0 / (length(uv - p3) + 0.6);

  float total = d0 + d1 + d2 + d3;
  float w0 = d0 / total;
  float w1 = d1 / total;
  float w2 = d2 / total;
  float w3 = d3 / total;

  vec3 col = lime * w0 + darkGreen * w1 + nearBlack * w2 + nearBlack * w3;
  col = mix(nearBlack, col, 0.7);

  gl_FragColor = vec4(col, 1.0);
}
`;

function createShader(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return s;
}

export default function WebGLGradient() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;

    const vert = createShader(gl, gl.VERTEX_SHADER, VERT);
    const frag = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vert!);
    gl.attachShader(prog, frag!);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const aPos = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    let start = performance.now();
    const draw = (now: number) => {
      const t = (now - start) / 1000;
      gl.uniform1f(uTime, t);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      gl.deleteProgram(prog);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full"
      aria-hidden="true"
    />
  );
}
