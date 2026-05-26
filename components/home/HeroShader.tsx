"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}`;

const FRAG = `precision mediump float;
uniform vec2 u_res;
uniform vec2 u_p0;uniform vec2 u_p1;uniform vec2 u_p2;uniform vec2 u_p3;
const vec3 LIME=vec3(0.769,1.000,0.000);
const vec3 LIME_DIM=vec3(0.659,0.851,0.000);
const vec3 DARK=vec3(0.020,0.118,0.020);
const vec3 INK=vec3(0.039,0.039,0.039);
float wt(vec2 uv,vec2 p){float d=distance(uv,p);return 1.0/(d*d*6.0+0.05);}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res.xy;
  float ar=u_res.x/u_res.y;
  vec2 cuv=vec2(uv.x*ar,uv.y);
  float w0=wt(cuv,vec2(u_p0.x*ar,u_p0.y));
  float w1=wt(cuv,vec2(u_p1.x*ar,u_p1.y));
  float w2=wt(cuv,vec2(u_p2.x*ar,u_p2.y));
  float w3=wt(cuv,vec2(u_p3.x*ar,u_p3.y));
  float t=w0+w1+w2+w3;
  vec3 col=(LIME*w0+LIME_DIM*w1+DARK*w2+INK*w3)/t;
  col=mix(INK,col,0.55);
  gl_FragColor=vec4(col,1.0);
}`;

type Props = { onFallback?: () => void };

export default function HeroShader({ onFallback }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      depth: false,
      premultipliedAlpha: true,
      powerPreference: "high-performance",
    }) as WebGLRenderingContext | null;
    if (!gl) {
      onFallback?.();
      return;
    }

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return sh;
    };

    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      onFallback?.();
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aLoc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(aLoc);
    gl.vertexAttribPointer(aLoc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uP = [
      gl.getUniformLocation(prog, "u_p0"),
      gl.getUniformLocation(prog, "u_p1"),
      gl.getUniformLocation(prog, "u_p2"),
      gl.getUniformLocation(prog, "u_p3"),
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = 0.5;
    let my = 0.5;
    let smx = 0.5;
    let smy = 0.5;
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mx = (e.clientX - rect.left) / rect.width;
      my = 1 - (e.clientY - rect.top) / rect.height;
    };
    window.addEventListener("mousemove", onMouse);

    let frames = 0;
    let lastSample = performance.now();
    let lowStreak = 0;
    let rafId = 0;
    let alive = true;
    const start = performance.now();

    const render = (now: number) => {
      if (!alive) return;
      const t = (now - start) / 1000;

      smx += (mx - smx) * 0.08;
      smy += (my - smy) * 0.08;

      const w = (Math.PI * 2) / 20;
      const basePts: [number, number][] = [
        [0.2 + 0.18 * Math.sin(t * w), 0.75 + 0.12 * Math.cos(t * w * 1.1)],
        [0.8 + 0.15 * Math.cos(t * w * 0.85), 0.25 + 0.15 * Math.sin(t * w * 0.95)],
        [0.3 + 0.2 * Math.sin(t * w * 1.2), 0.3 + 0.1 * Math.cos(t * w * 1.05)],
        [0.75 + 0.12 * Math.cos(t * w * 1.15), 0.7 + 0.18 * Math.sin(t * w * 0.9)],
      ];

      const radius = 0.22;
      const strength = 0.08;
      for (let i = 0; i < 4; i++) {
        const [bx, by] = basePts[i];
        const dx = smx - bx;
        const dy = smy - by;
        const d = Math.hypot(dx, dy);
        const pull = d < radius ? (1 - d / radius) * strength : 0;
        gl.uniform2f(uP[i], bx + dx * pull, by + dy * pull);
      }
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      frames++;
      if (frames >= 60) {
        const dt = now - lastSample;
        const fps = (frames * 1000) / dt;
        if (fps < 50) {
          lowStreak++;
          if (lowStreak >= 2) {
            alive = false;
            onFallback?.();
            return;
          }
        } else {
          lowStreak = 0;
        }
        frames = 0;
        lastSample = now;
      }

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [onFallback]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block h-full w-full"
      aria-hidden="true"
    />
  );
}
