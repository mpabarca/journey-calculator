interface IResult {
  cost: number;
  distance: number;
}

function Result({ cost, distance }: IResult) {
  return (
    <section id="results" className="flex gap-12">
      <div className="flex items-start gap-2">
        <h3>Total Cost:</h3>
        <p>{`$${cost}`}</p>
      </div>
      <div className="flex items-start gap-2">
        <h3>Total Distance:</h3>
        <p>{`${distance} km`}</p>
      </div>
    </section>
  );
}

export default Result;
