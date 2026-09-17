export type NavLink = {
  id: string;
  label: string;
  /** Landing page section id, when the link scrolls within the landing page. */
  section?: string;
  /** Route path, when the link navigates to another page. */
  path?: string;
};

/** Primary navigation. Section links scroll on the landing page. */
export const navLinks: NavLink[] = [
{ id: 'platform', label: 'Platform', section: 'platform' },
{ id: 'technology', label: 'Technology', section: 'technology' },
{ id: 'solutions', label: 'Solutions', section: 'solutions' },
{ id: 'pricing', label: 'Pricing', section: 'pricing' },
{ id: 'contact', label: 'Contact', section: 'contact' }];


/**
 * Social profiles. Replace these URLs with the real OmneScene accounts:
 * this is the single place they are defined.
 */
export const socialLinks = [
{ id: 'linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/company/omnescene' },
{ id: 'x', label: 'X', href: 'https://x.com/OmneScene8d' },
{ id: 'facebook', label: 'Facebook', href: 'https://www.facebook.com/OmneScene' },
{ id: 'youtube', label: 'YouTube', href: 'https://www.youtube.com/@OmneScene' },
{ id: 'f6s', label: 'F6S', href: 'https://www.f6s.com/omnescene-ai-inc' },
{ id: 'crunchbase', label: 'Crunchbase', href: 'https://www.crunchbase.com/organization/omnescene-ai-inc' }];


export const contactInfo = {
  email: 'support@omnescene.com',
  phone: '+1 (415) 555-0148',
  address: '73 Havelock Road, Colombo 05, Sri Lanka',
  offices: [
  {
    region: 'Sri Lanka',
    company: 'OmneScene Technologies (Pvt) Ltd.',
    address: '73 Havelock Road, Colombo 05, Sri Lanka',
    phone: '+94 11 239 6745',
    phoneHref: '+94112396745'
  },
  {
    region: 'USA',
    company: 'OmneScene Technologies Inc',
    address: '201 Mission Street, Suite 1200, San Francisco, CA 94105, USA',
    phone: '+1 415 555 8743',
    phoneHref: '+14155558743'
  }],
  website: 'https://omnescene.com/',
  domain: 'OMNESCENE.COM'
};

export const workflowStages = [
{
  index: '01',
  title: 'CONNECT',
  copy: 'Robots, vehicles, sensors, models and datasets.'
},
{
  index: '02',
  title: 'GENERATE',
  copy: 'Create realistic environments and scenarios.'
},
{
  index: '03',
  title: 'SIMULATE',
  copy: 'Run physical interactions and system behavior.'
},
{
  index: '04',
  title: 'TEST',
  copy: 'Evaluate autonomous decisions and edge cases.'
},
{
  index: '05',
  title: 'VALIDATE',
  copy: 'Analyze performance before real-world deployment.'
}];


export const architectureLayers = [
{
  id: 'input',
  title: 'INPUT LAYER',
  items: ['Robot models', 'Vehicle models', 'Sensor data', '3D assets', 'Environment data'],
  detail: 'Bring your own machines. URDF robots, vehicle dynamics models, recorded sensor logs and USD assets load directly into the workspace.'
},
{
  id: 'generation',
  title: 'GENERATION LAYER',
  items: ['Environment generation', 'Scenario generation', 'Scene composition', 'Variation engine'],
  detail: 'One description becomes thousands of worlds. The variation engine permutes layout, weather, traffic density and lighting across a scenario family.'
},
{
  id: 'simulation',
  title: 'SIMULATION LAYER',
  items: ['Physics', 'Motion', 'Sensors', 'Traffic', 'Environment behavior'],
  detail: 'Rigid-body physics, contact dynamics and synthetic LiDAR, radar and camera feeds run at faster-than-real-time across distributed workers.'
},
{
  id: 'intelligence',
  title: 'INTELLIGENCE LAYER',
  items: ['Autonomous behavior', 'Test coverage', 'Performance', 'Edge-case analysis'],
  detail: 'Every run is scored. Coverage maps show which scenario space you have explored and which failure modes remain unexplained.'
},
{
  id: 'output',
  title: 'OUTPUT',
  items: ['VALIDATED SYSTEM'],
  detail: 'A signed validation report with reproducible seeds, so any result can be replayed exactly before hardware ever moves.'
}];


