import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  items;
  age = [];
  khatTotal = [];
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [];
  constructor(private data: DataService) {
    data.getItems().subscribe(
      (datas) => {
        this.items = datas;
      }
    );
  }

  ngOnInit() {

    this.barChartData.push(
      {
        data: this.age, label: 'age',

      },
      {
        data: this.khatTotal, label: 'total Khat',

      }
    );


  }
  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
