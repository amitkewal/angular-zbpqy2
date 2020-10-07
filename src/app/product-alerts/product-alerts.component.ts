import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import {SwPush} from '@angular/service-worker';

@Component({
  selector: 'app-product-alerts',
  templateUrl: './product-alerts.component.html',
  styleUrls: ['./product-alerts.component.css']
})
export class ProductAlertsComponent implements OnInit {
  @Input() product;
  @Output() notify = new EventEmitter();
  private readonly publicKey = 'BCabNwpvNcxGySvwe0edKOYwlcEHKc8xe76iPUGQkHCMQ0VDDCeL0KxIcjrbP9Raqx5ZMZ_YJO9gfPDdrZGMp7g';

  constructor(readonly swPush: SwPush) {
   }

  ngOnInit() {
    this.pushSubscription();
    this.swPush.messages.subscribe((message) => console.log("||||||||||",message));
  }


    pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log('Notification is not enabled');
      // return;
    }

    this.swPush.requestSubscription({
        serverPublicKey: this.publicKey,
      }).then((sub) => {
        // Make a post call to serve
        console.log(JSON.stringify(sub));
      }).catch((err) => console.log("--------",JSON.stringify(err)));
  }

}