import { LegalLayout, type LegalSection } from '../components/LegalLayout';
import { contactInfo } from '../data/site';

const sections: LegalSection[] = [
  {
    id: 'interpretation-definitions',
    title: 'Interpretation and Definitions',
    body: [
      <><h3 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-chalk">Interpretation</h3><p>The capitalized terms used in these Terms have the meanings given below. Those meanings apply whether a term is used in the singular or plural.</p></>,
      <><h3 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-chalk">Definitions</h3><p>For these Terms:</p><ul><li><strong>Affiliate</strong> means an organization that controls, is controlled by, or shares common control with a party. Control means ownership of at least half of the voting equity or equivalent management rights.</li><li><strong>Company</strong>, <strong>We</strong>, <strong>Us</strong>, or <strong>Our</strong> means OmneScene AI Inc., 201 Mission Street, Suite 1200, San Francisco, CA 94105, USA.</li><li><strong>Country/State</strong> means California, United States.</li><li><strong>Device</strong> means equipment used to reach the Service, including a computer, phone, or tablet.</li><li><strong>Service</strong> means the Website and the services made available through it.</li><li><strong>Third-Party Social Media Service</strong> means third-party content, products, services, or information displayed or linked through the Service.</li><li><strong>Website</strong> means OmneScene, available at <a href="https://omnescene.com/" target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-cyan-soft">omnescene.com</a>.</li><li><strong>You</strong> means the person using the Service, or the legal entity that person represents.</li></ul></>
    ]
  },
  {
    id: 'acknowledgment',
    title: 'Acknowledgment',
    body: [
      'These Terms form the agreement between You and the Company concerning the Service. They apply to every visitor and user who accesses or uses it.',
      'Using the Service means that You accept these Terms. If You reject any part of them, You must not use the Service. You confirm that You are at least 18 years old; the Company does not permit anyone under 18 to use the Service.',
      <>Use of the Service is also governed by Our <a href="/privacy" className="text-cyan hover:text-cyan-soft">Privacy Policy</a>, which explains how We handle personal information.</>
    ]
  },
  {
    id: 'third-party-links',
    title: 'Links to Other Websites',
    body: [
      'The Service may link to websites or services operated by other parties. Those resources are outside the Company\'s control, and the Company accepts no responsibility for their content, privacy practices, availability, or losses associated with using them.',
      'Review the terms and privacy policies of each third-party service before using it. Content or services supplied by a Third-Party Social Media Service remain subject to that provider\'s own terms and privacy policy.'
    ]
  },
  {
    id: 'termination',
    title: 'Termination',
    body: [
      'The Company may suspend or end Your access without advance notice where We reasonably believe You have breached these Terms or where termination is otherwise necessary. Once access ends, Your permission to use the Service ends immediately.'
    ]
  },
  {
    id: 'limitation-of-liability',
    title: 'Limitation of Liability',
    body: [
      'To the fullest extent allowed by law, the Company\'s and its suppliers\' total responsibility under these Terms, and Your sole remedy, will not exceed the amount You paid through the Service or 100 USD if You made no purchase.',
      'The Company and its suppliers will not be responsible for indirect, special, incidental, or consequential losses, including lost profits, lost data, business interruption, or loss of privacy, arising from the Service or these Terms, even if the possibility of such loss was disclosed in advance.',
      'Where applicable law does not permit a particular exclusion or limitation, that exclusion or limitation applies only to the maximum extent permitted.'
    ]
  },
  {
    id: 'disclaimer',
    title: 'AS IS and AS AVAILABLE Disclaimer',
    body: [
      'The Service is provided on an “AS IS” and “AS AVAILABLE” basis, with all defects and without warranties of any kind. To the fullest extent permitted by law, the Company disclaims express, implied, statutory, and other warranties, including merchantability, fitness for a particular purpose, title, and non-infringement.',
      'The Company does not promise that the Service will meet Your requirements, produce a particular result, work with another system, remain uninterrupted, meet a performance standard, or be free of errors. We also do not warrant that the Service, its servers, content, or messages sent on Our behalf are free of malicious or harmful components.',
      'Any statutory consumer rights that cannot be excluded remain unaffected, and these disclaimers apply only as far as the law permits.'
    ]
  },
  {
    id: 'governing-law',
    title: 'Governing Law',
    body: ['California law, without regard to its conflict-of-law rules, governs these Terms and Your use of the Service. Other local, state, national, or international laws may also apply to Your use of the Service.']
  },
  {
    id: 'disputes',
    title: 'Dispute Resolution',
    body: ['If You have a concern or dispute about the Service, You agree to contact the Company first and make a good-faith effort to resolve it informally.']
  },
  {
    id: 'regional-compliance',
    title: 'Regional and United States Compliance',
    body: [
      <><h3 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-chalk">European Union Users</h3><p>Consumers in the European Union retain the benefit of mandatory protections provided by the law of their country of residence.</p></>,
      <><h3 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-chalk">United States Requirements</h3><p>You confirm that You are not located in a country subject to a United States government embargo or designated as a terrorism-supporting country, and that You are not listed on a United States government prohibited or restricted-party list.</p></>
    ]
  },
  {
    id: 'severability-waiver',
    title: 'Severability and Waiver',
    body: [
      <><h3 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-chalk">Severability</h3><p>If a provision is found invalid or unenforceable, it will be adjusted as narrowly as necessary to achieve its purpose under applicable law. The remaining provisions will continue in effect.</p></>,
      <><h3 className="font-display text-lg font-bold uppercase tracking-[0.08em] text-chalk">Waiver</h3><p>Failure to enforce a right or require performance under these Terms does not waive that right or prevent later enforcement. Waiving one breach does not waive a later breach.</p></>
    ]
  },
  {
    id: 'translation',
    title: 'Translation Interpretation',
    body: ['If We provide a translated version of these Terms, the English version controls in the event of a dispute.']
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    body: [
      'We may revise these Terms at Our discretion. For a material revision, We will make reasonable efforts to give at least 30 days\' notice before it takes effect.',
      'Continuing to access or use the Service after a revision becomes effective means You accept the revised Terms. Stop using the Service if You do not agree with them.'
    ]
  },
  {
    id: 'contact',
    title: 'Contact Us',
    body: [
      <>
        <p>Questions about these Terms may be sent to Us:</p>
        <div className="mt-5 space-y-6">
          {contactInfo.offices.map((office) =>
          <div key={office.region} className="border-l-2 border-cyan/40 pl-4">
            <h3 className="font-display text-base font-bold uppercase tracking-[0.08em] text-chalk">{office.region}</h3>
            <p className="mt-2"><strong>{office.company}</strong><br />{office.address}</p>
            <p className="mt-2">Phone: <a href={`tel:${office.phoneHref}`} className="text-cyan hover:text-cyan-soft">{office.phone}</a></p>
          </div>
          )}
          <div className="space-y-2 border-t border-cyan/15 pt-4">
            <p>Email: <a href={`mailto:${contactInfo.email}`} className="text-cyan hover:text-cyan-soft">{contactInfo.email}</a></p>
            <p>Website: <a href={contactInfo.website} target="_blank" rel="noopener noreferrer" className="text-cyan hover:text-cyan-soft">{contactInfo.website}</a></p>
          </div>
        </div>
      </>
    ]
  }
];

export function Terms() {
  return <LegalLayout eyebrow="Legal" title="Terms and Conditions" updated="August 18, 2026" intro="Please read these Terms and Conditions carefully before using Our Service." sections={sections} />;
}