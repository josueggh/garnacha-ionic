import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TimeService } from '../../services/util/time.service';
import { Router } from '@angular/router';

@Component({
  selector: 'garnacha-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() info;
  @Input() current;

  constructor(
    private modalController: ModalController,
    public timeService: TimeService,
    private router: Router
    ) { }

  ngOnInit() {}

  moveTo() {
    this.router.navigate([`/app/detail/${this.info.slug}`]);
    this.modalController.dismiss({dismissed: true});
  }

  dismissModal() {
    this.modalController.dismiss({dismissed: true});
  }
}
