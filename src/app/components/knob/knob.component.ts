import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "knob",
  templateUrl: "./knob.component.html",
  styleUrls: ["./knob.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KnobComponent implements OnInit {
  @Input() step: number;
  @Input() min: number;
  @Input() max: number;
  @Input() label: string;
  @Input() value: number;
  rotationRange = 300;
  constructor() {}

  ngOnInit(): void {}

  getDegrees() {
    return (
      ((this.value - this.min) / (this.max - this.min)) * this.rotationRange -
      this.rotationRange / 2
    );
  }
}
