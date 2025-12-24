import { useEffect, useRef, useState } from 'react';
import { GraduationCap, Award, Calendar } from 'lucide-react';

const certifications = [
  {
    title: 'Data Driven Decision Making with Power BI',
    issuer: 'ICT Academy',
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte Australia',
  },
  {
    title: 'Data Analytics Job Simulation',
    issuer: 'Tata Group',
  },
];

const EducationSection = () => {
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

  return (
    <section id="education" ref={sectionRef} className="py-20 md:py-32 relative">
      <div className="container-custom">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title text-center mb-16">Education & Certifications</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Education Card */}
          <div
            className={`glass-card rounded-2xl p-8 transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Education</h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-foreground">
                  Bachelor's in Computer Applications (BCA)
                </h4>
                <p className="text-primary font-medium">KLE Society's Degree College</p>
              </div>

              <div className="flex flex-wrap gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Aug 2023 - Jun 2026</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10">
                <span className="text-primary font-bold text-lg">8.1</span>
                <span className="text-muted-foreground">CGPA</span>
              </div>
            </div>
          </div>

          {/* Certifications Card */}
          <div
            className={`glass-card rounded-2xl p-8 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Certifications</h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
                >
                  <h4 className="font-medium text-foreground mb-1">{cert.title}</h4>
                  <p className="text-sm text-primary">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
