import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LegalPage from "@/components/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy Policy",
  description:
    "How Fennr Studio collects, uses, and protects the information you share with us.",
});

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <LegalPage title="Privacy Policy" updated="1 August 2026">
        <p>
          This Privacy Policy explains how <strong>Fennr Studio</strong> (&ldquo;fennr&rdquo;,
          &ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, uses, and protects the information you share
          with us when you visit <strong>fennrstudio.com</strong> or get in touch. We keep this
          deliberately short and plain-language. If anything is unclear, email us at{" "}
          <a href="mailto:hello@fennrstudio.com">hello@fennrstudio.com</a>.
        </p>

        <h2>Who we are</h2>
        <p>
          Fennr Studio is a design and technology studio based in Shivaji Nagar, Pune 411007,
          India. For any question about your data, contact us at{" "}
          <a href="mailto:hello@fennrstudio.com">hello@fennrstudio.com</a>.
        </p>

        <h2>What we collect</h2>
        <p>We only collect what we need to respond to you and run our website.</p>
        <h3>Information you give us</h3>
        <p>
          When you submit our contact form, brief builder, or newsletter signup, or message us on
          WhatsApp or email, we collect the details you provide — typically your name, email
          address, phone number, business/company name, budget and timeline, and the contents of
          your message.
        </p>
        <h3>Information collected automatically</h3>
        <p>
          When you visit the site, we collect standard analytics data (pages viewed, approximate
          location, device and browser type, and referral source) through Google Analytics, and, if
          you arrived from or interacted with one of our ads, similar activity through the Meta
          Pixel (see &ldquo;Advertising and the Meta Pixel&rdquo; below). Our hosting and network
          providers also process your IP address to deliver the site securely.
        </p>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to your enquiry and provide the services you ask about.</li>
          <li>To send you the newsletter, if you signed up (you can unsubscribe anytime).</li>
          <li>To understand how the site is used and improve it.</li>
          <li>
            To measure and run our advertising on platforms like Meta (Facebook and Instagram),
            including showing relevant ads and tracking whether an ad led to an enquiry.
          </li>
          <li>To keep the site secure and prevent spam or abuse.</li>
        </ul>
        <p>
          We do <strong>not</strong> sell your personal information.
        </p>

        <h2>Who we share it with</h2>
        <p>
          We use a small set of trusted third-party services to run the site. Your data is
          processed by them only to provide these functions:
        </p>
        <ul>
          <li>
            <strong>Vercel</strong> &amp; <strong>Cloudflare</strong> — website hosting and
            security.
          </li>
          <li>
            <strong>Supabase</strong> — securely stores enquiries submitted through our forms.
          </li>
          <li>
            <strong>Resend</strong> — delivers form submissions to our inbox by email.
          </li>
          <li>
            <strong>Google Analytics</strong> — website usage analytics.
          </li>
          <li>
            <strong>Meta (Facebook / Instagram)</strong> — the Meta Pixel measures our ad
            performance and enables relevant advertising (see below).
          </li>
          <li>
            <strong>Calendly</strong> &amp; <strong>WhatsApp</strong> — used only if you choose to
            book a call or message us through them.
          </li>
        </ul>
        <p>
          We may also disclose information if required by law. Otherwise, we never share your
          details with anyone else.
        </p>

        <h2 id="advertising">Advertising and the Meta Pixel</h2>
        <p>
          We advertise our services on Meta platforms (Facebook and Instagram). To do this, we use
          the <strong>Meta Pixel</strong> — a small piece of code on our site that tells Meta when
          you visit a page or take an action (such as submitting an enquiry). This helps us measure
          whether our ads are working, show our ads to people likely to be interested, and avoid
          showing them to people who have already contacted us.
        </p>
        <p>
          The Pixel shares limited event data with Meta (for example, that a visit or enquiry
          happened, along with technical identifiers such as your IP address and cookie IDs). Meta
          processes this data under{" "}
          <a
            href="https://www.facebook.com/privacy/policy/"
            target="_blank"
            rel="noopener noreferrer"
          >
            its own Privacy Policy
          </a>
          . You can control how Meta uses your data and the ads you see through your Facebook and
          Instagram ad settings.
        </p>

        <h2 id="cookies">Cookies</h2>
        <p>
          We use a small number of cookies: essential cookies for basic site functionality,
          analytics cookies (Google Analytics) to measure site usage, and advertising cookies (the
          Meta Pixel) to run and measure our ads. You can block or delete cookies in your browser
          settings, and opt out of ad personalisation in your Meta ad settings; the site will still
          work, though some analytics and ad measurement won&rsquo;t be recorded.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep enquiry and lead information for as long as needed to serve you and for our
          legitimate business records. If you&rsquo;d like your data deleted, just ask and
          we&rsquo;ll remove it (unless we&rsquo;re legally required to keep it).
        </p>

        <h2>Your rights</h2>
        <p>
          You can ask us to access, correct, or delete the personal information we hold about you,
          or to stop contacting you. Email{" "}
          <a href="mailto:hello@fennrstudio.com">hello@fennrstudio.com</a> and we&rsquo;ll action it
          promptly. If you&rsquo;re in India, these rights are provided under the Digital Personal
          Data Protection Act, 2023.
        </p>

        <h2>Children</h2>
        <p>
          Our services are intended for businesses and adults. We do not knowingly collect
          information from anyone under 18.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          We may update this policy from time to time. When we do, we&rsquo;ll change the
          &ldquo;last updated&rdquo; date at the top. Material changes will be reflected here on this
          page.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy or your data? Email{" "}
          <a href="mailto:hello@fennrstudio.com">hello@fennrstudio.com</a> or write to us at Fennr
          Studio, Shivaji Nagar, Pune 411007, India.
        </p>
      </LegalPage>
      <Footer />
    </>
  );
}
