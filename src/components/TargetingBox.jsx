function TargetingBox({ position }) {
    return (
        <div
            className="absolute left-[calc(var(--x)-50px)] top-[calc(var(--y)-50px)] w-[100px] h-[100px] border-2 border-solid border-red pointer-events-none"
            style={{'--x': `${position.x}px`, '--y': `${position.y}px`}}
        />
    );
}

export default TargetingBox;