function Total({ parts }) {
  const exercises = parts.map((part) => part.exercises);
  console.log(exercises);

  const total = exercises.reduce((s, p) => s + p, 0);

  return <p>Total of {total} exercises </p>;
}

export default Total;
