-- Create storage bucket for resumes
INSERT INTO storage.buckets (id, name, public)
VALUES ('resumes', 'resumes', true);

-- Allow anyone to view/download resumes (public read)
CREATE POLICY "Anyone can view resumes"
ON storage.objects
FOR SELECT
USING (bucket_id = 'resumes');

-- Only authenticated users can upload resumes
CREATE POLICY "Authenticated users can upload resumes"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'resumes' AND auth.uid() IS NOT NULL);

-- Only authenticated users can update their uploads
CREATE POLICY "Authenticated users can update resumes"
ON storage.objects
FOR UPDATE
USING (bucket_id = 'resumes' AND auth.uid() IS NOT NULL);

-- Only authenticated users can delete resumes
CREATE POLICY "Authenticated users can delete resumes"
ON storage.objects
FOR DELETE
USING (bucket_id = 'resumes' AND auth.uid() IS NOT NULL);