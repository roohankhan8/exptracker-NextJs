import { PieChart } from "@/components";

const Charts = () => {
    const data = {
      labels: ["Food", "Transportation", "Others"],
      values: [30, 40, 30],
      colors: ["#FF5733", "#33FF57", "#5733FF"],
    };
  return (
    <div>
        
      <h1>Pie Chart Example</h1>
      <div className="w-40 h-40">
        <PieChart data={data} />
      </div>
    </div>
  )
}

export default Charts