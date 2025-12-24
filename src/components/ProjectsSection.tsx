import { useEffect, useRef, useState } from 'react';
import { ExternalLink, TrendingUp, BarChart2 } from 'lucide-react';

const projects = [
  {
    title: 'Financial Delinquency Prediction',
    description:
      'Leveraged Generative AI to perform EDA on financial datasets. Designed a no-code predictive framework to identify/forecast financial delinquency and architected a scalable, AI-driven collections strategy.',
    icon: TrendingUp,
    tags: ['Generative AI', 'EDA', 'Predictive Modeling', 'No-Code'],
  },
  {
    title: 'Deloitte Australia Job Simulation',
    description:
      'Analyzed complex datasets utilizing Tableau for advanced visualization and Excel for data classification. Developed interactive dashboards to narrate data stories, bridging the gap between technical findings and executive decision-making.',
    icon: BarChart2,
    tags: ['Tableau', 'Excel', 'Data Visualization', 'Dashboards'],
  },
];

const ProjectsSection = () => {
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
    <section id="projects" ref={sectionRef} className="py-20 md:py-32 relative">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_hsl(187_80%_50%_/_0.05)_0%,_transparent_50%)]" />

      <div className="container-custom relative z-10">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="section-title text-center mb-4">Featured Projects</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-16">
            Real-world applications demonstrating data-driven problem solving
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`project-card group transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Card Header */}
              <div className="p-6 pb-0">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <project.icon className="w-6 h-6 text-primary" />
                  </div>
                  <ExternalLink className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-6 pt-0">
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
