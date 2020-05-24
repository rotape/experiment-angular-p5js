import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatOption } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import "p5/lib/addons/p5.sound";
import "p5/lib/addons/p5.dom";
import * as P5 from "p5";
import { from } from "rxjs";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-exemple-segon",
  templateUrl: "./exemple-segon.component.html",
  styleUrls: ["./exemple-segon.component.scss"],
})
export class ExempleSegonComponent implements OnInit, OnDestroy {
  public centerX: number;
  public centerY: number;
  public formResolution: number;
  public angle: number;

  constructor() {
    this.centerX = window.innerWidth / 2;
    this.centerY = window.innerHeight / 2;
    this.formResolution = 10;
    this.angle = this.convertToRadians(360 / this.formResolution);
  }

  ngOnInit() {
    this.returnShape();
  }

  ngOnDestroy(): void {
    const canvas = document.getElementsByClassName("p5Canvas");
    //canvas.forEach((x) => x.remove());
  }

  convertToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  returnShape() {
    return new P5((p5) => {
      p5.setup = () => {
        p5.createCanvas(window.innerWidth, window.innerHeight);
      };
      p5.draw = () => {
        //this.circle(p5);
        this.background(p5, "pink");
        this.rectangle(p5);
      };
    });
  }

  background(sketch, color) {
    sketch.background(color);
  }

  rectangle(sketch) {
    sketch.rectMode(sketch.CENTER);
    sketch.square(sketch.mouseX, this.centerY, 55, 55);
  }

  moveFigure() {}

  circle(sketch) {
    sketch.stroke(12);
    sketch.fill(0, 120);

    sketch.ellipse(
      sketch.mouseX,
      sketch.mouseY,
      180 + sketch.mouseX,
      180 + sketch.mouseX
    );
  }
}
