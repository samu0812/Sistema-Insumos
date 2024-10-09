// loading.component.ts
import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../service/loading/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  loading: boolean = false;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(loading => {
      this.loading = loading;
    });
  }
}
