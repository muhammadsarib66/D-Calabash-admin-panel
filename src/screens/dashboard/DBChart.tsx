import Chart from 'react-apexcharts'

const chartData = {
          
  series: [{
    name: 'sales',
    data: [31, 40, 28, 51, 42, 109,99],
    
  }, {
    name: 'orders',
    data: [11, 32, 45, 32, 34, 52, 41],
  }],
  options: {
    chart: {
      height: 350,
      type: 'area'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: ["2018-09-19T00:00:00.000Z", "2018-09-19T01:30:00.000Z", "2018-09-19T02:30:00.000Z", "2018-09-19T03:30:00.000Z", "2018-09-19T04:30:00.000Z", "2018-09-19T05:30:00.000Z", "2018-09-19T06:30:00.000Z"]
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },
  },


}
const DBChart = () => {
    
      return (
        <div className="app">
          <div className="row  bg-white w-full rounded-md ">
            <h1 className='py-5 px-8 text-2xl font-semibold'> Sales Detail</h1>
            <div className="mixed-chart">
              <Chart
                options={chartData.options}
                series={chartData.series}
                type="area" 
                width={'100%'}
                height={350}
              />
            </div>
          </div>
        </div>
      );
}

export default DBChart
