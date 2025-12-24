import { useEffect, useRef, useState } from 'react';
import { User, Briefcase, GraduationCap } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { icon: Briefcase, label: 'Experience', value: 'AI/ML Intern' },
    { icon: GraduationCap, label: 'Education', value: 'BCA Student' },
    { icon: User, label: 'Focus', value: 'Data Analytics' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container-custom">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title text-center mb-16">About Me</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Stats */}
          <div className={`space-y-6 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass-card rounded-xl p-6 flex items-center gap-4 hover:border-primary transition-all duration-300"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-lg font-semibold text-foreground">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column - Bio */}
          <div className={`transition-all duration-700 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass-card rounded-2xl p-8">
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Results-oriented <span className="text-primary font-medium">Data Analyst</span> and Computer Applications graduate with practical experience in{' '}
                <span className="text-primary font-medium">Artificial Intelligence</span>,{' '}
                <span className="text-primary font-medium">Machine Learning</span>, and{' '}
                <span className="text-primary font-medium">Data Visualization</span>.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Skilled in translating raw analytics into actionable business insights using{' '}
                <span className="text-foreground font-medium">Tableau</span>,{' '}
                <span className="text-foreground font-medium">Excel</span>, and{' '}
                <span className="text-foreground font-medium">GenAI</span>. Proven ability to design predictive frameworks and optimize data models to drive decision-making and organizational growth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
