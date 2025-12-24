import { useEffect, useRef, useState } from 'react';
import { BarChart3, Brain, Code, Lightbulb, Languages } from 'lucide-react';

const skillCategories = [
  {
    title: 'Data Analysis & Visualization',
    icon: BarChart3,
    skills: ['Tableau', 'Microsoft Excel', 'Pivot Tables', 'Lookups', 'Exploratory Data Analysis (EDA)'],
  },
  {
    title: 'AI & Machine Learning',
    icon: Brain,
    skills: ['Generative AI', 'Predictive Modeling', 'Model Selection', 'Statistical Analysis'],
  },
  {
    title: 'Languages & Core',
    icon: Code,
    skills: ['SQL', 'Python', 'Pandas', 'NumPy', 'Database Management'],
  },
  {
    title: 'Soft Skills',
    icon: Lightbulb,
    skills: ['Strategic Thinking', 'Problem Solving', 'Adaptability', 'Data Storytelling'],
  },
  {
    title: 'Languages Spoken',
    icon: Languages,
    skills: ['Kannada', 'English', 'Hindi'],
  },
];

const SkillsSection = () => {
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
    <section id="skills" ref={sectionRef} className="py-20 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_hsl(187_80%_50%_/_0.05)_0%,_transparent_50%)]" />
      
      <div className="container-custom relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title text-center mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            A comprehensive toolkit for transforming data into actionable insights
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className={`glass-card rounded-2xl p-6 hover:border-primary transition-all duration-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${categoryIndex * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 rounded-lg bg-primary/10">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skill}
                    className="skill-tag"
                    style={{ 
                      animationDelay: `${categoryIndex * 100 + skillIndex * 50}ms`,
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
