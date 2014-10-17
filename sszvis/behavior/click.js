/**
 * Click behavior
 * @return {d3.component}
 */
namespace('sszvis.behavior.click', function(module) {

  module.exports = function() {
    var event = d3.dispatch('mousedown', 'mouseup', 'click', 'drag');

    var clickComponent = d3.component()
      .prop('xScale')
      .prop('yScale')
      .render(function() {
        var selection = d3.select(this);
        var props = selection.props();

        var xExtent = props.xScale.range().sort(d3.ascending);
        var yExtent = props.yScale.range().sort(d3.ascending);

        var layer = selection.selectAll('[data-sszvis-behavior-click]')
          .data([0]);

        layer.enter()
          .append('rect')
          .attr('data-sszvis-behavior-click', '');

        var isDragging = false;

        layer
          .attr('x', xExtent[0])
          .attr('y', yExtent[0])
          .attr('width',  xExtent[1] - xExtent[0])
          .attr('height', yExtent[1] - yExtent[0])
          .attr('fill', 'transparent')
          .on('mousedown', function() {
            var xy = d3.mouse(this);
            this.__isDragging = true;
            event.mousedown(props.xScale.invert(xy[0]), props.yScale.invert(xy[1]));
          })
          .on('mouseup', function() {
            var xy = d3.mouse(this);
            this.__isDragging = false;
            event.mouseup(props.xScale.invert(xy[0]), props.yScale.invert(xy[1]));
          })
          .on('click', function() {
            var xy = d3.mouse(this);
            event.click(props.xScale.invert(xy[0]), props.yScale.invert(xy[1]));
          })
          .on('mousemove', function() {
            if (this.__isDragging) {
              var xy = d3.mouse(this);
              event.drag(props.xScale.invert(xy[0]), props.yScale.invert(xy[1]));
            }
          })
          .on('mouseout', function() {
            this.__isDragging = false;
          });
      });

    d3.rebind(clickComponent, event, 'on');

    return clickComponent;
  };

});