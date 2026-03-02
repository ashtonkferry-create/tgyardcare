'use client';

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function PrivacyContent() {
  return (
    <>
      <Navigation />

      <section className="sr-only">
        <h2>TG Yard Care Privacy Policy</h2>
        <p>This privacy policy explains how TG Yard Care (TotalGuard Yard Care LLC) collects, uses, and protects your personal information when you use our website or request lawn care services in Madison, Wisconsin.</p>
      </section>

      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-12 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>

          <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
            <p className="text-sm text-muted-foreground">
              Last updated: January 10, 2026
            </p>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Introduction</h2>
              <p>
                TotalGuard Yard Care (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p>We may collect information about you in a variety of ways, including:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>
                  <strong>Personal Data:</strong> Name, email address, phone number, mailing address, and other contact information you voluntarily provide when requesting quotes, scheduling services, or contacting us.
                </li>
                <li>
                  <strong>Service Information:</strong> Details about your property, service preferences, and service history.
                </li>
                <li>
                  <strong>Usage Data:</strong> Information about how you interact with our website, including pages visited and time spent on pages.
                </li>
                <li>
                  <strong>Communication Data:</strong> Records of correspondence when you contact us via phone, email, text message, or our website chat feature.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Provide, operate, and maintain our services</li>
                <li>Process and complete transactions</li>
                <li>Send you service-related communications, including scheduling confirmations and updates</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Send promotional communications (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">SMS/Text Messaging Privacy</h2>
              <p>
                When you opt-in to receive text messages from TotalGuard Yard Care, we collect your phone number and consent to send you service-related communications. We are committed to protecting this information.
              </p>
              <p className="mt-4 p-4 bg-muted rounded-lg border border-border font-medium text-foreground">
                All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Information Sharing</h2>
              <p>
                We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>With service providers who assist us in operating our business (subject to confidentiality agreements)</li>
                <li>To comply with legal obligations or respond to lawful requests</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a business transfer or merger</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Data Security</h2>
              <p>
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Opt-out of marketing communications</li>
                <li>Withdraw consent for text messaging at any time by replying STOP</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Cookies and Tracking</h2>
              <p>
                Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can set your browser to refuse cookies, but this may limit some features of our website.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Children&apos;s Privacy</h2>
              <p>
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p><strong>TotalGuard Yard Care</strong></p>
                <p>Email: totalguardllc@gmail.com</p>
                <p>Phone: (608) 535-6057</p>
                <p>Madison, WI &amp; Surrounding Areas</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer showCloser={false} />
    </>
  );
}
