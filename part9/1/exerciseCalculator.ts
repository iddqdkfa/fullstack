

interface Result { 
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const temp2: Array<string> = process.argv;

const  temp = calculateExercise(temp2);
console.log(temp);


function calculateExercise(arg: Array<string>): Result {

    const tempArr = arg.slice(2, arg.length -2);
    const args : Array<number> = tempArr.map(x => Number(x));

    const trainingDays: Array<number> = args.filter(x => x > 0);
    const avg: number = args.reduce((a: number, b: number) => a + b, 0);

    const result: Result = {
        periodLength: args.length,
        trainingDays: trainingDays.length,
        success: trainingDays.length === args.length,
        rating: args[1] > 0? 1: 0,
        ratingDescription: "To be determined",
        target: Number(arg[arg.length-1]),
        average: avg/ args.length
    };

    return result;

}