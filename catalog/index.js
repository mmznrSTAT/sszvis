import React from 'react';
import ReactDOM from 'react-dom';
import {Catalog, ContentLoader} from 'catalog';
import ProjectSpecimen from './ProjectSpecimen/Project';

const pages = [
  {
    path: 'intro-group',
    title: 'Introduction',
    pages: [
      {path: 'intro', path: '/', title: 'Overview', src: 'docs/intro.md'},
      {path: 'faq', title: 'FAQ', src: 'docs/faq.md'}
    ]
  },
  {
    path: 'style-guide',
    title: 'Style guide',
    pages: [
      {path: 'annotations', title: 'Annotations', src: 'docs/style-guide/annotations.md'},
      {path: 'axes', title: 'Axes', src: 'docs/style-guide/axes.md'},
      {path: 'behaviors', title: 'Behaviors', src: 'docs/style-guide/behavior.md'},
      {path: 'breakpoints', title: 'Breakpoints', src: 'docs/style-guide/breakpoints.md'},
      {
        path: 'colors',
        title: 'Colors',
        src: 'docs/style-guide/colors.md',
        styles: ['docs/style-guide/colors.css'],
        scripts: ['vendor/d3/d3.js', 'sszvis.js', 'docs/style-guide/colors.js']
      },
      {path: 'controls', title: 'Controls', src: 'docs/style-guide/controls.md'},
      {path: 'legends', title: 'Legends', src: 'docs/style-guide/legends.md'},
      {
        path: 'tooltips',
        title: 'Tooltips',
        src: 'docs/style-guide/tooltips.md',
        styles: ['sszvis.css', 'docs/style-guide/tooltips.css'],
        scripts: ['vendor/d3/d3.js', 'sszvis.js', 'docs/style-guide/tooltips.js']
      }
    ]
  },
  {
    path: 'beginners',
    title: 'Beginner charts',
    src: 'docs/beginners.md'
  },
  {
    path: 'line-charts',
    title: 'Line charts',
    pages: [
      {path: 'line-chart-single', title: 'Single', src: 'docs/line-chart-single/README.md'},
      {path: 'line-chart-multiple', title: 'Multiple', src: 'docs/line-chart-multiple/README.md'}
    ]
  },
  {
    path: 'bar-charts',
    title: 'Bar charts',
    pages: [
      {path: 'bar-chart-vertical', title: 'Vertical', src: 'docs/bar-chart-vertical/README.md'},
      {path: 'bar-chart-vertical-stacked', title: 'Vertical (stacked)', src: 'docs/bar-chart-vertical-stacked/README.md'},
      {path: 'bar-chart-horizontal', title: 'Horizontal', src: 'docs/bar-chart-horizontal/README.md'},
      {path: 'bar-chart-horizontal-stacked', title: 'Horizontal (stacked)', src: 'docs/bar-chart-horizontal-stacked/README.md'},
      {path: 'bar-chart-grouped', title: 'Grouped', src: 'docs/bar-chart-grouped/README.md'}
    ]
  },
  {
    path: 'area-chart-stacked',
    title: 'Area charts',
    src: 'docs/area-chart-stacked/README.md'
  },
  {
    path: 'map',
    title: 'Maps',
    pages: [
      {path: 'map-standard', title: 'Choropleth Maps', src: 'docs/map-standard/README.md'},
      // {path: 'map-baselayer', title: 'Map Base Layers', src: 'docs/map-baselayer/README.md'},
      {path: 'map-extended', title: 'Extended Maps', src: 'docs/map-extended/README.md'},
      {path: 'map-signature', title: 'Signature Maps', src: 'docs/map-signature/README.md'}
    ]
  },
  {
    path: 'various',
    title: 'Various',
    pages: [
      {path: 'heat-table', title: 'Heat table', src: 'docs/heat-table/README.md' },
      {path: 'pie-charts', title: 'Pie chart', src: 'docs/pie-charts/README.md' },
      {path: 'population-pyramid', title: 'Population pyramid', src: 'docs/population-pyramid/README.md'},
      {path: 'scatterplot', title: 'Scatterplot', src: 'docs/scatterplot/README.md'},
      {path: 'scatterplot-over-time', title: 'Scatterplot Over Time', src: 'docs/scatterplot-over-time/README.md'},
      {path: 'sunburst', title: 'Sunburst', src: 'docs/sunburst/README.md'},
      {path: 'sankey', title: 'Sankey Diagram (Parallel Sets)', src: 'docs/sankey/README.md'}
    ]
  }
];

ReactDOM.render(
  <Catalog 
    title='Statistik Stadt Zürich'
    styles={['sszvis.css']}
    specimens={{
      project: ProjectSpecimen({
        sizes: [
          {width: '750px', height: '600px'},
          {width: '541px', height: '500px'},
          {width: '284px', height: '500px'}
        ]
      })
    }}
    theme={{
      background: '#fdfdfd',
      brandColor: '#0070bc',
      linkColor: '#CC6171',
      msRatio: 1.1,
      pageHeadingBackground: '#f5f5f5',
      pageHeadingTextColor: '#0070bc',
      sidebarColorHeading: '#0070bc',
      sidebarColorText: '#777',
      sidebarColorTextActive: '#0070bc'
    }}
    pages={pages}
  />,
  document.getElementById('catalog')
);
