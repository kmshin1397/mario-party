export const BoardData = {
  nodes: [
    {
      data: {
        id: 1,
        type: "blue"
      },
      position: {
        x: 0,
        y: 0
      },
      grabbable: false
    },
    {
      data: {
        id: 2,
        type: "blue"
      },
      position: {
        x: 0,
        y: 100
      },
      grabbable: false
    },
    {
      data: {
        id: 3,
        type: "red"
      },
      position: {
        x: 0,
        y: 200
      },
      grabbable: false
    },
    {
      data: {
        id: 4,
        type: "blue"
      },
      position: {
        x: 0,
        y: 300
      },
      grabbable: false
    },
    {
      data: {
        id: 5,
        type: "exclamation"
      },
      position: {
        x: 0,
        y: 400
      },
      grabbable: false
    },
    {
      data: {
        id: 6,
        type: "mushroom"
      },
      position: {
        x: 0,
        y: 500
      },
      grabbable: false
    },
    {
      data: {
        id: 7,
        type: "blue"
      },
      position: {
        x: 100,
        y: 500
      },
      grabbable: false
    },
    {
      data: {
        id: 8,
        type: "exclamation"
      },
      position: {
        x: 200,
        y: 500
      },
      grabbable: false
    },
    {
      data: {
        id: 9,
        type: "blue"
      },
      position: {
        x: 300,
        y: 500
      },
      grabbable: false
    },
    {
      data: {
        id: 10,
        type: "blue"
      },
      position: {
        x: 450,
        y: 300
      },
      grabbable: false
    },
    {
      data: {
        id: 11,
        type: "red"
      },
      position: {
        x: 450,
        y: 400
      },
      grabbable: false
    },
    {
      data: {
        id: 12,
        type: "blue"
      },
      position: {
        x: 450,
        y: 500
      },
      grabbable: false
    },
    {
      data: {
        id: 13,
        type: "blue"
      },
      position: {
        x: 450,
        y: 600
      },
      grabbable: false
    },
    {
      data: {
        id: 14,
        type: "mushroom"
      },
      position: {
        x: 450,
        y: 700
      },
      grabbable: false
    },
    {
      data: {
        id: 15,
        type: "blue"
      },
      position: {
        x: 450,
        y: 800
      },
      grabbable: false
    },
    {
      data: {
        id: 16,
        type: "blue"
      },
      position: {
        x: 550,
        y: 800
      },
      grabbable: false
    },
    {
      data: {
        id: 17,
        type: "exclamation"
      },
      position: {
        x: 650,
        y: 800
      },
      grabbable: false
    },
    {
      data: {
        id: 18,
        type: "star"
      },
      position: {
        x: 750,
        y: 800
      },
      grabbable: false
    }
  ],
  edges: [
    { data: { source: 1, target: 2 } },
    { data: { source: 2, target: 3 } },
    { data: { source: 3, target: 4 } },
    { data: { source: 4, target: 5 } },
    { data: { source: 5, target: 6 } },
    { data: { source: 6, target: 7 } },
    { data: { source: 7, target: 8 } },
    { data: { source: 8, target: 9 } },
    { data: { source: 9, target: 10 } },
    { data: { source: 10, target: 11 } },
    { data: { source: 11, target: 12 } },
    { data: { source: 12, target: 13 } },
    { data: { source: 13, target: 14 } },
    { data: { source: 14, target: 15 } },
    { data: { source: 15, target: 16 } },
    { data: { source: 16, target: 17 } },
    { data: { source: 17, target: 18 } }
  ]
};

export const LayoutOptions = {
  name: "preset",

  positions: undefined, // map of (node id) => (position obj); or function(node){ return somPos; }
  zoom: undefined, // the zoom level to set (prob want fit = false if set)
  pan: undefined, // the pan level to set (prob want fit = false if set)
  fit: true, // whether to fit to viewport
  padding: 30, // padding on fit
  animate: false, // whether to transition the node positions
  animationDuration: 500, // duration of animation in ms if enabled
  animationEasing: undefined, // easing of animation if enabled
  animateFilter: function(node, i) {
    return true;
  }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
  ready: undefined, // callback on layoutready
  stop: undefined, // callback on layoutstop
  transform: function(node, position) {
    return position;
  } // transform a given node position. Useful for changing flow direction in discrete layouts
};
