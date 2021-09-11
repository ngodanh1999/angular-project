import { Component, OnInit, ViewChild } from "@angular/core";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  stroke: ApexStroke;
  tooltip: ApexTooltip;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>| any;
  public chartOptionsPie: Partial<ChartOptions>| any;

  myDate = new Date();
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Tổng phiếu xuất",
          data: [0, 0, 0, 0, 50, 100, 0,0]
        },
        {
          name: "Tổng phiếu nhập",
          data: [0, 0, 0, 0, 0, 100, 0,0]
        }
      ],
      chart: {
        height: 350,
        type: "area"
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "smooth"
      },
      xaxis: {
        type: "datetime",
        categories: [
          "2018-09-19T00:00:00.000Z",
          "2018-09-19T01:30:00.000Z",
          "2018-09-19T02:30:00.000Z",
          "2018-09-19T03:30:00.000Z",
          "2018-09-19T04:30:00.000Z",
          "2018-09-19T05:30:00.000Z",
          "2018-09-19T06:30:00.000Z",
          // "now",
        ]
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm"
        }
      }
    };
    this.chartOptionsPie = {
      series: [26.667, 26.667, 26.667, 20, 1],
      chart: {
        width: 580,
        type: "donut"
      },
      labels: ["BẠC BIÊN BẠC BALIE HYUNDAI STAREX", "BÁNH ĐÀ SUZUKI PRO, APV", "BÁNH ĐÀ SUZUKI PRO, APV ", "BA ĐỜ SỐC/ CẢN TRƯỚC NISSAN TEANA", "Other"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              // width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  ngOnInit(): void {
    this.chartOptions;
    this.chartOptionsPie;
    
    // throw new Error("Method not implemented.");
    
  }
  check(){
    console.log(this.myDate)
  }

  public generateData(baseval: number, count: number, yrange: { max: number; min: number; }) {
    var i = 0;
    var series = [];
    while (i < count) {
      var x = Math.floor(Math.random() * (750 - 1 + 1)) + 1;
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min;
      var z = Math.floor(Math.random() * (75 - 15 + 1)) + 15;

      series.push([x, y, z]);
      baseval += 86400000;
      i++;
    }
    return series;
  }

}
