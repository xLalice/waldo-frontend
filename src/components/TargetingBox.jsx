function TargetingBox({ position, scaleFactor, status }) {
  const size = 100 * scaleFactor;
  const offset = size / 2;

  const baseClasses = "absolute border-4 border-solid pointer-events-none";

  let statusClasses = "border-white";

  if (status === "correct") {
    statusClasses = "border-green-500";
  } else if (status === "wrong") {
    statusClasses = "border-red-500 animate-shake";
  }

  return (
    <div
      className={`${baseClasses} ${statusClasses}`}
      style={{
        left: `${position.x * scaleFactor - offset}px`,
        top: `${position.y * scaleFactor - offset}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
}

export default TargetingBox;
