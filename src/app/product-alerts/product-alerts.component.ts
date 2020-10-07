import { Component, OnInit } from "@angular/core";
import { Input } from "@angular/core";
import { Output, EventEmitter } from "@angular/core";
import { SwPush } from "@angular/service-worker";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: "app-product-alerts",
  templateUrl: "./product-alerts.component.html",
  styleUrls: ["./product-alerts.component.css"]
})
export class ProductAlertsComponent implements OnInit {
  @Input() product;
  @Output() notify = new EventEmitter();
  apiData: any;
  private readonly publicKey =
    "BLlFd7xr7xV3Hjce48ARU98KQ-hpJEblngRlMzMMn17__Vw_rH4WFlcqzJPktV3XRoUOeADnlMzmmoqJban5898";

  constructor(readonly swPush: SwPush,private http: HttpClient,) {}

  ngOnInit() {
    this.pushSubscription();
    this.swPush.messages.subscribe(message =>
      console.log("||||||||||", message)
    );
     this.swPush.notificationClicks.subscribe(({ action, notification }) => {
      window.open(notification.data.url);
    });

    this.http.get('https://angular-zbpqy2.stackblitz.io/').subscribe(
      (res: any) => {
        this.apiData = res.data;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  pushSubscription() {
    if (!this.swPush.isEnabled) {
      console.log("Notification is not enabled");
      // return;
    }

    this.swPush
      .requestSubscription({
        serverPublicKey: this.publicKey
      })
      .then(sub => {
        // Make a post call to serve
        console.log("----||||||||||||", sub);
        console.log("----||||||||||||", JSON.stringify(sub));
      })
      .catch(err => console.error("----errr----", err));
  }
}
