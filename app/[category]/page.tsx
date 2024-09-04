import { parseCategoryParam } from "../lib/utils";

export default function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const { numberPart, textPart } = parseCategoryParam(params.category);

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-0 md:pt-0 sm:pr-6">
      <p className="text-lg font-bold border-1 w-full text-center">
        {textPart}
      </p>
    </section>
  );
}
