import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Input
} from "@angular/core";
import { CytoscapeComponent } from "ngx-cytoscape";
import { BoardData, LayoutOptions, BoardPositions } from "./board-data";
import { delay } from "q";
import { UserService } from "src/app/user.service";

@Component({
  selector: "app-board",
  templateUrl: "./board.component.html",
  styleUrls: ["./board.component.css"]
})
export class BoardComponent implements OnInit, AfterViewInit {
  @Input()
  user: any;

  graphData: any;
  layoutOptions: any;
  boardPositions: any;

  style: any;

  currNode: number;

  iconSrc: string;

  boardDataReady: boolean = false;

  eventType: any;
  showEvent: boolean;

  @ViewChild(CytoscapeComponent)
  private cytoscapeComponent: CytoscapeComponent;

  onClickMe() {
    console.log(JSON.stringify(this.cytoscapeComponent.cy.json()));
  }

  constructor(private userService: UserService) {}

  async ngOnInit() {
    this.showEvent = false;
    this.currNode = this.user.currentLocIndex;
    this.graphData = BoardData;
    this.layoutOptions = LayoutOptions;
    this.boardPositions = BoardPositions;

    // Add in character node
    this.graphData.nodes[this.graphData.nodes.length - 1].data.icon =
      "./../../../assets/" + this.user.defaultPicture;
    this.graphData.nodes[
      this.graphData.nodes.length - 1
    ].position = this.boardPositions[this.currNode - 1];

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
              ["badluck", "#b51515"],
              ["exclamation", "#53c653"],
              ["mushroom", "#53c653"],
              ["star", "#e6e6ff"],
              ["character", "#ffffff"]
            ]);
            return nodeColor.get(ele.data("type"));
          },
          "background-fill": "radial-gradient",
          "background-gradient-stop-colors": function(ele) {
            var nodeColor = new Map<string, string>([
              ["blue", "#1a75ff white"],
              ["red", "#ff1a1a white"],
              ["badluck", "#b51515 white"],
              ["exclamation", "#53c653 white"],
              ["mushroom", "#53c653 white"],
              ["star", "#e6e6ff white"],
              ["character", "#ffffff white"]
            ]);
            return nodeColor.get(ele.data("type"));
          },
          "background-gradient-stop-positions": "20% 90%",
          "background-image": function(ele) {
            if (ele.data("type") == "character") {
              return ele.data("icon");
            } else {
              var nodeImage = new Map<string, string>([
                ["blue", "none"],
                ["red", "none"],
                ["badluck", "./../../../assets/badluck.png"],
                ["exclamation", "./../../../assets/exclamation.png"],
                ["mushroom", "./../../../assets/mushroom.png"],
                ["star", "./../../../assets/star.png"]
              ]);
              return nodeImage.get(ele.data("type"));
            }
          },
          "background-width": function(ele) {
            var nodeImage = new Map<string, string>([
              ["blue", "100%"],
              ["red", "100%"],
              ["badluck", "100%"],
              ["exclamation", "100%"],
              ["mushroom", "60%"],
              ["star", "70%"],
              ["character", "125%"]
            ]);
            return nodeImage.get(ele.data("type"));
          },
          "background-height": function(ele) {
            var nodeImage = new Map<string, string>([
              ["blue", "100%"],
              ["red", "100%"],
              ["badluck", "100%"],
              ["exclamation", "100%"],
              ["mushroom", "60%"],
              ["star", "70%"],
              ["character", "125%"]
            ]);
            return nodeImage.get(ele.data("type"));
          },
          "background-opacity": function(ele) {
            var nodeColor = new Map<string, string>([
              ["blue", "1"],
              ["red", "1"],
              ["badluck", "1"],
              ["exclamation", "1"],
              ["mushroom", "1"],
              ["star", "1"],
              ["character", "0"]
            ]);
            return nodeColor.get(ele.data("type"));
          },
          "background-clip": "none",
          "bounds-expansion": "20px",
          shape: function(ele) {
            var nodeImage = new Map<string, string>([
              ["blue", "ellipse"],
              ["red", "ellipse"],
              ["badluck", "ellipse"],
              ["exclamation", "ellipse"],
              ["mushroom", "ellipse"],
              ["star", "ellipse"],
              ["character", "rectangle"]
            ]);
            return nodeImage.get(ele.data("type"));
          },
          width: "60px",
          height: "60px",
          "border-width": function(ele) {
            var nodeImage = new Map<string, string>([
              ["blue", "3px"],
              ["red", "3px"],
              ["badluck", "3px"],
              ["exclamation", "3px"],
              ["mushroom", "3px"],
              ["star", "3px"],
              ["character", "0px"]
            ]);
            return nodeImage.get(ele.data("type"));
          },
          "border-color": "#ffd700",
          "border-style": "solid"
        }
      },

      {
        selector: "edge",
        style: {
          width: 10,
          "line-color": "#333333",
          "target-arrow-shape": function(ele) {
            var arrows = ["12", "11", "18", "25", "9", "22"];
            if (
              ele.data("id") == "e27" ||
              arrows.includes(ele.data("target"))
            ) {
              return "chevron";
            } else {
              return "none";
            }
          },
          "target-arrow-color": "#333333",
          "arrow-scale": 1,
          "curve-style": "straight"
        }
      }
    ];
    this.boardDataReady = true;
  }

  ngAfterViewInit() {
    if (this.cytoscapeComponent.cy) {
      const cyLayer = this.cytoscapeComponent.cy.cyCanvas({
        zIndex: -1
      });
      const cnv: HTMLCanvasElement = cyLayer.getCanvas();
      const ctx: CanvasRenderingContext2D = cnv.getContext("2d");

      // ...
      this.cytoscapeComponent.cy.on("render resize", function(evt, src) {
        const background = new Image();
        background.src = "./../../../assets/map3.png";

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
      });
    }
  }

  async drawCharacter() {
    if (this.cytoscapeComponent.cy) {
      const cyLayer = this.cytoscapeComponent.cy.cyCanvas();
      const cnv: HTMLCanvasElement = cyLayer.getCanvas();
      const ctx: CanvasRenderingContext2D = cnv.getContext("2d");

      var user = await this.userService.getCharacterDetails();

      console.log(user);

      const iconSrc = "./../../../assets/" + user.defaultPicture;
      // Top layer
      this.cytoscapeComponent.cy.on("render resize", function(evt, src) {
        // "this" is now "cy" inside this callback function
        cyLayer.resetTransform(ctx);
        cyLayer.clear(ctx);
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

        // Draw model elements
        this.nodes().forEach(function(node) {
          const id = node.id();
          const pos = node.position();
          // Do something with canvas at or around the node's position
          // Draw shadows under nodes
          if (id == 1) {
            const character = new Image();
            character.src = iconSrc;
            ctx.drawImage(character, pos.x - 40, pos.y - 40, 80, 80);
          }
        });
      });
    }
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async moveCharacter(numSpaces: number) {
    await delay(2300);
    if (this.cytoscapeComponent.cy) {
      var node = this.cytoscapeComponent.cy.getElementById("999");
      for (var i = 1; i <= numSpaces; i++) {
        // Node numbers grow downward (oops)
        this.currNode = this.currNode - 1;

        // Wrap around if necessary
        if (this.currNode <= 0) this.currNode += 25;

        var nextPos = this.boardPositions[this.currNode - 1];
        var animation = node.animation({
          position: {
            x: nextPos.x,
            y: nextPos.y
          },
          duration: 600,
          easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
        });

        await animation.play().promise();

        this.userService.updateLocIndex(this.currNode);
      }
      this.checkForEvents(this.currNode);
      this.userService.resetPriceScale("Puzzle Hint");
    }
  }

  async moveToNode(nodeNum: number) {
    await delay(500);
    if (this.cytoscapeComponent.cy) {
      var node = this.cytoscapeComponent.cy.getElementById("999");

      // Node numbers grow downward (oops)
      this.currNode = nodeNum;

      var nextPos = this.boardPositions[this.currNode - 1];
      var animation = node.animation({
        position: {
          x: nextPos.x,
          y: nextPos.y
        },
        duration: 1000,
        easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      });

      await animation.play().promise();

      this.userService.updateLocIndex(this.currNode);
    }
  }

  async checkForEvents(node: number) {
    switch (node) {
      case 25: {
        this.eventType = { type: "toad", destNode: 16, style: "good" };
        await delay(500);
        this.showEvent = true;
        break;
      }
      case 17: {
        this.eventType = { type: "toad", destNode: 10, style: "good" };
        await delay(500);
        this.showEvent = true;
        break;
      }
      case 6: {
        var dest = this.user.name == "Dry Bones" ? 21 : 18;
        this.eventType = { type: "luma", destNode: dest, style: "good" };
        await delay(500);
        this.showEvent = true;
        break;
      }
      case 12: {
        this.eventType = { type: "chef", destNode: 4, style: "hungry" };
        await delay(500);
        this.showEvent = true;
        break;
      }
      case 2: {
        this.eventType = { type: "bowser", destNode: 13, style: "bad" };
        await delay(500);
        this.showEvent = true;
        break;
      }
    }
  }

  closeEvent(event) {
    this.showEvent = false;
    this.moveToNode(this.eventType.destNode);
  }
}
