

console.log(calculateBmi(Number(process.argv[2]), Number(process.argv[3])));


export default function calculateBmi(cm : number, kg: number): string {
    const bmi : number = kg/((cm/100)*(cm/100));
    let msg : string;

    if(bmi < 18.5) {
        msg = "Underweight";

    } else if(bmi >= 18.5 && bmi <= 24.9) {
        msg = "Normal";

    } else if(bmi >=25 && bmi <= 29.9) {
        msg = "Overwight";
    } else {
        msg = "Obese";
    }

    
    return msg;

}