export const integrations = [
{ id: 'omniverse', name: 'Omniverse', role: 'Scene interchange & rendering' },
{ id: 'cosmos', name: 'Cosmos', role: 'World-model generation' },
{ id: 'openusd', name: 'OpenUSD', role: 'Asset & scene description' },
{ id: 'isaac', name: 'Isaac', role: 'Robot learning & control' }];


export const solutions = [
{
  id: 'robotics',
  title: 'Robotics',
  copy: 'Test robots before deployment.',
  detail: 'Run manipulation, navigation and human-proximity behaviour across thousands of layouts before a single arm moves on the floor.',
  metric: '12,400',
  metricLabel: 'scenarios / night'
},
{
  id: 'automotive',
  title: 'Automotive',
  copy: 'Simulate roads, traffic and edge cases.',
  detail: 'Reproduce the intersection that broke your stack, then generate five hundred variations of it with different light, weather and intent.',
  metric: '340k',
  metricLabel: 'virtual km / day'
},
{
  id: 'autonomous',
  title: 'Autonomous Systems',
  copy: 'Validate decisions in controlled environments.',
  detail: 'Score planner decisions against deterministic replays so a regression is a diff, not an argument.',
  metric: '99.2%',
  metricLabel: 'replay determinism'
},
{
  id: 'industrial',
  title: 'Industrial Automation',
  copy: 'Test complex machine behavior safely.',
  detail: 'Model whole cells, including conveyors, AGVs and cobots, and find the deadlock in simulation instead of on a stopped line.',
  metric: '0',
  metricLabel: 'line stoppages'
},
{
  id: 'research',
  title: 'Research & Development',
  copy: 'Explore physical AI at scale.',
  detail: 'Generate labelled synthetic data and curriculum environments for embodied learning, with full control of the distribution.',
  metric: '∞',
  metricLabel: 'world variations'
}];


export const pricingTiers = [
{
  id: 'explore',
  name: 'Explore',
  tagline: 'For teams starting with simulation.',
  price: 'From $299',
  monthlyPrice: 'From $299',
  annualPrice: 'From $2,990',
  paymentLinks: {
    monthly: 'https://buy.stripe.com/test_14A14p4ZqbCecyNbLfawo00',
    annual: 'https://buy.stripe.com/test_4gM8wR2RigWy0Q5dTnawo01'
  },
  cadence: 'sandbox access',
  capacity: '250 simulation hours / month',
  features: [
  { label: 'Simulation capacity', value: '250 hrs / month' },
  { label: 'Scenario generation', value: '1,000 / month' },
  { label: 'API access', value: 'Read-only' },
  { label: 'Collaboration', value: 'Up to 3 seats' },
  { label: 'Analytics', value: 'Run summaries' },
  { label: 'Enterprise deployment', value: 'Not included' },
  { label: 'Support', value: 'Community' }]

},
{
  id: 'scale',
  name: 'Scale',
  tagline: 'For engineering teams running larger simulation workloads.',
  price: 'From $4,800',
  monthlyPrice: 'From $4,800',
  annualPrice: 'From $48,000',
  paymentLinks: {
    monthly: 'https://buy.stripe.com/test_cNi7sN8bC35IdCR7uZawo02',
    annual: 'https://buy.stripe.com/test_6oU5kF9fGgWycyN6qVawo03'
  },
  cadence: 'per month',
  capacity: '10,000 simulation hours / month',
  features: [
  { label: 'Simulation capacity', value: '10,000 hrs / month' },
  { label: 'Scenario generation', value: 'Unlimited' },
  { label: 'API access', value: 'Full read / write' },
  { label: 'Collaboration', value: 'Unlimited seats' },
  { label: 'Analytics', value: 'Coverage & regression maps' },
  { label: 'Enterprise deployment', value: 'Managed cloud' },
  { label: 'Support', value: 'Priority, 8h response' }]

},
{
  id: 'enterprise',
  name: 'Enterprise',
  tagline: 'For organizations requiring advanced deployment, security and support.',
  price: 'Custom',
  cadence: 'annual agreement',
  capacity: 'Dedicated simulation cluster',
  features: [
  { label: 'Simulation capacity', value: 'Dedicated cluster' },
  { label: 'Scenario generation', value: 'Unlimited + custom engines' },
  { label: 'API access', value: 'Full + on-prem gateway' },
  { label: 'Collaboration', value: 'SSO, roles, audit log' },
  { label: 'Analytics', value: 'Validation reporting suite' },
  { label: 'Enterprise deployment', value: 'VPC / air-gapped' },
  { label: 'Support', value: 'Named engineer, 1h response' }]

}];


