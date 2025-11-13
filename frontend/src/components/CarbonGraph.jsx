import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function CarbonGraph() {
  const [city, setCity] = useState("Unknown");
  const [chartData, setChartData] = useState(null);

  // SAMPLE CARBON DATA
  const CarbonFootprintData = {
    electricity: 2.9,
    transport: 4.1,
    waste: 1.2,
    industry: 5.6,
    agriculture: 2.3,
  };

  useEffect(() => {
    const loadGraph = (detectedCity = "Unknown") => {
      setChartData({
        labels: ["Electricity", "Transport", "Waste", "Industry", "Agriculture"],
        datasets: [
          {
            label: `Carbon Footprint (kg CO₂/day) – ${detectedCity}`,
            data: Object.values(CarbonFootprintData),
            backgroundColor: [
              "rgba(34, 197, 94, 0.7)",
              "rgba(59, 130, 246, 0.7)",
              "rgba(234, 179, 8, 0.7)",
              "rgba(239, 68, 68, 0.7)",
              "rgba(147, 51, 234, 0.7)",
            ],
          },
        ],
      });
    };

    // FIRST, try geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const { latitude, longitude } = pos.coords;

            // Reverse Geocode using Nominatim (with User-Agent fix)
            const res = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
              {
                headers: {
                  "User-Agent": "MySustainabilityApp/1.0",
                },
              }
            );

            const data = await res.json();
            const detectedCity =
              data.address?.city ||
              data.address?.town ||
              data.address?.state ||
              "Unknown";

            setCity(detectedCity);
            loadGraph(detectedCity);
          } catch (error) {
            console.log("Reverse geocoding failed:", error);
            loadGraph("Unknown");
          }
        },
        (err) => {
          console.log("Location blocked:", err);
          loadGraph("Unknown");
        }
      );
    } else {
      loadGraph("Unknown");
    }
  }, []);

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border max-w-3xl mx-auto mt-10">
      <h2 className="text-3xl font-bold text-green-700 mb-4 text-center underline italic">
        Carbon Footprint Overview
      </h2>

      <p className="text-center text-gray-600 mb-4">
        Location detected: <span className="font-semibold">{city}</span>
      </p>

      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: {
                display: true,
                text: "Estimated Carbon Footprint in Your Area",
                font: { size: 18 },
              },
            },
          }}
        />
      ) : (
        <p className="text-center text-gray-500">Loading chart...</p>
      )}
    </div>
  );
}
