import { PieChart } from "@/components";

const Charts = ({ expenses }) => {
    let foodTotal = 0
    let transportationTotal = 0
    let othersTotal = 0
    for (let i in expenses) {
        if (expenses[i].typeOfExp == 'food') {
            foodTotal += parseInt((expenses[i].amount))
        }
        else if (expenses[i].typeOfExp == 'transportation') {
            transportationTotal += parseInt((expenses[i].amount))
        }
        else if (expenses[i].typeOfExp == 'others') {
            othersTotal += parseInt((expenses[i].amount))
        }
    }
    const data = {
        labels: ["Food", "Transportation", "Others"],
        values: [foodTotal, transportationTotal, othersTotal],
        colors: ["#082082", "#cfd8fc", "#0e3bf1"],
    };
    let total = foodTotal + transportationTotal + othersTotal
    console.log(total)
    return (
        <>
            {
                total > 0 ? (
                    <div className="w-full flex items-center justify-center">
                        <PieChart data={data} className='border-2' />
                    </div>
                ) : (
                    <div className="h-screen text-3xl font-bold w-full flex items-center justify-center">No expenses this month!</div>

                )
            }
        </>
    )
}

export default Charts
