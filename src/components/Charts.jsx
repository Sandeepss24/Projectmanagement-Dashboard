import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { useProjects } from '../context/ProjectContext';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const Charts = ({ type = "bar" }) => {
  const { projects } = useProjects();

  if (type === "bar") {
    // Project Progress Chart
    const chartData = {
      labels: projects.slice(0, 5).map(p =>
        p.name.length > 15 ? p.name.substring(0, 15) + '...' : p.name
      ),
      datasets: [
        {
          label: 'Completed Tasks',
          data: projects.slice(0, 5).map(p => p.completedTasks),
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgba(59, 130, 246, 1)',
          borderWidth: 1,
          borderRadius: 8,
        },
        {
          label: 'Remaining Tasks',
          data: projects.slice(0, 5).map(p => p.totalTasks - p.completedTasks),
          backgroundColor: 'rgba(148, 163, 184, 0.8)',
          borderColor: 'rgba(148, 163, 184, 1)',
          borderWidth: 1,
          borderRadius: 8,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 12,
              family: "'Inter', sans-serif",
            },
            padding: 15,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#475569',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 11,
            },
          },
        },
        y: {
          beginAtZero: true,
          grid: {
            color: '#f1f5f9',
          },
          ticks: {
            font: {
              size: 11,
            },
          },
        },
      },
    };

    return <Bar data={chartData} options={options} />;
  }

  if (type === "pie") {
    // Task Distribution by Status
    const statusCounts = projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {});

    const chartData = {
      labels: Object.keys(statusCounts),
      datasets: [
        {
          data: Object.values(statusCounts),
          backgroundColor: [
            'rgba(148, 163, 184, 0.8)', // Planned
            'rgba(59, 130, 246, 0.8)',  // In Progress
            'rgba(16, 185, 129, 0.8)',  // Completed
            'rgba(245, 158, 11, 0.8)',  // On Hold
          ],
          borderColor: [
            'rgba(148, 163, 184, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)',
            'rgba(245, 158, 11, 1)',
          ],
          borderWidth: 2,
        },
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: {
              size: 12,
              family: "'Inter', sans-serif",
            },
            padding: 15,
            usePointStyle: true,
          },
        },
        tooltip: {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          titleColor: '#1e293b',
          bodyColor: '#475569',
          borderColor: '#e2e8f0',
          borderWidth: 1,
          padding: 12,
          boxPadding: 6,
          usePointStyle: true,
        },
      },
    };

    return <Doughnut data={chartData} options={options} />;
  }

  return null;
};

export default Charts;
