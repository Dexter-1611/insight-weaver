import { useEffect, useRef, useState } from 'react';
import { Mail, Linkedin, Phone, Send } from 'lucide-react';

const ContactSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: 'deekshi5168@gmail.com',
      href: 'mailto:deekshi5168@gmail.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/deekshith-d11022005',
      href: 'https://www.linkedin.com/in/deekshith-d11022005',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 63630 01288',
      href: 'tel:+916363001288',
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-20 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(187_80%_50%_/_0.08)_0%,_transparent_60%)]" />

      <div className="container-custom relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title mb-4">Let's Connect</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new opportunities, data projects, or just having a conversation about AI and analytics.
          </p>
        </div>

        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-3 gap-6">
              {contactLinks.map((contact, index) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.label === 'LinkedIn' ? '_blank' : undefined}
                  rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                  className={`group flex flex-col items-center text-center p-6 rounded-xl hover:bg-secondary/50 transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 mb-4">
                    <contact.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{contact.label}</h3>
                  <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors break-all">
                    {contact.value}
                  </p>
                </a>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border text-center">
              <a
                href="mailto:deekshi5168@gmail.com"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(187_80%_50%_/_0.5)] transition-all duration-300 hover:-translate-y-1"
              >
                <Send size={18} />
                Send a Message
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
