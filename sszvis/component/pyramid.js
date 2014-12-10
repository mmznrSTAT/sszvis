/**
 * Pyramid component
 *
 * The pyramid component is primarily used to show a distribution of age groups
 * in a population (population pyramid). The chart is mirrored vertically,
 * meaning that it has a horizontal axis that extends in a positive and negative
 * direction having the same domain.
 *
 * This chart's horizontal point of origin is at it's spine, i.e. the center of
 * the chart.
 *
 * @module sszvis/component/pyramid
 *
 * @requires sszvis.component.bar
 *
 * @property {number, d3.scale} [barFill]          The color of a bar
 * @property {number, d3.scale} barHeight          The height of a bar
 * @property {number, d3.scale} barWidth           The width of a bar
 * @property {number, d3.scale} barPosition        The vertical position of a bar
 * @property {function}         leftAccessor       Data for the left side
 * @property {function}         rightAccessor      Data for the right side
 * @property {function}         [leftRefAccessor]  Reference data for the left side
 * @property {function}         [rightRefAccessor] Reference data for the right side
 *
 * @return {d3.component}
 */
sszvis_namespace('sszvis.component.pyramid', function(module) {
  'use strict';

  /* Constants
  ----------------------------------------------- */
  var SPINE_PADDING = 0.5;


  /* Module
  ----------------------------------------------- */
  module.exports = function() {
    return d3.component()
      .prop('barHeight', d3.functor)
      .prop('barWidth', d3.functor)
      .prop('barPosition', d3.functor)
      .prop('barFill', d3.functor).barFill('#000')
      .prop('leftAccessor')
      .prop('rightAccessor')
      .prop('leftRefAccessor')
      .prop('rightRefAccessor')
      .render(function(data) {
        var selection = d3.select(this);
        var props = selection.props();


        // Components

        var leftBar = sszvis.component.bar()
          .x(function(d){ return -SPINE_PADDING - props.barWidth(d); })
          .y(props.barPosition)
          .height(props.barHeight)
          .width(props.barWidth)
          .fill(props.barFill)
          .centerTooltip(true);

        var rightBar = sszvis.component.bar()
          .x(SPINE_PADDING)
          .y(props.barPosition)
          .height(props.barHeight)
          .width(props.barWidth)
          .fill(props.barFill)
          .centerTooltip(true);

        var leftLine = lineComponent()
          .barPosition(props.barPosition)
          .barWidth(props.barWidth)
          .mirror(true);

        var rightLine = lineComponent()
          .barPosition(props.barPosition)
          .barWidth(props.barWidth);


        // Rendering

        selection.selectGroup('left')
          .datum(props.leftAccessor(data))
          .call(leftBar);

        selection.selectGroup('right')
          .datum(props.rightAccessor(data))
          .call(rightBar);

        selection.selectGroup('leftReference')
          .datum(props.leftRefAccessor ? [props.leftRefAccessor(data)] : [])
          .call(leftLine);

        selection.selectGroup('rightReference')
          .datum(props.rightRefAccessor ? [props.rightRefAccessor(data)] : [])
          .call(rightLine);

      });
  };


  function lineComponent() {
    return d3.component()
      .prop('barPosition')
      .prop('barWidth')
      .prop('mirror').mirror(false)
      .render(function(data) {
        var selection = d3.select(this);
        var props = selection.props();

        var lineGen = d3.svg.line()
          .x(props.barWidth)
          .y(props.barPosition);

        var line = selection.selectAll('.sszvis-pyramid__referenceline')
          .data(data);

        line.enter()
          .append('path')
          .attr('class', 'sszvis-pyramid__referenceline');

        line
          .attr('transform', props.mirror ? 'scale(-1, 1)' : '')
          .transition()
          .call(sszvis.transition)
          .attr('d', lineGen);

        line.exit().remove();
      });
  }

});
