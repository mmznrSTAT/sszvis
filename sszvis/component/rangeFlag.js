/**
 * Range Flag component
 *
 * The range flag component creates a pair of small white circles which fit well with the range ruler.
 * However, this is a separate component for implementation reasons, because the data for the range flag
 * should usually be only one value, distinct from the range ruler which expects multiple values. The range
 * flag also creates a tooltip anchor between the two dots, to which you can attach a tooltip. See the
 * interactive stacked area chart examples for a use of the range flag.
 *
 * @module sszvis/component/rangeFlag
 *
 * @property {number functor} x           A value for the x-value of the range flag
 * @property {number functor} y0          A value for the y-value of the lower range flag dot
 * @property {number functor} y1          A value for the y-value of the upper range flag dot
 *
 * @returns {d3.component}
 */
namespace('sszvis.component.rangeFlag', function(module) {
  'use strict';

  module.exports = function() {
    return d3.component()
      .prop('x', d3.functor)
      .prop('y0', d3.functor)
      .prop('y1', d3.functor)
      .render(function(data) {
        var selection = d3.select(this);
        var props = selection.props();

        var crispX = sszvis.fn.compose(sszvis.svgUtils.crisp.halfPixel, props.x);
        var crispY0 = sszvis.fn.compose(sszvis.svgUtils.crisp.halfPixel, props.y0);
        var crispY1 = sszvis.fn.compose(sszvis.svgUtils.crisp.halfPixel, props.y1);

        var bottomDot = selection.selectAll('.sszvis-rangeFlag__mark.bottom')
          .data(data);

        var topDot = selection.selectAll('.sszvis-rangeFlag__mark.top')
          .data(data);

        bottomDot
          .call(makeFlagDot)
          .classed('bottom', true)
          .attr('cx', crispX)
          .attr('cy', crispY0);

        topDot
          .call(makeFlagDot)
          .classed('top', true)
          .attr('cx', crispX)
          .attr('cy', crispY1);

        var tooltipAnchor = sszvis.component.tooltipAnchor()
          .position(function(d) {
            return [crispX(d), sszvis.svgUtils.crisp.halfPixel((props.y0(d) + props.y1(d)) / 2)];
          });

        selection.call(tooltipAnchor);
      });
  };

  function makeFlagDot(dot) {
    dot.enter()
      .append('circle')
      .attr('class', 'sszvis-rangeFlag__mark');

    dot.exit().remove();

    dot
      .attr('r', 3.5);
  }

});
