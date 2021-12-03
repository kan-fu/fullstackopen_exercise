import express from "express";
import { calculateBmi } from "./calculateBmi";
import { calculateExercises } from "./exerciseCalculator";
const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.send({ weight, height, bmi });
  } else {
    res.send({
      error: "malformatted parameters",
    });
  }
});

app.post("/exercise", (req, res) => {
  const { daily_exercises, target } = req.body;
  if (!daily_exercises || !Array.isArray(daily_exercises) || !target) {
    res.send({
      error: "parameters missing",
    });
  } else if (
    typeof target == "number" &&
    daily_exercises.every((hour: number) => typeof hour == "number")
  ) {
    const report = calculateExercises(daily_exercises, target);
    res.send(report);
  } else {
    res.send({
      error: "malformatted parameters",
    });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
