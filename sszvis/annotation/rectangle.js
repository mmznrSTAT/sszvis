/**
 * Rectangle annotation
 *
 * A component for creating rectangular data areas. The component should be passed
 * an array of data values, each of which will be used to render a data area by
 * passing it through the accessor functions. You can specify a caption to display,
 * which can be offset from the center of the data area by specifying dx or dy properties.
 *
 * @module sszvis/annotation/rectangle
 *
 * @param {number, function} x        The x-position of the upper left corner of the data area.
 * @param {number, function} y        The y-position of the upper left corner of the data area.
 * @param {number, function} width    The width of the data area.
 * @param {number, function} height   The height of the data area.
 * @param {number, function} dx       The x-offset of the data area caption.
 * @param {number, function} dy       The y-offset of the data area caption.
 * @param {string, function} caption  The caption for the data area.
 *
 * @returns {d3.component} a rectangular data area component
 */
namespace('sszvis.annotation.rectangle', function(module) {
  'use strict';

  module.exports = function() {
    return d3.component()
      .prop('x', d3.functor)
      .prop('y', d3.functor)
      .prop('width', d3.functor)
      .prop('height', d3.functor)
      .prop('dx', d3.functor)
      .prop('dy', d3.functor)
      .prop('caption', d3.functor)
      .render(function(data) {
        var selection = d3.select(this);
        var props = selection.props();

        sszvis.svgUtils.ensureDefsElement(selection, 'pattern', 'data-area-pattern')
          .call(sszvis.patterns.dataAreaPattern);

        var dataArea = selection.selectAll('.sszvis-dataarearectangle')
          .data(data);

        dataArea.enter()
          .append('rect')
          .classed('sszvis-dataarearectangle', true);

        dataArea
          .attr('x', props.x)
          .attr('y', props.y)
          .attr('width', props.width)
          .attr('height', props.height)
          .attr('fill', 'url(#data-area-pattern)');

        if (props.caption) {
          var dataCaptions = selection.selectAll('.sszvis-dataarearectangle__caption')
            .data(data);

          dataCaptions.enter()
            .append('text')
            .classed('sszvis-dataarearectangle__caption', true);

          dataCaptions
            .attr('x', function(d, i) {
              return props.x(d, i) + props.width(d, i) / 2;
            })
            .attr('y', function(d, i) {
              return props.y(d, i) + props.height(d, i) / 2;
            })
            .attr('dx', props.dx)
            .attr('dy', props.dy)
            .text(props.caption);
        }
      });
  };

});
