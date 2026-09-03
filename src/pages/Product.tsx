import React from 'react';
import { useSectionNav } from '../hooks/useSectionNav';
export function Product() {
const goToSection = useSectionNav();
return (
<div className="bg-[#050B0E] text-slate-300 font-sans min-h-screen selection:bg-[#2de6d6]
selection:text-black">
{/* Background Grid & Scanline Effect */}

<div className="fixed inset-0 bg-[linear-
gradient(to_right,#091a1e_1px,transparent_1px),linear-
gradient(to_bottom,#091a1e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-
gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none

z-0" />

<main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-12 space-y-24">

{/* SECTION 1: HERO & MISSION CONTROL STATUS */}
<section className="relative border border-[#2de6d6]/20 bg-[#081216]/80 backdrop-blur
p-8 md:p-12 clip-corner">
{/* HUD Corner Accents */}
<div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#2de6d6]" />
<div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#2de6d6]" />
<div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#2de6d6]" />
<div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-
[#2de6d6]" />
<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
<div className="lg:col-span-7 space-y-6">
<div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2de6d6]/10 border
border-[#2de6d6]/40 text-[#2de6d6] font-mono text-xs tracking-wider uppercase">
<span className="w-2 h-2 rounded-full bg-[#2de6d6] animate-pulse" />
System Live // Physical AI Engine
</div>

<h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight text-white uppercase leading-none">

Transform Real World Complexity Into <span className="text-[#2de6d6] drop-shadow-[0_0_15px_rgba(45,230,214,0.4)]">Scalable AI Simulations</span>

</h1>
<p className="text-slate-400 text-lg max-w-2xl font-sans">
Enterprise-grade physical AI platform designed for generative world modeling, 3D
scene synthesis, and real-time physical simulation. Ingest multimodal spatial inputs and compile
them programmatically into interactive 3D digital environments.
</p>
<div className="flex flex-wrap gap-4 pt-4">
<a
 href="https://client.omnescene.com/"
 target="_blank"
 rel="noopener noreferrer"
className="px-6 py-3 bg-[#2de6d6] text-black font-heading font-extrabold

uppercase tracking-wider hover:bg-[#20b8ab] transition-all shadow-
[0_0_20px_rgba(45,230,214,0.3)] flex items-center gap-2"

>
<span>Explore the Dashboard</span>

<span className="font-mono text-xs">➔</span>
</a>
<a
href="#sdk"

className="px-6 py-3 border border-[#2de6d6]/50 text-white font-heading font-
extrabold uppercase tracking-wider hover:bg-[#2de6d6]/10 transition-all flex items-center gap-2"

>
<span className="text-[#2de6d6]">▷</span>
<span>NVIDIA SDK</span>
</a>
</div>
</div>
{/* Telemetry Panel Widget */}
<div className="lg:col-span-5 bg-[#030709] border border-[#2de6d6]/30 p-6 space-y-6 font-mono">

<div className="flex justify-between items-center border-b border-[#2de6d6]/20 pb-3">

<span className="text-xs text-slate-400 uppercase tracking-widest">// Telemetry Stream</span>

<span className="text-xs px-2 py-0.5 bg-[#2de6d6]/20 text-

[#2de6d6]">ONLINE</span>
</div>
<div className="space-y-4">
<div>
<div className="flex justify-between text-xs mb-1">
<span className="text-slate-400">SIMULATION ENGINE</span>
<span className="text-[#2de6d6]">ONLINE</span>
</div>
<div className="w-full bg-slate-800 h-1.5">
<div className="bg-[#2de6d6] h-1.5 w-full shadow-[0_0_8px_#2de6d6]" />
</div>
</div>
<div>
<div className="flex justify-between text-xs mb-1">
<span className="text-slate-400">ENVIRONMENTS</span>
<span className="text-[#2de6d6]">GENERATIVE</span>
</div>
<div className="w-full bg-slate-800 h-1.5">
<div className="bg-[#2de6d6] h-1.5 w-[85%]" />
</div>
</div>
<div>
<div className="flex justify-between text-xs mb-1">
<span className="text-slate-400">PHYSICAL AI</span>
<span className="text-[#2de6d6]">ACTIVE</span>
</div>
<div className="w-full bg-slate-800 h-1.5">
<div className="bg-[#2de6d6] h-1.5 w-[92%]" />
</div>
</div>
</div>

<div className="pt-4 border-t border-[#2de6d6]/20 flex justify-between items-center
text-xs">

<span className="text-slate-500">SCENARIOS GENERATED TODAY</span>
<span className="text-white font-bold text-base">48,912</span>
</div>
</div>
</div>
</section>
{/* SECTION 2: PRODUCTION CORE TECHNICAL STACK */}
<section className="space-y-6">
<div className="flex items-center gap-4">
<h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white uppercase tracking-wider">
02 // Production Core Technical Stack
</h2>
<div className="h-px bg-[#2de6d6]/30 flex-grow" />
</div>
<p className="text-slate-400 font-sans max-w-3xl">
Our machine learning and physical modeling framework bypasses high-overhead CPU
routing, maintaining end-to-end processing directly on GPU VRAM to preserve high frame-rate
rendering and low-latency simulation.
</p>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
{[
{
title: '3D Scene Engine',
tech: 'OpenUSD',
desc: 'Universal Scene Description for multi-layer 3D scene representation, dynamic asset orchestration, and real-time composition.',
},
{
title: 'Generative Core',
tech: 'PyTorch + CUDA',
desc: 'Native integration for custom diffusion backbone execution, latent space projection, and physics constraint model training.',
},
{
title: 'Geometry Engines',
tech: 'NumPy / SciPy / Open3D',
desc: 'Leveraged during procedural mesh conditioning, exploratory prototyping, and spatial topology verification.',
},
{
title: 'Container Runtime',
tech: 'AWS EKS + NVIDIA Toolkit',
desc: 'Microservices on EKS utilizing NVIDIA Container Toolkit to expose low-level GPU primitives directly.',
},
].map((stack, idx) => (
<div key={idx} className="bg-[#081216] border border-slate-800 p-6 hover:border-[#2de6d6]/50 transition-all group">

<span className="font-mono text-xs text-[#2de6d6] uppercase tracking-widest block

mb-2">{stack.title}</span>

<h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-[#2de6d6] transition-colors">{stack.tech}</h3>

<p className="text-sm text-slate-400 font-sans leading-relaxed">{stack.desc}</p>
</div>
))}
</div>
</section>
{/* SECTION 3: NVIDIA SDK INTEGRATION MATRIX */}
<section id="sdk" className="space-y-8">
<div className="flex items-center gap-4">
<h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white uppercase
tracking-wider">
03 // NVIDIA SDK Integration Matrix
</h2>
<div className="h-px bg-[#2de6d6]/30 flex-grow" />
</div>
{/* Architecture Pipeline Flow Diagram */}
<div className="bg-[#030709] border border-[#2de6d6]/30 p-6">
<span className="font-mono text-xs text-[#2de6d6] tracking-widest block mb-6
uppercase">// System Execution Pipeline</span>
<div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center font-mono text-xs">
<div className="p-4 border border-slate-800 bg-[#081216]">
<div className="text-slate-400 mb-1">INPUT</div>
<div className="text-white font-bold">Multimodal Spatial Streams</div>
</div>
<div className="p-4 border border-[#2de6d6]/40 bg-[#091a1e] text-[#2de6d6]">
<div className="text-[#2de6d6]/70 mb-1">AGGREGATION</div>
<div className="font-bold">Omniverse Core & PhysX 5</div>
</div>
<div className="p-4 border border-[#2de6d6]/40 bg-[#091a1e] text-[#2de6d6]">
<div className="text-[#2de6d6]/70 mb-1">FOUNDATION</div>
<div className="font-bold">NVIDIA Cosmos Platform</div>
</div>
<div className="p-4 border border-[#2de6d6]/40 bg-[#091a1e] text-[#2de6d6]">
<div className="text-[#2de6d6]/70 mb-1">INFERENCE</div>
<div className="font-bold">TensorRT / TensorRT-LLM</div>
</div>
</div>
</div>
{/* Integration Modules Grid */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">

<div className="bg-[#081216] border border-slate-800 p-6 flex flex-col justify-
between">

<div className="space-y-4">
<span className="font-mono text-xs text-[#2de6d6] uppercase">// Spatial & Physics</span>

<h3 className="font-heading text-xl font-bold text-white">NVIDIA Omniverse & PhysX 5</h3>

<div className="space-y-2 text-sm font-sans">
<p className="text-slate-400"><strong className="text-slate-200">Bottleneck:</strong> Monolithic engine lock-in and slow multi-agent physics.</p>
<p className="text-slate-300"><strong className="text-[#2de6d6]">Implementation:</strong> OpenUSD asset pipelines combined with PhysX 5 for GPU-accelerated rigid-body and deformable mesh collisions.</p>

</div>
</div>
</div>

<div className="bg-[#081216] border border-slate-800 p-6 flex flex-col justify-
between">

<div className="space-y-4">
<span className="font-mono text-xs text-[#2de6d6] uppercase">// World Model Foundation</span>

<h3 className="font-heading text-xl font-bold text-white">NVIDIA Cosmos

Platform</h3>

<div className="space-y-2 text-sm font-sans">
<p className="text-slate-400"><strong className="text-slate-200">Bottleneck:</strong> Manual edge-case world design requires thousands of 3D artist hours.</p>

<p className="text-slate-300"><strong className="text-[#2de6d6]">Implementation:</strong> Embeds Cosmos Predict/Transfer pipelines to synthesize sensor-accurate camera/LiDAR extensions zero-shot.</p>

</div>
</div>
</div>

<div className="bg-[#081216] border border-slate-800 p-6 flex flex-col justify-
between">

<div className="space-y-4">
<span className="font-mono text-xs text-[#2de6d6] uppercase">// Low-Latency

Optimization</span>

<h3 className="font-heading text-xl font-bold text-white">NVIDIA TensorRT</h3>
<div className="space-y-2 text-sm font-sans">
<p className="text-slate-400"><strong className="text-slate-200">Bottleneck:</strong> Deep spatial diffusion inference latency disrupts real-time loops.</p>
<p className="text-slate-300"><strong className="text-[#2de6d6]">Implementation:</strong> Models exported via ONNX and compiled using FP16/INT8 quantization and custom kernel fusion.</p>

</div>
</div>
</div>
</div>
</section>
{/* SECTION 4: COMPUTE & HARDWARE JUSTIFICATION */}
<section className="space-y-6">
<div className="flex items-center gap-4">
<h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white uppercase
tracking-wider">
04 // Compute & AWS Infrastructure
</h2>
<div className="h-px bg-[#2de6d6]/30 flex-grow" />
</div>
<div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
<div className="lg:col-span-7 bg-[#081216] border border-slate-800 p-6 space-y-4">
<span className="font-mono text-xs text-[#2de6d6] uppercase">// Scale
Justification</span>
<h3 className="font-heading text-2xl font-bold text-white">NVIDIA H100 / H200
Compute Tier Migration</h3>
<p className="text-slate-400 font-sans leading-relaxed">

Generative physical simulations scale non-linearly in memory requirements when
handling dense high-resolution meshes, spatial latent tensors, and multi-sensor synthetic feeds
concurrently. The NVIDIA H100’s Transformer Engine and vast HBM3 memory bandwidth are
strictly required to compute high-parameter physical AI models without hitting Out-Of-Memory
(OOM) runtime faults.
</p>
</div>
<div className="lg:col-span-5 bg-[#030709] border border-[#2de6d6]/30 p-6 font-mono text-xs space-y-4 flex flex-col justify-center">
<div className="border-b border-slate-800 pb-2">
<span className="text-slate-500 block">EVALUATION TIER</span>
<span className="text-white font-bold text-sm">Amazon EC2 P4d / P4de (A100

80GB)</span>
</div>
<div>
<span className="text-slate-500 block">TARGET PRODUCTION TIER</span>
<span className="text-[#2de6d6] font-bold text-sm">Amazon EC2 P5 / P5e

(H100/H200)</span>
</div>
</div>
</div>
</section>
{/* SECTION 5: ADVANCED TECHNOLOGY ROADMAP */}
<section className="space-y-6">
<div className="flex items-center gap-4">
<h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white uppercase
tracking-wider">
05 // Advanced Roadmap (Q3–Q4)
</h2>
<div className="h-px bg-[#2de6d6]/30 flex-grow" />
</div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
<div className="bg-[#081216] border border-slate-800 p-6 relative overflow-hidden">
<div className="absolute top-0 right-0 px-3 py-1 bg-slate-800 font-mono text-[10px]
text-slate-300">PHASE 1</div>
<h3 className="font-heading text-xl font-bold text-white mb-3">NVIDIA Isaac Sim &
Isaac Lab Integration</h3>
<p className="text-slate-400 text-sm font-sans leading-relaxed">
Integrating Isaac Sim libraries into the core pipeline to enable automated synthetic
data generation, physical validation, and reinforcement learning environments for robotic agents
operating inside OmneScene digital twins.
</p>
</div>
<div className="bg-[#081216] border border-slate-800 p-6 relative overflow-hidden">
<div className="absolute top-0 right-0 px-3 py-1 bg-slate-800 font-mono text-[10px]
text-slate-300">PHASE 2</div>
<h3 className="font-heading text-xl font-bold text-white mb-3">Triton Inference
Server & NIM Migration</h3>
<p className="text-slate-400 text-sm font-sans leading-relaxed">
Transitioning spatial inference runtimes to Triton Inference Server for dynamic
batching across multi-GPU nodes, while containerizing custom generative world workflows into
NVIDIA NIM microservices to streamline production scaling.
</p>

</div>
</div>
</section>
{/* SECTION 6: INCEPTION PROGRAM MISSION CONTROL ACTION */}

<section className="border border-[#2de6d6]/40 bg-[linear-
gradient(180deg,#081216_0%,#030709_100%)] p-8 md:p-12 text-center space-y-6 relative">

<span className="font-mono text-xs text-[#2de6d6] uppercase tracking-widest">//
Access Portal</span>
<h2 className="font-heading text-3xl sm:text-4xl font-extrabold text-white uppercase">
Deploy Physical World Modeling At Scale
</h2>
<p className="text-slate-400 max-w-xl mx-auto font-sans text-sm md:text-base">
OmneScene is currently expanding deep ecosystem integrations alongside NVIDIA
simulation frameworks and high-performance AWS cloud acceleration.
</p>
<div className="pt-2 flex justify-center gap-4 font-mono text-xs">
<a
href="/"
onClick={(event) => {
event.preventDefault();
goToSection('contact');
}}
target="_blank"
rel="noopener noreferrer"
className="px-4 py-2 border border-[#2de6d6]/40 bg-[#2de6d6]/10 text-[#2de6d6]
hover:bg-[#2de6d6]/20 transition-colors"
>
Contact Us
</a>
</div>
</section>
</main>
</div>
);
}