/*!
  * flowing-liquid v0.1.0
  * (c) 2018 Bowen<Github: lbwa>
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FlowingLiquid = factory());
}(this, (function () { 'use strict';

  class FlowingBody {
    constructor({
      canvasWidth,
      canvasHeight,
      waveWidth = 0.055,
      waveHeight = 6,
      xOffset = 0,
      speed = 0.04,
      colors = ['#DBB77A', '#BF8F3B']
    } = {}) {
      this.points = [];
      this.startX = 0;
      this.canvasWidth = canvasWidth;
      this.canvasHeight = canvasHeight;
      this.waveWidth = waveWidth;
      this.waveHeight = waveHeight;
      this.xOffset = xOffset;
      this.speed = speed;
      this.colors = colors;
    }

    getChartColor(ctx) {
      const radius = this.canvasWidth / 2;
      const grd = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
      grd.addColorStop(0, this.colors[0]);
      grd.addColorStop(1, this.colors[1]);
      return grd;
    }

    render(ctx) {
      const points = this.points;
      ctx.save();
      ctx.beginPath();
      this.points.forEach(point => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.lineTo(this.canvasWidth, this.canvasHeight);
      ctx.lineTo(this.startX, this.canvasHeight);
      ctx.lineTo(points[0].x, points[0].y);
      ctx.fillStyle = this.getChartColor(ctx);
      ctx.fill();
      ctx.restore();
    }

    createPointsMap({
      currentLine
    }) {
      this.points = [];
      const {
        startX,
        waveHeight,
        waveWidth,
        canvasWidth,
        canvasHeight,
        xOffset
      } = this;

      for (let x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
        const y = Math.sin((startX + x) * waveWidth + xOffset);
        this.points.push({
          x,
          y: canvasHeight * (1 - currentLine / 100) + y * waveHeight
        });
      }

      this.xOffset += this.speed;
    }

  }

  class FlowingLiquid {
    constructor({
      el,
      canvasWidth = 500,
      canvasHeight = 500,
      waterline = 60,
      colors = ['#F39C6B', '#A0563B', 'rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)']
    }) {
      if (typeof el !== 'string') throw new Error('Parameter el should be a String !');
      const canvas = this.canvas = document.querySelector(el);
      this.canvasWidth = canvas.width = canvasWidth;
      this.canvasHeight = canvas.height = canvasHeight;
      this.hasRenderedContainer = false; // control flowing wave current height

      this.currentLine = 0; // control flowing wave target height

      this.waterline = waterline;
      this.colors = colors;
      this.waves = [new FlowingBody({
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        waveWidth: 0.055,
        waveHeight: 4,
        colors: [this.colors[0], this.colors[1]],
        xOffset: 0,
        speed: 0.04
      }), new FlowingBody({
        canvasWidth: this.canvasWidth,
        canvasHeight: this.canvasHeight,
        waveWidth: 0.04,
        waveHeight: 7,
        colors: [this.colors[2], this.colors[3]],
        xOffset: 2,
        speed: 0.02
      })];
    }
    /**
     * @param {Number} waveSpacing control multiple wave spacing
     */


    render(waveSpacing = 5) {
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      if (!this.hasRenderedContainer) this.drawContainer(ctx);
      if (this.currentLine < this.waterline) this.currentLine += 1;
      this.waves.forEach((wave, index) => {
        wave.createPointsMap({
          currentLine: this.currentLine + index * waveSpacing
        });
        wave.render(ctx);
      });
      window.requestAnimationFrame(this.render.bind(this, waveSpacing));
    }

    drawContainer(ctx) {
      const radius = this.canvasWidth / 2;
      const lineWidth = 4;
      const innerRadius = radius - lineWidth;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.arc(radius, radius, innerRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(186, 165, 130, 0.3)';
      ctx.stroke();
      ctx.clip();
      this.hasRenderedContainer = true;
    }

  }

  return FlowingLiquid;

})));
