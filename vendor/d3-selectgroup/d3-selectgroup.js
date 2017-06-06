(function(d3) {
  'use strict';

  /**
   * d3.selection plugin to simplify creating idempotent groups that are not
   * recreated when rendered again.
   *
   * @see https://github.com/mbostock/d3/wiki/Selections
   *
   * @param  {String} key The name of the group
   * @return {d3.selection}
   */
  d3.selection.prototype.selectGroup = function(key) {

    var group = this.selectAll('[data-d3-selectgroup="' + key + '"]')
      .data(function(d){ return [d]; });

    var newGroup = group.enter()
      .append('g')
      .attr('data-d3-selectgroup', key);

    return group.merge(newGroup)
  };

}(d3));
