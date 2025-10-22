export default function BrushSizeSlider({ value, onChange }) {
    return (
        <input
            type="range"
            min="1"
            max="50"
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
        />
    );
}
