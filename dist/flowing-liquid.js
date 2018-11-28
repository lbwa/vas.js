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

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

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

  var FlowingBody =
  /*#__PURE__*/
  function () {
    function FlowingBody(_ref) {
      var canvasWidth = _ref.canvasWidth,
          canvasHeight = _ref.canvasHeight,
          _ref$waveWidth = _ref.waveWidth,
          waveWidth = _ref$waveWidth === void 0 ? 0.055 : _ref$waveWidth,
          _ref$waveHeight = _ref.waveHeight,
          waveHeight = _ref$waveHeight === void 0 ? 6 : _ref$waveHeight,
          _ref$xOffset = _ref.xOffset,
          xOffset = _ref$xOffset === void 0 ? 0 : _ref$xOffset,
          _ref$speed = _ref.speed,
          speed = _ref$speed === void 0 ? 0.04 : _ref$speed,
          _ref$colors = _ref.colors,
          colors = _ref$colors === void 0 ? ['#DBB77A', '#BF8F3B'] : _ref$colors;

      _classCallCheck(this, FlowingBody);

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

    _createClass(FlowingBody, [{
      key: "createFillColor",
      value: function createFillColor(ctx) {
        if (typeof this.colors === 'string') return this.colors;
        var radius = this.canvasWidth / 2;
        var gradient = ctx.createLinearGradient(radius, radius, radius, this.canvasHeight);
        gradient.addColorStop(0, this.colors[0]);
        gradient.addColorStop(1, this.colors[1]);
        return gradient;
      }
    }, {
      key: "render",
      value: function render(ctx) {
        var points = this.points;
        ctx.save();
        ctx.beginPath();
        this.points.forEach(function (point) {
          ctx.lineTo(point.x, point.y);
        });
        ctx.lineTo(this.canvasWidth, this.canvasHeight);
        ctx.lineTo(this.startX, this.canvasHeight);
        ctx.lineTo(points[0].x, points[0].y);
        ctx.fillStyle = this.createFillColor(ctx);
        ctx.fill();
        ctx.restore();
      }
    }, {
      key: "createPointsMap",
      value: function createPointsMap(_ref2) {
        var currentLine = _ref2.currentLine;
        this.points = [];
        var startX = this.startX,
            waveHeight = this.waveHeight,
            waveWidth = this.waveWidth,
            canvasWidth = this.canvasWidth,
            canvasHeight = this.canvasHeight,
            xOffset = this.xOffset;

        for (var x = startX; x < startX + canvasWidth; x += 20 / canvasWidth) {
          var y = Math.sin((startX + x) * waveWidth + xOffset);
          this.points.push({
            x: x,
            y: canvasHeight * (1 - currentLine / 100) + y * waveHeight
          });
        }

        this.xOffset = this.xOffset > 2 * Math.PI ? 0 : this.xOffset + this.speed;
      }
    }]);

    return FlowingBody;
  }();

  var FlowingLiquid =
  /*#__PURE__*/
  function () {
    function FlowingLiquid(_ref) {
      var _this = this;

      var el = _ref.el,
          _ref$canvasWidth = _ref.canvasWidth,
          canvasWidth = _ref$canvasWidth === void 0 ? 500 : _ref$canvasWidth,
          _ref$canvasHeight = _ref.canvasHeight,
          canvasHeight = _ref$canvasHeight === void 0 ? 500 : _ref$canvasHeight,
          _ref$waterline = _ref.waterline,
          waterline = _ref$waterline === void 0 ? 60 : _ref$waterline,
          _ref$flowingBody = _ref.flowingBody,
          flowingBody = _ref$flowingBody === void 0 ? [{
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
      }] : _ref$flowingBody,
          _ref$font = _ref.font,
          font = _ref$font === void 0 ? {
        bold: true,
        color: '',
        size: 50,
        family: 'Microsoft Yahei',
        text: ''
      } : _ref$font,
          _ref$background = _ref.background,
          background = _ref$background === void 0 ? {
        color: 'rgba(186, 165, 130, 0.3)',
        style: 'stroke'
      } : _ref$background;

      _classCallCheck(this, FlowingLiquid);

      if (typeof el !== 'string') throw new Error('Parameter el should be a String !');
      var canvas = this.canvas = document.querySelector(el);
      this.canvasWidth = canvas.width = canvasWidth;
      this.canvasHeight = canvas.height = canvasHeight;
      this.hasRenderedContainer = false; // control flowing wave current height

      this.currentLine = 0; // control flowing wave target height

      this.waterline = waterline <= 100 ? waterline : 100;
      this.font = font;
      this.background = background;
      this.waves = flowingBody.map(function (bodyOption) {
        return new FlowingBody(_objectSpread({
          canvasWidth: _this.canvasWidth,
          canvasHeight: _this.canvasHeight
        }, bodyOption));
      }); // replace `context.clip()`
      // `context.clip()` will occur frame dropping on the mobile device (eg. IOS)

      this.canvas.style.borderRadius = '50%';
    }
    /**
     * @param {Number} waveSpacing control multiple wave spacing
     */


    _createClass(FlowingLiquid, [{
      key: "render",
      value: function render() {
        var _this2 = this;

        var waveSpacing = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 5;
        var showText = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        if (!this.hasRenderedContainer) this.renderContainer(ctx, this.background);
        if (this.currentLine < this.waterline) this.currentLine += 1;
        this.waves.forEach(function (wave, index) {
          wave.createPointsMap({
            currentLine: _this2.currentLine + index * waveSpacing
          });
          wave.render(ctx);
          if (showText) _this2.renderText(ctx, "".concat(_this2.currentLine));
        });
        window.requestAnimationFrame(this.render.bind(this, waveSpacing, showText, this.background));
      }
    }, {
      key: "renderText",
      value: function renderText(ctx, text) {
        var font = this.font;
        var fontStyle = "".concat(font.bold ? 'bold' : '', " ") + "".concat(font.size || 50, "px ") + "".concat(font.family || 'Microsoft Yahei');
        ctx.font = fontStyle;
        ctx.fillStyle = font.color || '#24292e';
        ctx.textAlign = 'center';
        ctx.fillText(font.text ? font.text : text, this.canvasWidth / 2, this.canvasHeight / 2 + (this.font.size || 50) / 2);
      }
    }, {
      key: "renderContainer",
      value: function renderContainer(ctx, background) {
        var radius = this.canvasWidth / 2;
        var lineWidth = background.style === 'fill' ? 0 : 4;
        var innerRadius = radius - lineWidth;
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.arc(radius + 0.5, radius + 0.5, innerRadius, 0, 2 * Math.PI);
        this.createContainerBackground(ctx, background); // ctx.clip() // Drop frame risk on the mobile device (eg.IOS)
        // `stroke` style will render only once

        if (background.style === 'stroke') this.hasRenderedContainer = true;
      }
    }, {
      key: "createContainerBackground",
      value: function createContainerBackground(ctx, _ref2) {
        var color = _ref2.color,
            style = _ref2.style;

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
    }]);

    return FlowingLiquid;
  }();

  return FlowingLiquid;

})));
