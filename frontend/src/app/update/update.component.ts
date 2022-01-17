import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service'

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private service: ApiserviceService) { }

  ngOnInit(): void {
    this.service.getallprojects().subscribe((res) => {
      console.log(res, "res==>");
    })
  }
}
