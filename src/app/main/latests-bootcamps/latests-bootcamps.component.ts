import { Component, OnInit } from '@angular/core';
import {BootcampsService} from '../../core/services/bootcamps.service';

@Component({
  selector: 'app-latests-bootcamps',
  templateUrl: './latests-bootcamps.component.html',
  styleUrls: ['./latests-bootcamps.component.scss']
})
export class LatestsBootcampsComponent implements OnInit {

  latestBootcams;
  constructor(private bootcampsService: BootcampsService) { }

  ngOnInit() {
    this.bootcampsService.getLatestBootcamps().subscribe( data => this.latestBootcams = data)
  }

}
