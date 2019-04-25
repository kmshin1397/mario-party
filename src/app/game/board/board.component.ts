import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { CytoscapeComponent } from "ngx-cytoscape";
import { BoardData, LayoutOptions } from "./board-data";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit, AfterViewInit {
  graphData: any;
  layoutOptions: any;

  style: any;

  nextId: number;

  @ViewChild(CytoscapeComponent)
  private cytoscapeComponent: CytoscapeComponent;

  constructor() {}

  ngOnInit() {
    this.graphData = BoardData;
    this.layoutOptions = LayoutOptions;

    this.style = [
      // the stylesheet for the graph
      {
        selector: "node",
        style: {
          label: "",
          "text-valign": "center",
          "background-color": function(ele) {
            var nodeColor = new Map<string, string>([
              ["blue", "#1a75ff"],
              ["red", "#ff1a1a"],
              ["exclamation", "#53c653"],
              ["mushroom", "#53c653"],
              ["star", "#e6e6ff"]
            ]);
            return nodeColor.get(ele.data("type"));
          },
          "background-fill": "radial-gradient",
          "background-gradient-stop-colors": function(ele) {
            var nodeColor = new Map<string, string>([
              ["blue", "#1a75ff white"],
              ["red", "#ff1a1a white"],
              ["exclamation", "#53c653 white"],
              ["mushroom", "#53c653 white"],
              ["star", "#e6e6ff white"]
            ]);
            return nodeColor.get(ele.data("type"));
          },
          "background-gradient-stop-positions": "20% 90%",
          "background-image": function(ele) {
            var nodeImage = new Map<string, string>([
              ["blue", "none"],
              ["red", "none"],
              ["exclamation", "./../../../assets/exclamation.png"],
              ["mushroom", "./../../../assets/mushroom.png"],
              ["star", "./../../../assets/star.png"]
            ]);
            return nodeImage.get(ele.data("type"));
          },
          "background-width": function(ele) {
            var nodeImage = new Map<string, string>([
              ["blue", "100%"],
              ["red", "100%"],
              ["exclamation", "100%"],
              ["mushroom", "60%"],
              ["star", "70%"]
            ]);
            return nodeImage.get(ele.data("type"));
          },
          "background-height": function(ele) {
            var nodeImage = new Map<string, string>([
              ["blue", "100%"],
              ["red", "100%"],
              ["exclamation", "100%"],
              ["mushroom", "60%"],
              ["star", "70%"]
            ]);
            return nodeImage.get(ele.data("type"));
          },
          width: "60px",
          height: "60px",
          "border-width": "3px",
          "border-color": "#ffffff",
          "border-style": "solid"
        }
      },

      {
        selector: "edge",
        style: {
          width: 10,
          "line-color": "#999999",
          "target-arrow-shape": function(ele) {
            if (ele.data("target") == 10) {
              return "chevron";
            } else {
              return "none";
            }
          },
          "target-arrow-color": "#999999",
          "arrow-scale": 2,
          "curve-style": "straight"
        }
      }
    ];
  }

  ngAfterViewInit() {
    if (this.cytoscapeComponent.cy) {
      const cyLayer = this.cytoscapeComponent.cy.cyCanvas({
        zIndex: -1
      });
      const cnv: HTMLCanvasElement = cyLayer.getCanvas();
      const ctx: CanvasRenderingContext2D = cnv.getContext("2d");

      // ...
      this.cytoscapeComponent.cy.on("render cyCanvas.resize", function(
        evt,
        src
      ) {
        const background = new Image();
        background.src = "./../../../assets/map2.png";

        // "this" is now "cy" inside this callback function
        cyLayer.resetTransform(ctx);
        cyLayer.clear(ctx);
        // ctx.fillStyle = "#ff00ff";
        //ctx.fillRect(0, 0, 100, 100); // Top left corner
        cyLayer.setTransform(ctx);

        const width = cnv.width;
        const height = cnv.height;
        const data = Array(width * height);

        const zoom = this.zoom();

        // Actually clear
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, width, height);

        ctx.restore();

        // Analyze transform
        const matrix = ctx.getTransform();
        const scale = matrix.a;

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(scale, scale);
        ctx.drawImage(
          background,
          matrix.e / scale,
          matrix.f / scale,
          width,
          height
        );
        ctx.restore();
        // Draw model elements
        this.nodes().forEach(function(node) {
          const pos = node.position();
          // Do something with canvas at or around the node's position
          // Draw shadows under nodes
        });
      });
    }
    // this.render();
  }

  render() {
    // this.cytoscapeComponent.cy.layout(LayoutOptions);
    this.cytoscapeComponent.cy.autoungrabify(true);
    // this.cytoscapeComponent.cy.fit();
  }
}
