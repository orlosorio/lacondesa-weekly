import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36 sm:pb-24">
      <div className="mx-auto max-w-[720px] px-6">
        <h1 className="font-heading text-4xl text-foreground sm:text-5xl">
          Terms of Service
        </h1>
        <div className="mt-10 prose-condesa">
          <p>
            By using the La Condesa Weekly website and subscribing to our
            newsletter, you agree to the following terms.
          </p>
          <h2>Content</h2>
          <p>
            All content published on lacondesa.mx and in our newsletter is for
            informational purposes only. While we strive for accuracy, we make no
            guarantees about the completeness or reliability of any information
            provided.
          </p>
          <h2>Intellectual Property</h2>
          <p>
            All original content, including text, photography, and design, is the
            property of La Condesa Weekly and may not be reproduced without
            permission.
          </p>
          <h2>Advertising</h2>
          <p>
            Sponsored content and advertisements in our newsletter are clearly
            labeled. The inclusion of an advertisement does not constitute an
            endorsement.
          </p>
          <h2>Changes</h2>
          <p>
            We reserve the right to update these terms at any time. Continued use
            of our services after changes are posted constitutes acceptance of
            the revised terms.
          </p>
          <h2>Contact</h2>
          <p>
            Questions about these terms? Reach us at hello@lacondesa.mx.
          </p>
        </div>
      </div>
    </section>
  );
}
