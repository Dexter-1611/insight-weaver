import { useState, useEffect } from 'react';
import { FileText, Download, Eye, Upload, LogIn, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User } from '@supabase/supabase-js';

const ResumeSection = () => {
  const [user, setUser] = useState<User | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Fetch existing resume
    fetchResume();

    return () => subscription.unsubscribe();
  }, []);

  const fetchResume = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('resumes')
        .list('', { limit: 1, sortBy: { column: 'created_at', order: 'desc' } });

      if (error) throw error;

      if (data && data.length > 0) {
        const { data: urlData } = supabase.storage
          .from('resumes')
          .getPublicUrl(data[0].name);
        setResumeUrl(urlData.publicUrl);
      }
    } catch (error) {
      console.error('Error fetching resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please upload a PDF file');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    try {
      // Delete existing resumes first
      const { data: existingFiles } = await supabase.storage
        .from('resumes')
        .list();

      if (existingFiles && existingFiles.length > 0) {
        const filesToDelete = existingFiles.map(f => f.name);
        await supabase.storage.from('resumes').remove(filesToDelete);
      }

      // Upload new resume
      const fileName = `resume_${Date.now()}.pdf`;
      const { error } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, { cacheControl: '3600', upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      setResumeUrl(urlData.publicUrl);
      toast.success('Resume uploaded successfully!');
    } catch (error) {
      console.error('Error uploading resume:', error);
      toast.error('Failed to upload resume');
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
  };

  const handleDownload = () => {
    if (resumeUrl) {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = 'Deekshith_D_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <section id="resume" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="text-center mb-12">
          <h2 className="section-title">Resume</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            View or download my professional resume
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="glass-card rounded-2xl p-8 hover-lift">
            <div className="flex flex-col items-center gap-6">
              {/* Resume Icon */}
              <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center border border-primary/20 animate-pulse-glow">
                <FileText className="w-12 h-12 text-primary" />
              </div>

              {loading ? (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Loading resume...</span>
                </div>
              ) : resumeUrl ? (
                <>
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      Deekshith D - Resume
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Data Analyst | AI & ML Practitioner
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button
                      onClick={() => window.open(resumeUrl, '_blank')}
                      className="bg-primary text-primary-foreground hover:bg-primary/90 hover-glow gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View Resume
                    </Button>
                    <Button
                      onClick={handleDownload}
                      variant="outline"
                      className="border-primary/30 text-foreground hover:bg-primary/10 hover:border-primary gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download PDF
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <p className="text-muted-foreground">
                    Resume not uploaded yet
                  </p>
                </div>
              )}

              {/* Admin Upload Section */}
              {user && (
                <div className="w-full pt-6 mt-6 border-t border-border">
                  <div className="flex flex-col items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                      Admin: Upload or update your resume
                    </p>
                    <div className="flex gap-3">
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleUpload}
                          className="hidden"
                          disabled={uploading}
                        />
                        <Button
                          asChild
                          disabled={uploading}
                          className="bg-secondary text-foreground hover:bg-secondary/80 gap-2"
                        >
                          <span>
                            {uploading ? (
                              <>
                                <Loader2 className="w-4 h-4 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4" />
                                Upload Resume
                              </>
                            )}
                          </span>
                        </Button>
                      </label>
                      <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="text-muted-foreground hover:text-destructive gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Admin Login Link */}
              {!user && (
                <a
                  href="/auth"
                  className="text-xs text-muted-foreground/50 hover:text-primary transition-colors mt-4 flex items-center gap-1"
                >
                  <LogIn className="w-3 h-3" />
                  Admin Login
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection;
