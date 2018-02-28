import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'myplace-select',
    templateUrl: 'myplace-select.html'
})
export class MyPlaceSelectPage {
    constructor(
        private navController: NavController
    ) {}

    selectPayee() {
        this.navController.pop();
    }
}