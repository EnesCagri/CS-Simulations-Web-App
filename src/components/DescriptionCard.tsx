import { Card } from "@/components/ui/card";

type Section = {
  heading: string;
  paragraphs?: string[];
  list?: string[];
};

type DescriptionData = {
  title: string;
  sections: Section[];
};

export function DescriptionCard({ data }: { data: DescriptionData }) {
  return (
    <Card className="p-6 bg-white/10 border border-white/20 rounded-2xl shadow-md text-blue-50">
      <h2 className="text-2xl font-semibold text-cyan-200 mb-4">
        {data.title}
      </h2>

      {data.sections.map((sec: Section, i: number) => (
        <section key={i}>
          <h3 className="text-xl font-semibold text-cyan-200 mb-2">
            {sec.heading}
          </h3>
          {sec.paragraphs?.map((p: string, j: number) => (
            <p className="text-blue-100 mb-4" key={j}>
              {p}
            </p>
          ))}
          {sec.list && (
            <ul className="list-disc list-inside text-blue-100 mb-4">
              {sec.list.map((item: string, k: number) => (
                <li key={k}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </Card>
  );
}
