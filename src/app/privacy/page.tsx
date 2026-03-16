import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-[720px] px-6">
        <h1 className="font-heading text-4xl text-foreground sm:text-5xl">
          Privacy Policy
        </h1>
        <div className="mt-10 prose-condesa">
          <p>
            La Condesa Weekly (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;)
            respects your privacy and is committed to protecting the personal
            information you share with us through our website and newsletter.
          </p>
          <h2>Information We Collect</h2>
          <p>
            We collect your email address when you subscribe to our newsletter.
            We may also collect basic analytics data about how you interact with
            our website and emails, including open rates and click-through rates.
          </p>
          <h2>How We Use Your Information</h2>
          <p>
            Your email address is used solely to send you our weekly newsletter
            and occasional updates about La Condesa Weekly. We do not sell, rent,
            or share your personal information with third parties for marketing
            purposes.
          </p>
          <h2>Cookies</h2>
          <p>
            We use cookies to improve your experience on our site and to
            understand how visitors interact with our content. You can opt out of
            non-essential cookies through the cookie banner on our site.
          </p>
          <h2>Unsubscribe</h2>
          <p>
            You can unsubscribe from our newsletter at any time by clicking the
            unsubscribe link at the bottom of any email we send.
          </p>
          <h2>Contact</h2>
          <p>
            If you have questions about this privacy policy, please contact us at
            hello@lacondesa.mx.
          </p>
        </div>
      </div>
    </section>
  );
}
