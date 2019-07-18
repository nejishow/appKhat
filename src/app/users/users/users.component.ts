import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { DataService } from 'src/app/service/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          ;
          let label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartDataDrinks: number[] = [];
  public pieChartDataDay: number[] = [];
  public pieChartDataTabaco: number[] = [];
  public pieChartDataHours: number[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: []
    },
  ];
  r = Math.floor(Math.random()*256);
  g = Math.floor(Math.random()*256);
  b = Math.floor(Math.random()*256);
  rgb = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
  items: any;
  age: any;
  khatTotal: any;
  barChartLabels: any = [];
  displayedColumns = ["id", "age","TotalKhat", "TotalDrink","TotalTabaco", "TotalHour"  ]
  t2025 = [];
  t2530 = [];
  t3035 = [];
  t3540 = [];
  t40 = [];
  averageTable: Array<{
    range, khatAverage: number, drinkAverage: any, tabacoAverage: any, hourAverage: any, dayAverage: any
  }> = [];
  constructor(private data: DataService, private router: Router) {
    data.getItems().subscribe(
      (datas) => {
        this.items = datas;
        for (let index = 0; index < datas.length; index++) {
          switch (true) {
            case (40 < datas[index].age):
              this.t40.push(
                datas[index]
              );
              break;
            case (40 >= datas[index].age && datas[index].age > 35):
              this.t3540.push(
                datas[index]
              ); break;
            case (35 >= datas[index].age && datas[index].age > 30):
              this.t3035.push(
                datas[index]
              ); break;
            case (30 >= datas[index].age && datas[index].age > 25):
              this.t2530.push(
                datas[index]
              ); break;

            default:
              this.t2025.push(
                datas[index]
              );
              break;
          }
        }
      }
    );
    
  }
  ngOnInit() {
    /*   setTimeout(() => {
         for (let index = 0; index < this.items.length; index++) {
           this.data.getConsumption(this.items[index].idFirebase).subscribe(
             (data) => console.log(data)
           );
         }
       }, 1000);*/
    setTimeout(() => {
      this.average(this.t2025, "under 25y old");
      this.average(this.t2530, "between 25&30y old");
      this.average(this.t3035, "between 30&35y old");
      this.average(this.t3540, "between 35&40y old");
      this.average(this.t40, "over 40y old");
    }, 1000);

    setTimeout(() => {

      for (let index = 0; index < this.averageTable.length; index++) {

        this.pieChartLabels.push(
          this.averageTable[index].range
        );
        this.pieChartData.push(
          this.averageTable[index].khatAverage

        );

        this.pieChartDataDrinks.push(
          this.averageTable[index].drinkAverage

        );
        this.pieChartDataTabaco.push(
          this.averageTable[index].tabacoAverage

        );
        this.pieChartDataDay.push(
          this.averageTable[index].dayAverage

        );
        this.pieChartDataHours.push(
          this.averageTable[index].hourAverage

        );
        this.pieChartColors[0].backgroundColor.push(
          'rgb(' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ',' + Math.floor(Math.random()*256) + ')'
        );
      }
    }, 2000);
  }
  average(array, age) {
    let khat = 0;
    let drinks = 0;
    let tabaco = 0;
    let hour = 0;
    let day = 0;
    for (let index = 0; index < array.length; index++) {

      khat = khat + array[index].KhatTotal;
      drinks = drinks + array[index].DrinksTotal;
      tabaco = tabaco + array[index].TabacTotal;
      hour = hour + array[index].TotalHours;
      day = day + array[index].numberOfDay;
    }
    this.averageTable.push(
      {
        range: age,
        khatAverage: (khat / array.length),
        drinkAverage: (drinks / array.length),
        tabacoAverage: (tabaco / array.length),
        hourAverage: (hour / array.length),
        dayAverage: (day / array.length)
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
  goDetails(id) {
this.router.navigate(["/userDetails/" + id ])    
  }

}
