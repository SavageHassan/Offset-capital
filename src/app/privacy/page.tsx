import type { Metadata } from 'next';
import PageHero from '@/components/PageHero';
import Reveal from '@/components/Reveal';
import { Section } from '@/components/Section';
import { media, site } from '@/data/site';

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: 'How Offset Capital uses analytics, CRM and mailing-list data.',
};

const sections = [
  {
    heading: 'Google Analytics',
    body: [
      'We use Google Analytics to monitor your website activity, including the pages you visit and how long you spend on each one. We also collect data about your internet service provider, such as your IP address and the city you were in when you visited. This data is anonymous and does not include any personal information about you.',
    ],
  },
  {
    heading: 'Customer relationship management (CRM)',
    body: [
      'We collect and store the personal data you submit through our forms on our CRM platform (HubSpot). Your information is secured behind a login portal and can be deleted upon request.',
      'By submitting a form on this website, you consent to receiving communications from Offset Capital regarding your enquiry.',
    ],
  },
  {
    heading: 'Mailing list',
    body: [
      'You are able to submit your name and email address to us by using the “Join Mailing List” form located in our website’s footer, or by ticking the corresponding checkbox on our contact form. By subscribing, you agree to receive periodic communications from Offset Capital.',
      'We collect and store these data on our CRM platform (HubSpot). Your information is secured behind a login portal and can be deleted upon request.',
      'You can unsubscribe from email communications by clicking “unsubscribe” at the bottom of any email correspondence.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        breadcrumb="Privacy policy"
        eyebrow="Privacy"
        lines={['Your privacy is', 'important to us']}
        intro="We use the following services on our site for analytical and marketing purposes."
        image={media.newsHero}
      />

      <Section tone="white" className="py-section">
        <div className="shell">
          <div className="max-w-measure-lg">
            {sections.map((s, i) => (
              <Reveal key={s.heading} delay={i * 0.06} className="border-t border-navy-900/10 py-12 first:border-t-0 first:pt-0">
                <h2 className="font-display text-display-sm font-light leading-[1.12] text-navy-900">
                  {s.heading}
                </h2>
                <div className="prose-editorial mt-6">
                  {s.body.map((p, j) => (
                    <p key={j}>{p}</p>
                  ))}
                </div>
              </Reveal>
            ))}

            <Reveal className="border-t border-navy-900/10 pt-12">
              <p className="font-display text-[1.5rem] font-light italic text-navy-900">That’s it.</p>
              <p className="prose-editorial mt-5">
                Thank you for visiting our website. If you need more information, please email us at{' '}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>
            </Reveal>
          </div>
        </div>
      </Section>
    </>
  );
}
