import React from "react";
import { motion } from "motion/react";

const TermsAndConditions = () => {
  return (
    <section className="bg-background text-text py-12 px-4 sm:px-8 lg:px-20">
      <title>Terms & Conditions</title>
      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-8 text-center">
          Terms and Conditions
        </h1>

        <div className="space-y-6 text-sm sm:text-base">
          <p>
            Welcome to ChangeMakersBD! By accessing or using our website, you
            agree to be bound by these Terms and Conditions. Please read them
            carefully.
          </p>

          <h2 className="text-xl font-semibold mt-4">1. Use of Website</h2>
          <p>
            You may use our website for lawful purposes only. You agree not to
            use the site for any illegal or unauthorized purpose.
          </p>

          <h2 className="text-xl font-semibold mt-4">
            2. Intellectual Property
          </h2>
          <p>
            All content, designs, logos, images, and text on this website are
            the property of ChangeMakersBD or its content providers and are
            protected by copyright laws.
          </p>

          <h2 className="text-xl font-semibold mt-4">3. Privacy</h2>
          <p>
            Your use of our website is also governed by our Privacy Policy. We
            take your privacy seriously and handle your information according to
            our policy.
          </p>

          <h2 className="text-xl font-semibold mt-4">
            4. Limitation of Liability
          </h2>
          <p>
            ChangeMakersBD is not liable for any damages arising from the use or
            inability to use this website. This includes direct, indirect,
            incidental, or consequential damages.
          </p>

          <h2 className="text-xl font-semibold mt-4">5. Changes to Terms</h2>
          <p>
            We reserve the right to modify these Terms and Conditions at any
            time. Continued use of the website constitutes acceptance of the
            updated terms.
          </p>

          <h2 className="text-xl font-semibold mt-4">6. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by the laws of Bangladesh,
            without regard to its conflict of law provisions.
          </p>

          <p className="mt-6">
            By using our website, you agree to these Terms and Conditions. Thank
            you for visiting ChangeMakersBD!
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default TermsAndConditions;