/**
 * Legend component
 *
 * @module sszvis/legend
 */
namespace('sszvis.legend.colorRange', function(module) {

  module.exports = function() {
    return d3.component()
      .prop('scale')
      .prop('width')
      .prop('segments').segments(8)
      .render(function() {
        var selection = d3.select(this);
        var props = selection.props();

        var values = props.scale.ticks(props.segments);

        var segWidth = props.width / values.length,
            segHeight = 10;

        var segments = selection.selectAll('rect.sszvis-legend--mark')
          .data(values);

        segments.enter()
          .append('rect')
          .classed('sszvis-legend--mark', true);

        segments.exit().remove();

        segments
          .attr('x', function(d, i) { return i * segWidth; })
          .attr('y', 0)
          .attr('width', segWidth)
          .attr('height', segHeight)
          .attr('fill', function(d) { return props.scale(d); });

        var startEnd = [values[0], values[values.length - 1]];

        // rounded end caps for the segments
        var endCaps = selection.selectAll('circle.ssvis-legend--mark')
          .data(startEnd);

        endCaps.enter()
          .append('circle')
          .attr('cx', function(d, i) { return i * props.width; })
          .attr('cy', segHeight / 2)
          .attr('r', segHeight / 2)
          .attr('fill', function(d) { return props.scale(d); });

        var labels = selection.selectAll('.sszvis-legend--label')
          .data(startEnd);

        labels.enter()
          .append('text')
          .classed('sszvis-legend--label', true);

        labels.exit().remove();

        labels
          .attr('text-anchor', function(d, i) { return i === 0 ? 'end' : 'start'; })
          .attr('alignment-baseline', 'central')
          .attr('transform', function(d, i) { return 'translate(' + (i * props.width + (i === 0 ? -1 : 1) * 18) + ', ' + (segHeight / 2) + ')'; })
          .text(function(d) { return d; });
      });
  };

});