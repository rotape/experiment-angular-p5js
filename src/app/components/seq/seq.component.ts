import {Component, Input, NgZone, OnInit} from '@angular/core';

import * as  Tone from 'tone';
import * as _ from 'lodash';

@Component({
    selector: 'app-seq',
    templateUrl: './seq.component.html',
    styleUrls: ['./seq.component.scss']
})
export class SeqComponent implements OnInit {

    value = 'c3 eb3 g3 c4';
    period = '4n';
    noteLength = '8n';

    signals = [];
    activeSignals = [];

    ngOnInit() {
    }



}
