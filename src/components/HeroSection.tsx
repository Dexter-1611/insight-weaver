import { MapPin, ChevronDown } from 'lucide-react';

const HeroSection = () => {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_hsl(187_80%_50%_/_0.1)_0%,_transparent_70%)]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '-3s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(222_30%_18%_/_0.3)_1px,_transparent_1px),_linear-gradient(90deg,_hsl(222_30%_18%_/_0.3)_1px,_transparent_1px)] bg-[size:60px_60px]" />

      <div className="container-custom relative z-10 text-center">
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm text-muted-foreground mb-6">
            <MapPin size={16} className="text-primary" />
            <span>Bengaluru, Karnataka</span>
          </div>
        </div>

        <h1 className="animate-fade-up-delay-1 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="text-foreground">Hi, I'm </span>
          <span className="gradient-text glow-text">Deekshith D</span>
        </h1>

        <h2 className="animate-fade-up-delay-2 text-xl sm:text-2xl md:text-3xl font-medium text-foreground/90 mb-4">
          Results-oriented <span className="text-primary">Data Analyst</span> | 
          <span className="text-primary"> AI & Machine Learning</span> Practitioner
        </h2>

        <p className="animate-fade-up-delay-3 text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Translating raw analytics into actionable business insights.
        </p>

        <div className="animate-fade-up-delay-3 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:shadow-[0_0_30px_hsl(187_80%_50%_/_0.5)] transition-all duration-300 hover:-translate-y-1"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full glass-card text-foreground font-semibold hover:border-primary transition-all duration-300 hover:-translate-y-1"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get In Touch
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors animate-bounce"
        aria-label="Scroll to about section"
      >
        <ChevronDown size={32} />
      </button>
    </section>
  );
};

export default HeroSection;
