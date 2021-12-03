interface exerciseReport {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Args {
  target: number;
  dailyHours: Array<number>;
}

export const calculateExercises = (
  dailyHours: Array<number>,
  target: number
): exerciseReport => {
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hour) => hour !== 0).length;
  const average =
    dailyHours.reduce((val, item) => val + item, 0) / periodLength;
  const success = average > target;
  let rating;
  let ratingDescription;
  if (average < target * 0.5) {
    rating = 1;
    ratingDescription = "need to workout more!";
  } else if (average < target * 1.5) {
    rating = 2;
    ratingDescription = "not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "that is awesome";
  }
  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArguments = (args: Array<string>): Args => {
  if (args.length < 4) throw new Error("Not enough arguments");
  // if (args.length > 4) throw new Error("Too many arguments")

  // if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
  if (args.slice(2).every((arg) => !isNaN(Number(arg)))) {
    return {
      target: Number(args[2]),
      dailyHours: args.slice(3).map(Number),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};
if (require.main === module) {
  try {
    const { dailyHours, target } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
