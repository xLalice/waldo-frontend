function TargetingBox({ position, scaleFactor }) {
    const size = 100 * scaleFactor;
    const offset = size / 2;

    return (
        <div
            className="absolute border-2 border-solid border-red pointer-events-none"
            style={{
                left: `${position.x * scaleFactor - offset}px`,
                top: `${position.y * scaleFactor - offset}px`,
                width: `${size}px`,
                height: `${size}px`
            }}
        />
    );
}

export default TargetingBox;