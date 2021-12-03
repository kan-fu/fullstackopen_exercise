import React from "react";
import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  const CourseHeader = ({ part }: { part: CoursePart }) => (
    <h2>
      {part.name} {part.exerciseCount}
    </h2>
  );
  return (
    <div>
      {courseParts.map((part) => {
        switch (part.type) {
          case "normal":
            return (
              <>
                <CourseHeader part={part} />
                <em>{part.description}</em>
              </>
            );
          case "groupProject":
            return (
              <>
                <CourseHeader part={part} />
                <p>project exercises {part.groupProjectCount} </p>
              </>
            );
          case "submission":
            return (
              <>
                <CourseHeader part={part} />
                <em>{part.description}</em>
                <p>submit to {part.exerciseSubmissionLink}</p>
              </>
            );
          case "special":
            return (
              <>
                <CourseHeader part={part} />
                <em>{part.description}</em>
                <p>required skills: {part.requirements.join(", ")}</p>
              </>
            );
          default: {
            const _exhaustiveCheck: never = part;
            return _exhaustiveCheck;
          }
        }
      })}
    </div>
  );
};

export default Content;
