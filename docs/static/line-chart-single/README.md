# Single line chart

> Line charts are suited to show a functional relation between two attributes.

## sszvis.line

### Data structure

This chart requires two variables that can be put in relation to each other.

### Configuration

Line charts use [d3.line](https://github.com/d3/d3-shape/blob/master/README.md#lines) internally and work similarly.

#### `line.x([x])`

Accessor function to read *x*-values from the data.

#### `line.y([y])`

Accessor function to read *y*-values from the data.

#### `line.defined([predicate])`

Accessor function to specify which data points are defined (default: `line.y` is not `NaN`).

#### `line.stroke([stroke])`

String or function to set the stroke color (default: black)

#### `line.strokeWidth([width])`

String or function to set the stroke thickness (default: 1)


### Chart

```project
{
    "name": "line-chart-single-basic",
    "files": {
        "index.html": {
            "source": "line-chart-single/basic.html",
            "template": "template.html"
        },
        "data.csv": "line-chart-single/data/SL_quarterly.csv",
        "sszvis.js": "sszvis.js",
        "sszvis.css": "sszvis.css",
        "fallback.png": "fallback.png",
        
    },
    "sourceView": ["index.html", "data.csv"]
}
```

## Usage example: Interaction

Based on the default chart. Additionally shows the numeric values at the current mouse position. The x-axis shows the current quarter (Q1–Q4).

```project
{
    "name": "line-chart-single-interactive",
    "files": {
        "index.html": {
            "source": "line-chart-single/interactive.html",
            "template": "template.html"
        },
        "data.csv": "line-chart-single/data/SL_quarterly.csv",
        "sszvis.js": "sszvis.js",
        "sszvis.css": "sszvis.css",
        "fallback.png": "fallback.png",
        
    },
    "sourceView": ["index.html", "data.csv"]
}
```

## Usage example: Annotations

Shows an annotation at a given position or data point. The time axis shows days with a short date.

```project
{
    "name": "line-chart-single-annotated",
    "files": {
        "index.html": {
            "source": "line-chart-single/annotated.html",
            "template": "template.html"
        },
        "data.csv": "line-chart-single/data/SL_daily.csv",
        "sszvis.js": "sszvis.js",
        "sszvis.css": "sszvis.css",
        "fallback.png": "fallback.png",
        
    },
    "sourceView": ["index.html", "data.csv"]
}
```

## Usage example: Negative x-values

Shows how to use negative x-values.

```project
{
    "name": "line-chart-single-negatives-x-axis",
    "files": {
        "index.html": {
            "source": "line-chart-single/negatives-x-axis.html",
            "template": "template.html"
        },
        "data.csv": "line-chart-single/data/SL_negativesXAxis.csv",
        "sszvis.js": "sszvis.js",
        "sszvis.css": "sszvis.css",
        "fallback.png": "fallback.png",
        
    },
    "sourceView": ["index.html", "data.csv"]
}
```

## Usage example: Negative y-values

Shows how to use negative y-values.

```project
{
    "name": "line-chart-single-percentage-negatives-y-axis",
    "files": {
        "index.html": {
            "source": "line-chart-single/percentage-negatives-y-axis.html",
            "template": "template.html"
        },
        "data.csv": "line-chart-single/data/SL_Percentage_negativesYAxis.csv",
        "sszvis.js": "sszvis.js",
        "sszvis.css": "sszvis.css",
        "fallback.png": "fallback.png",
        
    },
    "sourceView": ["index.html", "data.csv"]
}
```

## Usage example: Parametric Configuration

Generates a chart based on a config object

```project
{
    "name": "line-chart-single-automatic",
    "files": {
        "index.html": {
            "source": "line-chart-single/parametric.html",
            "template": "template.html"
        },
        "data.csv": "line-chart-single/data/SL_quarterly.csv",
        "sszvis.js": "sszvis.js",
        "sszvis.css": "sszvis.css",
        "fallback.png": "fallback.png",
        
    },
    "sourceView": ["index.html", "data.csv"]
}
```

