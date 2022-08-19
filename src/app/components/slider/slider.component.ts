import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  Input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "slider",
  templateUrl: "./slider.component.html",
  styleUrls: ["./slider.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SliderComponent implements OnInit {
  sliderHandleHeight = 8;
  sliderRailHeight = 50;
  positionRange = this.sliderRailHeight - this.sliderHandleHeight;
  @HostListener("window:keydown.enter", ["$event"])
  @Input()
  value: any;
  @Input() step: number;
  @Input() min: number;
  @Input() max: number;
  @Input() label: string;

  constructor() {}

  ngOnInit(): void {}
  getTop() {
    return (
      this.positionRange -
      ((this.value - this.min) / (this.max - this.min)) * this.positionRange
    );
  }
}
