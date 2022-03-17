export default function Dice(params) {
  return (
    <div
      className={`dice-wrapper__dice ${
        params.isHeld ? "dice-wrapper__dice--green" : ""
      }`}
      onClick={() => params.handleToggle(params.id)}
    >
      <h3 className="dice-wrapper__dice__value">{params.value}</h3>
    </div>
  );
}
