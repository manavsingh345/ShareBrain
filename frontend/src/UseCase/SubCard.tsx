import UseSmall from "./UseSmall";

interface SubProps {
  items: string[];
}

export default function SubCard({ items }: SubProps) {
  // Split items into 2 columns
  const firstCol = items.slice(0, 3);
  const secondCol = items.slice(3, 6);

  return (
    <div className="flex px-12">
      {/* Column 1 */}
      <div className="flex flex-col gap-4 mr-6">
        {firstCol.map((t, i) => (
          <UseSmall key={i} text={t} />
        ))}
      </div>

      {/* Column 2 */}
      <div className="flex flex-col gap-4">
        {secondCol.map((t, i) => (
          <UseSmall key={i} text={t} />
        ))}
      </div>
    </div>
  );
}
