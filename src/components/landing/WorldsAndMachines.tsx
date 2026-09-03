import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { SimulationScene, type Weather } from '../SimulationScene';
import { Eyebrow, Headline, Lede } from '../Typography';
import { ActionButton } from '../Button';
import { useUI } from '../../contexts/UIContext';

type WorldState = {
  label: string;
  detail: string;
  weather: Weather;
  night: boolean;
  traffic: number;
};

const worldStates: WorldState[] = [
  { label: 'Coastal highway · midday · clear', detail: 'Baseline scenario, full sensor visibility.', weather: 'clear', night: false, traffic: 0.6 },
  { label: 'Dense corridor · dusk · rain', detail: 'Reflective surfaces, degraded LiDAR return.', weather: 'rain', night: false, traffic: 1.4 },
  { label: 'Urban grid · night · heavy traffic', detail: 'Low light, high agent density, occlusion events.', weather: 'clear', night: true, traffic: 2 },
  { label: 'Industrial approach · dawn · fog', detail: 'Visibility 31%, generated terrain variation.', weather: 'fog', night: false, traffic: 0.8 }];


const roboticsSignals = [
  { k: 'LIDAR', v: '128 channel, 20 Hz' },
  { k: 'Depth sensor', v: 'Stereo, 0.3–14 m' },
  { k: 'Path planning', v: 'Replanned at 40 Hz' },
  { k: 'Collision zone', v: '2.6 m dynamic buffer' },
  { k: 'Object recognition', v: '312 labelled classes' }];


const scenarioControls = [
  { id: 'rain', label: 'Rain' },
  { id: 'fog', label: 'Poor visibility' },
  { id: 'night', label: 'Night' },
  { id: 'traffic', label: 'Heavy traffic' },
  { id: 'pedestrian', label: 'Pedestrian' },
  { id: 'obstacle', label: 'Road obstacle' }] as
  const;

type ScenarioId = (typeof scenarioControls)[number]['id'];

function GenerativeEnvironments() {
  const ref = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false);
  const horizontalScrollTimeout = useRef<NodeJS.Timeout>();

  const handleWheel = (e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      setIsHorizontalScrolling(true);
      clearTimeout(horizontalScrollTimeout.current);
      horizontalScrollTimeout.current = setTimeout(() => {
        setIsHorizontalScrolling(false);
      }, 150);
    }
  };

  React.useEffect(() => {
    const element = ref.current;
    if (element) {
      element.addEventListener('wheel', handleWheel, { passive: true });
      return () => element.removeEventListener('wheel', handleWheel);
    }
  }, []);

  React.useEffect(() => {
    if (isHorizontalScrolling) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % worldStates.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isHorizontalScrolling]);

  const state = worldStates[index];
  const totalVariations = 12480;
  const variationNumber = Math.min(index + 1, totalVariations);

  return (
    <div id="environments" ref={ref} className="relative h-[100vh] scroll-mt-0">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <SimulationScene
            kind="road"
            weather={state.weather}
            night={state.night}
            traffic={state.traffic}
            speed={0.3}
            labels={false}
            ariaLabel={`Generated environment: ${state.label}`} />

        </div>
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-void via-transparent to-void" />

        <div className="mx-auto w-full max-w-[1500px] px-5 pt-28 sm:px-8">
          <Eyebrow index="03">Generative environments</Eyebrow>
          <Headline
            text="BUILD *THOUSANDS* OF WORLDS."
            className="mt-5 max-w-4xl text-[11vw] sm:text-[7.5vw] lg:text-[5vw]" />

          <Lede className="mt-5 text-chalk/80">
            Generate different roads, cities, terrains, weather conditions, traffic patterns and physical
            environments without building each scenario by hand.
          </Lede>
        </div>

        <div className="mx-auto w-full max-w-[1500px] px-5 pb-10 sm:px-8 sm:pb-14">
          <div className="flex flex-col gap-4 border-t border-cyan/20 pt-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">
                Variation {String(variationNumber).padStart(3, '0')} / {totalVariations.toLocaleString()}
              </span>
              <p className="mt-2 font-display text-lg font-bold uppercase tracking-[0.12em] text-chalk sm:text-2xl">
                {state.label}
              </p>
              <p className="mt-1 text-sm text-mist">{state.detail}</p>
            </div>
            <div className="flex gap-1.5" aria-hidden="true">
              {worldStates.map((w, i) =>
                <span
                  key={w.label}
                  className={`h-1 w-10 transition-colors duration-300 ease-out sm:w-16 ${i === index ? 'bg-cyan' : 'bg-cyan/20'}`}
                />

              )}
            </div>
          </div>
        </div>
      </div>
    </div>);

}

function Robotics() {
  return (
    <div id="robotics" className="relative scroll-mt-28 px-5 py-28 sm:px-8 lg:py-36">
      <div className="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[1.15fr_1fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-15%' }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="relative h-[52vh] min-h-[320px] border border-cyan/20 lg:h-[68vh]">

          <SimulationScene
            kind="robot"
            speed={0.05}
            labels
            ariaLabel="Simulated robot navigating a cell with a sensor sweep, planned path and collision boundary" />

          <span className="absolute -left-px -top-px h-6 w-6 border-l-2 border-t-2 border-cyan" aria-hidden="true" />
          <span className="absolute -bottom-px -right-px h-6 w-6 border-b-2 border-r-2 border-cyan" aria-hidden="true" />
          <span className="absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-tech text-cyan/70">
            Cell A · AMR-04 · replay seed 0x7C21
          </span>
        </motion.div>

        <div>
          <Eyebrow index="04">Robotics simulation</Eyebrow>
          <Headline
            text="TRAIN MACHINES IN THE *VIRTUAL* WORLD."
            className="mt-5 text-[9vw] sm:text-[6vw] lg:text-[3.4vw]" />

          <Lede className="mt-5">
            Import a robot, attach your controller, and watch movement, perception and planning behave under real physics - with every signal visible inside the scene.
          </Lede>
          <dl className="mt-8 divide-y divide-cyan/12 border-y border-cyan/15">
            {roboticsSignals.map((s) =>
              <div key={s.k} className="flex items-baseline justify-between gap-6 py-3">
                <dt className="font-mono text-[11px] uppercase tracking-tech text-cyan/70">{s.k}</dt>
                <dd className="text-sm text-chalk/85">{s.v}</dd>
              </div>
            )}
          </dl>
        </div>
      </div>
    </div>);

}