export const faqs = [
{
  q: 'What is OmneScene?',
  a: 'OmneScene is a generative physical-world simulation platform. It builds virtual environments, generates thousands of scenarios inside them, and runs your robot or vehicle software against those scenarios so you can find failures before hardware does.'
},
{
  q: 'What systems can OmneScene simulate?',
  a: 'Mobile robots, manipulators, drones, industrial cells and road vehicles. Anything with a physical body, sensors and a control stack can be connected through our model importers or the API.'
},
{
  q: 'Can OmneScene simulate autonomous vehicles?',
  a: 'Yes. Road networks, traffic agents, pedestrians, weather and lighting are all generated and controllable, with synthetic camera, LiDAR and radar output for each run.'
},
{
  q: 'Can I generate different environments?',
  a: 'That is the core of the platform. Describe a scenario family once and the variation engine produces thousands of distinct worlds, including different roads, terrains, cities, weather and traffic patterns, without hand-building each one.'
},
{
  q: 'Does OmneScene support robotics testing?',
  a: 'Yes. Import a robot description, attach your controller, and run navigation, manipulation and safety tests with collision boundaries, sensor fields and motion planning visualised in-scene.'
},
{
  q: 'Can OmneScene connect with existing simulation systems?',
  a: 'OmneScene interoperates with Omniverse, Cosmos, OpenUSD and Isaac, and exposes an API for custom pipelines, so it sits alongside the tooling your team already runs.'
},
{
  q: 'Is OmneScene available for enterprise teams?',
  a: 'Yes. Enterprise plans include dedicated simulation clusters, VPC or air-gapped deployment, SSO and audit logging, and a named support engineer.'
},
{
  q: 'How does pricing work?',
  a: 'Pricing is based on simulation capacity and deployment model. Explore is a free sandbox, Scale is a monthly subscription with a large hour allocation, and Enterprise is an annual agreement sized to your cluster.'
}];


export const team = [
{
  name: 'Dhanushka Kethan',
  role: 'Founder',
  bio: 'Dhanushka founded OmneScene to make physical-world AI faster, safer and more scalable through generative simulation.',
  image: "/founder.png",
  linkedin: 'https://www.linkedin.com/in/dhanushka-kethan'
},
{
  name: 'Dr. Elena Marchetti',
  role: 'Chief Executive',
  bio: 'Previously led validation engineering for an autonomous trucking programme. Elena started OmneScene after watching a fleet spend eighteen months chasing an edge case that took nine minutes to reproduce in simulation.',
  image: "/bacd294e-f7b8-409b-964c-691ca7d62da9.jpg",
  linkedin: 'https://www.linkedin.com/in/omnescene-elena-marchetti'
},
{
  name: 'Arjun Nair',
  role: 'Chief Technology Officer',
  bio: 'Physics engine architect with a decade in real-time contact dynamics. Arjun owns the simulation core and its faster-than-real-time distributed scheduler.',
  image: "/a0ad093f-31d1-4da5-a577-77154b08a65e.jpg",
  linkedin: 'https://www.linkedin.com/in/omnescene-arjun-nair'
},
{
  name: 'Mei Tanaka',
  role: 'Head of Generative Research',
  bio: 'Works on world models and scenario variation. Mei leads the team turning a single description into a statistically controlled distribution of environments.',
  image: "/258be75d-feaf-4658-be67-3d15d0bd1213.jpg",
  linkedin: 'https://www.linkedin.com/in/omnescene-mei-tanaka'
},
{
  name: 'Marcus Obeng',
  role: 'Director of Autonomy Engineering',
  bio: 'Former planning and controls lead on a delivery robot fleet. Marcus makes sure what passes in OmneScene still passes on the pavement.',
  image: "/73ba137c-0f14-4e93-b768-06a5cef46c35.jpg",
  linkedin: 'https://www.linkedin.com/in/omnescene-marcus-obeng'
},
{
  name: 'Karin Vogel',
  role: 'Head of Enterprise Partnerships',
  bio: 'Builds the deployment programmes for automotive and industrial organisations running OmneScene inside their own infrastructure.',
  image: "/d81f238a-6663-4d7f-99cd-30da04620201.jpg",
  linkedin: 'https://www.linkedin.com/in/omnescene-karin-vogel'
}];


