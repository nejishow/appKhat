import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import { DataService } from 'src/app/service/data.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  items;
  item;
  consumption;
  id;
  ids: any[] = [];
  nextDay: Date;
  ngOnInit() {
    //
  }
  public lineChartData: ChartDataSets[] = [
    {
      data: []
    },
    {
      data: []
    },
    {
      data: [],
      yAxisID: "test"
    }
  ];
  lineCharData2 = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: "test",
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'red',
          }
        }
      ]
    },
    annotation: {
    },

  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    {
      // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }

  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [pluginAnnotations];
  displayedColumns = ["id", "age", "TotalKhat", "TotalDrink", "TotalTabaco", "TotalHour"]

  @ViewChild(BaseChartDirective, { static: false }) chart: BaseChartDirective;
  constructor(private data: DataService, private route: ActivatedRoute, private router: Router) {
    route.params.subscribe(
      (id) => {
        this.id = id.id;
        this.getItem(id.id);
        this.getConsumption(id.id);
      }
    );
    this.getItems();
  }
  getItem(id) {
    this.data.getItem(id).subscribe(
      (datas) => {
        this.item = [datas];

      }
    );
  }
  getItems() {
    this.data.getItems().subscribe(
      (datas) => {
        this.items = datas;
        for (let index = 0; index < datas.length; index++) {
          this.ids.push(
            datas[index].idFirebase
          );

        }

      }
    );
  }
  getConsumption(id) {
    this.lineCharData2 = this.lineChartData;
    this.data.getConsumption(id).subscribe(
      (datas) => {
        this.consumption = datas;
        this.nextDay = new Date('Sun Jul 14 2019');
        while (new Date() >= this.nextDay) {
          this.lineChartLabels.push(
            this.nextDay.toDateString()
          );
          this.nextDay.setDate(this.nextDay.getDate() + 1);
        }
        for (let i = 0; i < this.lineChartLabels.length; i++) {
          for (let index = 0; index < this.consumption.length; index++) {
            switch (this.consumption[index].nameItem) {
              case "Khat":
                if (this.consumption[index].date == this.lineChartLabels[i]) {
                  this.lineCharData2[2].data[i] =
                    this.consumption[index].priceItem;
                }
                if (this.lineCharData2[2].data[i] == null) {
                  this.lineCharData2[2].data[i] = 0;
                }
                this.lineCharData2[2].label =
                  this.consumption[index].nameItem;
                break;
              case "boisson":
                if (this.consumption[index].date == this.lineChartLabels[i]) {
                  this.lineCharData2[1].data[i] =
                    this.consumption[index].priceItem;
                } if (this.lineCharData2[1].data[i] == null) {
                  this.lineCharData2[1].data[i] = 0;
                }

                this.lineCharData2[1].label =
                  this.consumption[index].nameItem;

                break;
              case "Tabac":
                if (this.consumption[index].date == this.lineChartLabels[i]) {
                  this.lineCharData2[0].data[i] =
                    this.consumption[index].priceItem;
                } if (this.lineCharData2[0].data[i] == null) {
                  this.lineCharData2[0].data[i] = 0;
                }
                this.lineCharData2[0].label =
                  this.consumption[index].nameItem;

                break;

              default:
                break;
            }
          }
        }
      }
    );
  }
  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    //
  }
  search(id) {
    this.lineChartLabels = [];

    this.lineChartData = [
      {
        data: []
      },
      {
        data: []
      },
      {
        data: [],
        yAxisID: "test"
      }
    ];
    this.lineChartLabels = [];
    this.nextDay = null;
    this.getConsumption(id);
    this.getItem(id);
  }
}