function AutonomousVehicles() {
  const [active, setActive] = useState<Record<ScenarioId, boolean>>({
    rain: false,
    fog: false,
    night: false,
    traffic: false,
    pedestrian: false,
    obstacle: false
  });
  const { openModal } = useUI();

  const weather: Weather = active.fog ? 'fog' : active.rain ? 'rain' : 'clear';
  const visibility = active.fog ? 31 : active.rain ? 62 : active.night ? 74 : 100;
  const risk = Math.min(
    99,
    12 + (
      active.rain ? 18 : 0) + (
      active.fog ? 26 : 0) + (
      active.night ? 14 : 0) + (
      active.traffic ? 16 : 0) + (
      active.pedestrian ? 12 : 0) + (
      active.obstacle ? 15 : 0)
  );

  const toggle = (id: ScenarioId) => setActive((a) => ({ ...a, [id]: !a[id] }));
  const reset = () =>
    setActive({ rain: false, fog: false, night: false, traffic: false, pedestrian: false, obstacle: false });

  return (
    <div id="autonomous" className="relative scroll-mt-28 px-5 py-24 sm:px-8 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <div className="grid gap-8 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <Eyebrow index="05">Autonomous vehicles</Eyebrow>
            <Headline text="TEST THE *EDGE CASES*." className="mt-5 text-[12vw] sm:text-[8vw] lg:text-[5.2vw]" />
          </div>
          <Lede className="lg:pb-4">
            Rain. Traffic. Obstacles. Poor visibility. Unexpected movement. OmneScene lets teams test these
            situations before they happen on the road.
          </Lede>
        </div>

        <div className="mt-12 grid gap-0 lg:grid-cols-[1fr_320px]">
          <div className="relative h-[54vh] min-h-[340px] border border-cyan/20 lg:h-[70vh]">
            <SimulationScene
              kind="road"
              weather={weather}
              night={active.night}
              traffic={active.traffic ? 2.2 : 0.7}
              pedestrian={active.pedestrian}
              obstacle={active.obstacle}
              speed={0.24}
              labels
              ariaLabel={`Autonomous vehicle simulation with ${weather} weather${active.night ? ', night' : ''}${active.traffic ? ', heavy traffic' : ''}`
              } />

            <div className="pointer-events-none absolute left-4 top-4 flex flex-wrap gap-2">
              <span className="bg-void/70 px-2 py-1 font-mono text-[10px] uppercase tracking-tech text-cyan">
                Run 0x{(risk * 977).toString(16).toUpperCase()}
              </span>
            </div>
          </div>

          <aside className="border border-cyan/20 border-t-0 p-5 lg:border-l-0 lg:border-t">
            <h3 className="font-mono text-[10px] uppercase tracking-tech text-cyan/70">Scenario controls</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {scenarioControls.map((s) =>
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-pressed={active[s.id]}
                  data-cursor="TOGGLE"
                  className={`border px-3 py-2 font-display text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 ease-out ${active[s.id] ?
                      'border-cyan bg-cyan/15 text-cyan' :
                      'border-cyan/20 text-mist hover:border-cyan/50 hover:text-chalk'}`
                  }>

                  {s.label}
                </button>
              )}
            </div>

            <div className="mt-6 space-y-4 border-t border-cyan/15 pt-5">
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-tech text-mist/70">Sensor visibility</span>
                  <span className="font-display text-sm font-bold text-cyan">{visibility}%</span>
                </div>
                <div className="mt-2 h-1 w-full bg-cyan/15">
                  <motion.div
                    animate={{ width: `${visibility}%` }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    className="h-full bg-cyan" />

                </div>
              </div>
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-tech text-mist/70">Scenario difficulty</span>
                  <span className="font-display text-sm font-bold text-orange-300">{risk}</span>
                </div>
                <div className="mt-2 h-1 w-full bg-cyan/15">
                  <motion.div
                    animate={{ width: `${risk}%` }}
                    transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                    className="h-full bg-orange-300/80" />

                </div>
              </div>
              <p className="text-xs leading-relaxed text-mist">
                {risk > 60 ?
                  'Compound conditions. This is the class of scenario that rarely survives contact with a real test track.' :
                  'Adjust conditions to compound the scenario and watch the sensor envelope contract.'}
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <ActionButton onClick={() => openModal('register')} cursorLabel="START" className="w-full">
                Start simulation
              </ActionButton>
              <button
                type="button"
                onClick={reset}
                data-cursor="RESET"
                className="w-full py-2 font-mono text-[10px] uppercase tracking-tech text-mist transition-colors duration-200 ease-out hover:text-cyan">

                Reset conditions
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>);

}

export function WorldsAndMachines() {
  return (
    <section aria-label="Generative environments, robotics and autonomous vehicle simulation">
      <GenerativeEnvironments />
      <Robotics />
      <AutonomousVehicles />
    </section>);

}