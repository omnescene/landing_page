import React from 'react';
import { Eyebrow, Headline } from '../Typography';

const placeholderGraphics = [
  {
    title: 'Traffic scene',
    copy: 'A multi-lane urban intersection with vehicles, pedestrians, and road markings tracked in real time.',
    visualDescription: 'Illustration of an autonomous vehicle navigating a busy urban intersection.',
    kicker: '01',
    gradient: 'from-cyan/30 via-cyan/10 to-void',
    accent: 'bg-cyan'
  },
  {
    title: 'Warehouse map',
    copy: 'A facility map showing robot routes, restricted zones, loading bays, and live operational activity.',
    visualDescription: 'Top-down warehouse map with autonomous robot routes and operational zones.',
    kicker: '02',
    gradient: 'from-violet-500/20 via-cyan/10 to-void',
    accent: 'bg-violet-400'
  },
  {
    title: 'Sensor stack',
    copy: 'A fused view of LiDAR, camera, and radar inputs aligned around the same physical environment.',
    visualDescription: 'Sensor-fusion diagram combining LiDAR, camera, and radar views of a vehicle environment.',
    kicker: '03',
    gradient: 'from-emerald-500/20 via-cyan/10 to-void',
    accent: 'bg-emerald-400'
  },
  {
    title: 'City grid',
    copy: 'A city-scale simulation that reveals traffic movement, infrastructure, and changing environmental context.',
    visualDescription: 'City-scale simulation map showing traffic movement and surrounding infrastructure.',
    kicker: '04',
    gradient: 'from-blue-500/20 via-cyan/10 to-void',
    accent: 'bg-blue-400'
  },
  {
    title: 'Occupancy view',
    copy: 'An occupancy heatmap that makes open space, obstacles, and predicted movement visible at a glance.',
    visualDescription: 'Environment heatmap highlighting free space, obstacles, and predicted movement.',
    kicker: '05',
    gradient: 'from-pink-500/20 via-cyan/10 to-void',
    accent: 'bg-pink-400'
  },
  {
    title: 'Control loop',
    copy: 'A decision flow connecting perception, planning, control, and the resulting action in the physical world.',
    visualDescription: 'Robotics control-flow diagram connecting perception, planning, control, and action.',
    kicker: '06',
    gradient: 'from-amber-500/20 via-cyan/10 to-void',
    accent: 'bg-amber-400'
  },
  {
    title: 'Validation board',
    copy: 'A validation board comparing scenario outcomes, edge cases, and performance signals across test runs.',
    visualDescription: 'Validation dashboard comparing simulation outcomes and performance across test runs.',
    kicker: '07',
    gradient: 'from-teal-500/20 via-cyan/10 to-void',
    accent: 'bg-teal-400'
  },
  {
    title: 'Deployment preview',
    copy: 'A deployment view showing how a validated scenario moves from simulation into a production system.',
    visualDescription: 'Deployment architecture showing a validated simulation scenario moving into production.',
    kicker: '08',
    gradient: 'from-sky-500/20 via-cyan/10 to-void',
    accent: 'bg-sky-400'
  }
];

export function GraphicShowcase() {
  return (
    <section id="showcase" className="relative scroll-mt-28 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Eyebrow index="10">Built for real-world scenarios</Eyebrow>
            <Headline text="THE PLATFORM IS *VISUAL BY DESIGN*." className="mt-5 text-[11vw] sm:text-[7vw] lg:text-[4vw]" />
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-mist sm:text-base">
            The product is built around physical environments, sensor stacks, and decision loops. These sample visuals show the types of system graphics the final design should communicate across robotics, mobility, and industrial simulation.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {placeholderGraphics.map((item) => (
            <div key={item.title} className="group rounded-2xl border border-cyan/15 bg-[rgba(5,12,14,0.72)] p-3 shadow-[0_0_30px_rgba(46,230,214,0.04)] transition-transform duration-300 ease-out hover:-translate-y-1">
              <div className={`relative overflow-hidden rounded-xl border border-cyan/15 bg-gradient-to-br ${item.gradient} p-4`}>
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(46,230,214,0.18),transparent_40%)]" aria-hidden="true" />
                <div className="relative flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">{item.kicker}</span>
                  <span className={`h-2.5 w-2.5 rounded-full ${item.accent} shadow-[0_0_14px_rgba(46,230,214,0.8)]`} aria-hidden="true" />
                </div>

                <div
                  className="relative mt-6 aspect-[12/7] overflow-hidden rounded-xl border border-cyan/10 bg-void/40"
                  role="img"
                  aria-label={item.visualDescription}
                >
                  <img
                    src={`/solutions${Number(item.kicker) === 1 ? '' : ' '}(${Number(item.kicker)}).png`}
                    alt={item.visualDescription}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-display text-base font-bold uppercase tracking-[0.14em] text-chalk">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{item.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
