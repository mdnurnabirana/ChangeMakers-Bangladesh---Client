import React, { useState } from 'react';
import toast from 'react-hot-toast';

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter a valid email');
      return;
    }

    toast.success('Subscribed successfully! 🎉');
    setEmail('');
  };

  return (
    <section className="w-full bg-background text-text pt-6 sm:pt-10">
      <div className="mx-auto text-center bg-primary">
        
        <div className="p-12 bg-white/10 backdrop-blur-xl shadow-2xl border border-white/30">

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-text tracking-tight mb-4">
            Join Our Newsletter
          </h2>

          <p className="text-lg text-text/80 max-w-2xl mx-auto mb-10">
            Subscribe to receive exclusive updates, impactful stories, and the latest insights from ChangeMakers.
          </p>

          <form
            onSubmit={handleSubscribe}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto w-full"
          >
            <input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-background border-2 border-secondary/30 text-text shadow focus:outline-none focus:border-accent transition"
            />

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-accent text-background font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              Subscribe
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default NewsLetter;