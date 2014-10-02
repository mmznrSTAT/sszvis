/**
 * Stacked Chart
 * @return {d3.component}
 */
namespace('sszvis.component.stacked.area', function(module) {

  module.exports = function() {
    return d3.component()
      .prop('xAccessor')
      .prop('xScale')
      .prop('yAccessor')
      .prop('yScale')
      .prop('fill')
      .prop('stroke')
      .render(function(data) {
        var selection = d3.select(this);
        var props = selection.props();

        var stackLayout = d3.layout.stack()
          .x(props.xAccessor)
          .y(props.yAccessor);

        var areaGen = d3.svg.area()
          .x(sszvis.fn.compose(props.xScale, props.xAccessor))
          .y0(function(d) { return props.yScale(d.y0); })
          .y1(function(d) { return props.yScale(d.y0 + d.y); });

        var paths = selection.selectAll('path.sszvis-path')
          .data(stackLayout(data));

        paths.enter()
          .append('path')
          .classed('sszvis-path', true);

        paths.exit().remove();

        paths
          .attr('d', areaGen)
          .attr('fill', props.fill)
          .attr('stroke', props.stroke);
      });
  };

});