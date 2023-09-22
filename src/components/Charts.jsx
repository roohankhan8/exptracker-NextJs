import { PieChart } from "@/components";

const Charts = ({expenses}) => {
    let foodTotal = 0
    let transportationTotal = 0
    let othersTotal = 0
    console.log(expenses)
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
        colors: ["#FF5733", "#33FF57", "#5733FF"],
    };
    let total = foodTotal + transportationTotal + othersTotal
    console.log(total)
    if (total > 0) {
        return (<>
            <div className="h-screen w-full flex items-center justify-center">
                <PieChart data={data} />
            </div>
        </>
        );
    } else {
        return (
            <div className="h-screen text-3xl font-bold w-full flex items-center justify-center">Loading...</div>
        )
    }
}

export default Charts