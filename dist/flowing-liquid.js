/*!
  * flowing-liquid v0.4.0
  * (c) 2018 Bowen<Github: lbwa>
  * @license MIT
  */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.FlowingLiquid = factory());
}(this, (function () { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
          return Object.getOwnPropertyDescriptor(source, sym).enumerable;
        }));
      }

      ownKeys.forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }

  class FlowingBody {
    constructor({
      canvasWidth,
      canvasHeight,
      waveWidth = 0.055,
      waveHeight = 6,
      xOffset = 0,
      speed = 0.04,
      colors = ['#DBB77A', '#BF8F3B']
    }) {
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

    createFillColor(ctx) {
      if (typeof this.colors === 'string') return this.colors;
      const radius = this.canvasWidth / 2;
      const gradient = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
      gradient.addColorStop(0, this.colors[0]);
      gradient.addColorStop(1, this.colors[1]);
      return gradient;
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
      ctx.fillStyle = this.createFillColor(ctx);
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

      this.xOffset = this.xOffset > 2 * Math.PI ? 0 : this.xOffset + this.speed;
    }

  }

  class FlowingLiquid {
    constructor({
      el,
      canvasWidth = 500,
      canvasHeight = 500,
      waterline = 60,
      flowingBody = [{
        waveWidth: 0.055,
        waveHeight: 4,
        colors: ['#F39C6B', '#A0563B'],
        xOffset: 0,
        speed: 0.08
      }, {
        waveWidth: 0.04,
        waveHeight: 7,
        colors: ['rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)'],
        xOffset: 2,
        speed: 0.02
      }],
      font = {
        bold: true,
        color: '',
        size: 50,
        family: 'Microsoft Yahei',
        text: ''
      },
      background = {
        color: 'rgba(186, 165, 130, 0.3)',
        style: 'stroke'
      }
    }) {
      if (typeof el !== 'string') throw new Error('Parameter el should be a String !');
      const canvas = this.canvas = document.querySelector(el);
      this.canvasWidth = canvas.width = canvasWidth;
      this.canvasHeight = canvas.height = canvasHeight;
      this.hasRenderedContainer = false; // control flowing wave current height

      this.currentLine = 0; // control flowing wave target height

      this.waterline = waterline <= 100 ? waterline : 100;
      this.font = font;
      this.background = background;
      this.waves = flowingBody.map(bodyOption => {
        return new FlowingBody(_objectSpread({
          canvasWidth: this.canvasWidth,
          canvasHeight: this.canvasHeight
        }, bodyOption));
      }); // replace `context.clip()`
      // `context.clip()` will occur frame dropping on the mobile device (eg. IOS)

      this.canvas.style.borderRadius = '50%';
    }
    /**
     * @param {Number} waveSpacing control multiple wave spacing
     */


    render(waveSpacing = 5, showText = false) {
      const ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
      if (!this.hasRenderedContainer) this.renderContainer(ctx, this.background);
      if (this.currentLine < this.waterline) this.currentLine += 1;
      this.waves.forEach((wave, index) => {
        wave.createPointsMap({
          currentLine: this.currentLine + index * waveSpacing
        });
        wave.render(ctx);
        if (showText) this.renderText(ctx, `${this.currentLine}`);
      });
      window.requestAnimationFrame(this.render.bind(this, waveSpacing, showText, this.background));
    }

    renderText(ctx, text) {
      const font = this.font;
      const fontStyle = `${font.bold ? 'bold' : ''} ` + `${font.size || 50}px ` + `${font.family || 'Microsoft Yahei'}`;
      ctx.font = fontStyle;
      ctx.fillStyle = font.color || '#24292e';
      ctx.textAlign = 'center';
      ctx.fillText(font.text ? font.text : text, this.canvasWidth / 2, this.canvasHeight / 2 + (this.font.size || 50) / 2);
    }

    renderContainer(ctx, background) {
      const radius = this.canvasWidth / 2;
      const lineWidth = background.style === 'fill' ? 0 : 4;
      const innerRadius = radius - lineWidth;
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      ctx.arc(radius + 0.5, radius + 0.5, innerRadius, 0, 2 * Math.PI);
      this.createContainerBackground(ctx, background); // ctx.clip() // Drop frame risk on the mobile device (eg.IOS)
      // `stroke` style will render only once

      if (background.style === 'stroke') this.hasRenderedContainer = true;
    }

    createContainerBackground(ctx, {
      color,
      style
    }) {
      if (style === 'stroke') {
        ctx.strokeStyle = color || 'rgba(186, 165, 130, 0.3)';
        ctx.stroke();
        return;
      }

      if (style === 'fill') {
        ctx.fillStyle = color || 'rgba(186, 165, 130, 0.3)';
        ctx.fill();
        return;
      }
    }

  }

  return FlowingLiquid;

})));
