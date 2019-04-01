import { Component, OnInit } from '@angular/core';
import {MatInputModule, MatSelectModule, MatFormFieldModule, MatOption} from '@angular/material';
import 'p5/lib/addons/p5.sound';
import 'p5/lib/addons/p5.dom';
import * as P5 from 'p5';
import { from } from 'rxjs';

@Component({
  selector: 'app-exemple-segon',
  templateUrl: './exemple-segon.component.html',
  styleUrls: ['./exemple-segon.component.scss']
})
export class ExempleSegonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
