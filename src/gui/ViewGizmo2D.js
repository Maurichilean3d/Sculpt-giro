/**
 * Simple orientation widget rendered on a 2D canvas overlay.
 *
 * - Draws world axes (X=red, Y=green, Z=blue)
 * - Uses the camera view matrix to orient the axes
 * - Non-interactive (pointer-events: none)
 */

import { isZUp } from 'misc/AxesConfig';

class ViewGizmo2D {
  constructor(main) {
    this._main = main;
    this._canvas = document.getElementById('viewgizmo');
    this._ctx = this._canvas ? this._canvas.getContext('2d') : null;
    this._size = 90;
  }

  onResize() {
    if (!this._canvas) return;
    // Keep crisp on hiDPI
    const dpr = window.devicePixelRatio || 1;
    const cssSize = this._size;
    this._canvas.style.width = cssSize + 'px';
    this._canvas.style.height = cssSize + 'px';
    this._canvas.width = Math.floor(cssSize * dpr);
    this._canvas.height = Math.floor(cssSize * dpr);
    if (this._ctx) this._ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  render() {
    const ctx = this._ctx;
    const canvas = this._canvas;
    if (!ctx || !canvas) return;

    const cam = this._main.getCamera();
    const view = cam.getView();

    const s = this._size;
    const cx = s * 0.5;
    const cy = s * 0.5;
    const len = s * 0.32;

    ctx.clearRect(0, 0, s, s);
    ctx.globalAlpha = 0.9;
    ctx.lineWidth = 2;

    // World axes in the app convention. If Z-up, Y and Z swap visually.
    const axes = isZUp()
      ? [
          { v: [1, 0, 0], c: 'rgb(230,70,70)', label: 'X' },
          { v: [0, 0, 1], c: 'rgb(70,230,70)', label: 'Y' },
          { v: [0, 1, 0], c: 'rgb(70,70,230)', label: 'Z' }
        ]
      : [
          { v: [1, 0, 0], c: 'rgb(230,70,70)', label: 'X' },
          { v: [0, 1, 0], c: 'rgb(70,230,70)', label: 'Y' },
          { v: [0, 0, 1], c: 'rgb(70,70,230)', label: 'Z' }
        ];

    // Convert world axis to view-space direction (we use the rotational part of view)
    for (let i = 0; i < axes.length; ++i) {
      const a = axes[i];
      const vx = a.v[0], vy = a.v[1], vz = a.v[2];
      const x = view[0] * vx + view[4] * vy + view[8] * vz;
      const y = view[1] * vx + view[5] * vy + view[9] * vz;

      ctx.strokeStyle = a.c;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + x * len, cy - y * len);
      ctx.stroke();

      ctx.fillStyle = a.c;
      ctx.font = 'bold 12px Arial';
      ctx.fillText(a.label, cx + x * (len + 6), cy - y * (len + 6));
    }

    // center dot
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.beginPath();
    ctx.arc(cx, cy, 2.2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default ViewGizmo2D;
