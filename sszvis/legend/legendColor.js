/**
 * Legend component
 *
 * @module sszvis/legend
 */
 // NOTE why is there a namespace sszvis.legend.color AND sszvis.legend.ColorRange 
 //and not just sszvis.legend returning an object containing color and colorRange?
namespace('sszvis.legend.color', function(module) {

  module.exports = function() {
    return d3.component()
      .prop('scale')
      .prop('rowHeight').rowHeight(20)
      .prop('columnWidth').columnWidth(200)
      .prop('rows').rows(3)
      .prop('columns').columns(3)
      .prop('orientation')
      .prop('reverse').reverse(false)
      .prop('rightAlign').rightAlign(false)
      .prop('horizontalFloat').horizontalFloat(false)
      .prop('floatPadding').floatPadding(10)
      .prop('floatWidth').floatWidth(600)
      .render(function() {
        var selection = d3.select(this);
        var props = selection.props();

        var domain = props.scale.domain();

        if (props.reverse) {
          domain = domain.slice().reverse();
        }

        var rows, cols;
        if (props.orientation === 'horizontal') {
          cols = Math.ceil(props.columns);
          rows = Math.ceil(domain.length / cols);
        } else if (props.orientation === 'vertical') {
          rows = Math.ceil(props.rows);
          cols = Math.ceil(domain.length / rows);
        }

        var groups = selection.selectAll('.sszvis-legend--entry')
          .data(domain);

        groups.enter()
          .append('g')
          .classed('sszvis-legend--entry', true);

        groups.exit().remove();

        var marks = groups.selectAll('.sszvis-legend--mark')
          .data(function(d) { return [d]; });

        marks.enter()
          .append('circle')
          .classed('sszvis-legend--mark', true);

        marks.exit().remove();

        marks
          .attr('cx', props.rightAlign ? -6 : 6)
          .attr('cy', props.rowHeight / 2 - 1) // magic number adjustment for nice alignment with text
          .attr('r', 6)
          .attr('fill', function(d) { return props.scale(d); });

        var labels = groups.selectAll('.sszvis-legend__label')
          .data(function(d) { return [d]; });

        labels.enter()
          .append('text')
          .classed('sszvis-legend__label', true);

        labels.exit().remove();

        labels
          .text(function(d) { return d; })
          .attr('dy', '0.35em') // vertically-center
          .style('text-anchor', function() { return props.rightAlign ? 'end' : 'start'; })
          .attr('transform', function() {
            return sszvis.fn.translateString(props.rightAlign ? -18 : 18, props.rowHeight / 2);
          });

        if (props.horizontalFloat) {
          var rowPosition = 0, horizontalPosition = 0;
          groups.attr('transform', function(d, i) {
            var width = this.getBoundingClientRect().width;
            if (horizontalPosition + width > props.floatWidth) {
              rowPosition += props.rowHeight;
              horizontalPosition = 0;
            }
            var translate = sszvis.fn.translateString(horizontalPosition, rowPosition);
            horizontalPosition += width + props.floatPadding;
            return translate;
          });
        } else {
          groups.attr('transform', function(d, i) {
            if (props.orientation === 'horizontal') {
              return 'translate(' + ((i % cols) * props.columnWidth) + ',' + (Math.floor(i / cols) * props.rowHeight) + ')';
            } else if (props.orientation === 'vertical') {
              return 'translate(' + (Math.floor(i / rows) * props.columnWidth) + ',' + ((i % rows) * props.rowHeight) + ')';
            }
          });
        }

      });
  };

});
