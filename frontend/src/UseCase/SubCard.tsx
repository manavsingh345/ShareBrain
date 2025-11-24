import UseSmall from "./UseSmall";

interface SubProps {
  items: string[];
}

export default function SubCard({ items }: SubProps) {
 
  const firstCol = items.slice(0, 3);
  const secondCol = items.slice(3, 6);

  return (
    <div className="flex px-12">
      
      <div className="flex flex-col gap-4 mr-6">
        {firstCol.map((t, i) => (
          <UseSmall key={i} text={t} />
        ))}
      </div>

      
      <div className="flex flex-col gap-4">
        {secondCol.map((t, i) => (
          <UseSmall key={i} text={t} />
        ))}
      </div>
    </div>
  );
}
