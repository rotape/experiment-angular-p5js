import {Component, OnInit} from '@angular/core';

import * as Tone from 'tone';

@Component({
    selector: 'app-noise',
    templateUrl: './noise.component.html',
    styleUrls: ['./noise.component.scss']
})
export class NoiseComponent implements OnInit {

    noise;

    currentType = 0;
    types = ['white', 'brown', 'pink'];

    constructor() {
        this.noise = new Tone.Noise().start();
    }

    ngOnInit() {
    }

    setType(i) {
        this.currentType = i;
        this.noise.type = this.types[i];
    }
}
