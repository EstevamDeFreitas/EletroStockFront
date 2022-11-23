import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexDataLabels, ApexGrid, ApexStroke, ApexTitleSubtitle, ApexXAxis, ChartComponent } from 'ng-apexcharts';
import { SaleSummaryDTO } from 'src/app/access/models/saleSummaryDTO.model';
import { SaleService } from 'src/app/access/services/sale/sale.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-sale-summary',
  templateUrl: './sale-summary.component.html',
  styleUrls: ['./sale-summary.component.scss']
})
export class SaleSummaryComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> | any;

  public startDate !: string;
  public endDate !: string;
  public productCode !: string;

  constructor(private saleService : SaleService) {

    this.chartOptions = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Resumo de vendas por produto",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      }
    };

  }

  public saleSummary !: SaleSummaryDTO;

  ngOnInit(): void {
    this.getChartInfo(null, null, null);
  }

  getChartInfo(startDate: string | null, endDate: string | null, productCode: string | null){
    this.saleService.getSaleSummary(startDate, endDate, productCode, false).subscribe(res => {

      this.saleSummary = res.data


      this.loadChartInfo();

    });
  }

  loadChartInfo(){
    this.chartOptions.series = [];

    let series : {
      name: string,
      data : any
    }[] = [];

    this.saleSummary.monthlyProductValue.forEach((date) => {

        if(series.find(x => x.name == date.productName) == undefined){
          series.push({name : date.productName, data : []})
        }
    })

    this.saleSummary.monthlyProductValue.forEach((date) => {
      date.values.forEach((commodity) => {
        let indexOfSeries = series.findIndex(x => x.name == date.productName);

        if(series[indexOfSeries].data == undefined){
          series[indexOfSeries].data = [];
        }

        series[indexOfSeries].data.push({x:commodity.month, y:commodity.data});
      });
    });

    series.forEach(serie => {
      this.chartOptions.series.push({
        name: serie.name,
        data: serie.data
      });
    });
  }

}
