import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAllOrder } from "../../redux/reducers/OderService/allOrderService";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RevenueAdmin = () => {
  const dispatch = useDispatch();
  const { dataAllOrder } = useSelector((state) => state.listAllOrder);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [revenueData, setRevenueData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    dispatch(listAllOrder());
  }, []);

  useEffect(() => {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];

    const revenueByMonth = months.reduce((acc, month) => {
      acc[month] = 0;
      return acc;
    }, {});

    dataAllOrder.forEach((order) => {
      const date = new Date(order.Time);
      const year = date.getFullYear();
      if (year === selectedYear) {
        const month = date.toLocaleString("default", { month: "long" });
        revenueByMonth[month] += order.Total;
      }
    });

    const labels = months;
    const data = labels.map((month) => revenueByMonth[month]);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Doanh thu",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          hoverBackgroundColor: "rgba(75,192,192,0.4)",
          hoverBorderColor: "rgba(0,0,0,1)",
          data: data,
        },
      ],
    };

    setRevenueData(chartData);
  }, [dataAllOrder, selectedYear]);

  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  const years = Array.from(
    new Set(dataAllOrder.map((order) => new Date(order.Time).getFullYear()))
  );
  
  return (
    <div>
      <h2>Biểu đồ doanh thu theo tháng</h2>
      <div>
        <label>Chọn năm: </label>
        <select value={selectedYear} onChange={handleYearChange}>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <Bar
        data={revenueData}
        options={{
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Doanh thu theo tháng",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
            },
          },
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Tháng",
              },
            },
            y: {
              type: "linear",
              title: {
                display: true,
                text: "Doanh thu (VND)",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default RevenueAdmin;
