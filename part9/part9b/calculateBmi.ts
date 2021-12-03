interface Args {
  height: number;
  weight: number;
}
export const calculateBmi = (height: number, weight: number): string => {
  // CDC standard at https://www.cdc.gov/healthyweight/assessing/bmi/adult_bmi/index.html
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 24.9) {
    return "Healthy Weight";
  } else if (bmi < 29.9) {
    return "Overweight";
  } else {
    return "Obesity";
  }
};

const parseArguments = (args: Array<string>): Args => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

if (require.main === module) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
  }
}
