import { useEffect, useRef, useState } from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';

const ExperienceSection = () => {
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

  const responsibilities = [
    'Conducted rigorous Exploratory Data Analysis (EDA) on large-scale datasets to identify trends, outliers, and patterns prior to model selection.',
    'Applied statistical methods to validate data reliability and optimize model performance.',
    'Collaborated on the development of AI-driven strategies to solve complex data problems.',
  ];

  return (
    <section id="experience" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container-custom">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title text-center mb-16">Experience</h2>
        </div>

        <div className={`max-w-3xl mx-auto transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="glass-card rounded-2xl p-8 relative overflow-hidden">
            {/* Decorative gradient */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-transparent" />
            
            <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8">
              <div className="p-4 rounded-xl bg-primary/10 self-start animate-pulse-glow">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-2">AI and ML Intern</h3>
                <p className="text-xl text-primary font-medium mb-3">Advi</p>
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <Calendar size={16} />
                  <span>Dec 2025 – Present</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {responsibilities.map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-4 items-start transition-all duration-500 ${
                    isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <p className="text-muted-foreground leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
