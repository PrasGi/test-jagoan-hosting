import { useEffect } from "react";
import ChartDataInterface from "../../interfaces/ChartDataInterface";
import SumaryResumeInterface from "../../interfaces/SumaryResumeInterface";
import AuthenticateMiddleware from "../../middleware/AuthenticateMiddleware";
import PaymentService from "../../services/PaymentService";
import ResourceHelper from "../../utils/ResourceHelper";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ApexCharts from "apexcharts";

const HomePage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        AuthenticateMiddleware();
        const paymentService = new PaymentService();
        const response = await paymentService.getSumaryResume();
        if (Array.isArray(response) && response.length > 0) {
          generateChart(response);
        } else {
          console.error("Error fetching data:", response);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Fungsi untuk generate chart
  const generateChart = (data: SumaryResumeInterface[]) => {
    const series: { monthDataSeries1: ChartDataInterface } = {
      monthDataSeries1: {
        prices: [],
        dates: [],
      },
    };

    data.forEach((item) => {
      series.monthDataSeries1.prices.push(parseFloat(item.total_amount));
      series.monthDataSeries1.dates.push(item.name_month); // Konversi ke JavaScript Date
    });

    new ApexCharts(document.querySelector("#areaChart"), {
      series: [
        {
          name: "Total Amount",
          data: series.monthDataSeries1.prices,
        },
      ],
      chart: {
        type: "area",
        height: 600,
        width: "100%",
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      subtitle: {
        text: "Price Movements",
        align: "left",
      },
      labels: series.monthDataSeries1.dates,
      xaxis: {
        type: "text",
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    }).render();
  };

  return (
    <>
      <ResourceHelper />
      <Navbar />
      <Sidebar />
      <main className="main" id="main">
        <div id="areaChart"></div>
      </main>
    </>
  );
};

export default HomePage;
