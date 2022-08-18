import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from "@angular/core";

@Component({
  selector: "toggle-button",
  templateUrl: "./toggle-button.component.html",
  styleUrls: ["./toggle-button.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleButtonComponent implements OnInit {
  @Input() value: number;
  constructor() {}

  ngOnInit(): void {}
}
