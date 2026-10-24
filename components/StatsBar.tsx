import petlioData from "@/data/petlio.json";

export function StatsBar() {
  const { stats } = petlioData;

  return (
    <section className="border-y border-[#ede8e1] bg-[#f7f4ee]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-2 gap-6 px-6 py-8 sm:grid-cols-4 sm:px-8 lg:px-10">
        {stats.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-display text-3xl font-extrabold text-[#1e3d34] sm:text-4xl">
              {item.value}
            </p>
            <p className="mt-1 text-sm font-medium text-[#657670]">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