export const values = [
{
  id: 'physical-truth',
  title: 'Physical truth first',
  copy: 'A simulation that flatters your system is worse than no simulation. We optimise for fidelity over comfort.'
},
{
  id: 'reproducible',
  title: 'Everything reproducible',
  copy: 'Every run carries a seed. If it happened once, it can happen again on demand, exactly.'
},
{
  id: 'scale',
  title: 'Scale is a safety feature',
  copy: 'Rare failures only show up in volume. Cheap scenarios are how rare failures stop being rare.'
},
{
  id: 'open',
  title: 'Open by construction',
  copy: 'OpenUSD in, standard formats out. Your worlds are not locked inside our platform.'
}];


export type SearchEntry = {
  title: string;
  description: string;
  keywords: string;
  section?: string;
  path?: string;
};

/** Searchable destinations for the command overlay. */
export const searchIndex: SearchEntry[] = [
{ title: 'Simulation', description: 'Physical simulation core and workflow', section: 'workflow', keywords: 'simulation physics workflow run' },
{ title: 'Robotics', description: 'Train machines in the virtual world', section: 'robotics', keywords: 'robot robotics lidar path planning' },
{ title: 'Autonomous Vehicles', description: 'Test the edge cases', section: 'autonomous', keywords: 'vehicle car autonomous driving edge case rain' },
{ title: 'Generative Environments', description: 'Build thousands of worlds', section: 'environments', keywords: 'generate worlds weather terrain traffic' },
{ title: 'Physical AI', description: 'From digital world to physical intelligence', section: 'physical-ai', keywords: 'physical ai intelligence embodied' },
{ title: 'Architecture', description: 'How OmneScene is built', section: 'architecture', keywords: 'architecture layers input generation output' },
{ title: 'Technology', description: 'Omniverse, Cosmos, OpenUSD, Isaac', section: 'technology', keywords: 'omniverse cosmos openusd isaac integration' },
{ title: 'Solutions', description: 'Industries and use cases', section: 'solutions', keywords: 'solutions industry automotive industrial research' },
{ title: 'Pricing', description: 'Explore, Scale and Enterprise', section: 'pricing', keywords: 'pricing plans cost enterprise' },
{ title: 'FAQ', description: 'Common questions', section: 'faq', keywords: 'faq questions help' },
{ title: 'Contact', description: 'Build your next simulation', section: 'contact', keywords: 'contact sales email form' },
{ title: 'Documentation', description: 'Technical resources', section: 'docs', keywords: 'documentation docs api reference' },
{ title: 'About', description: 'Company, mission and team', path: '/about', keywords: 'about company team mission' },
{ title: 'Privacy Policy', description: 'How we handle data', path: '/privacy', keywords: 'privacy data policy' },
{ title: 'Terms & Conditions', description: 'Terms of use', path: '/terms', keywords: 'terms conditions legal' }];