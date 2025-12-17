import React, { useRef } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
    Card, 
    CardContent, 
    CardDescription, 
    CardFooter, 
    CardHeader, 
    CardTitle 
} from "@/components/ui/card";
import { FileText, AlertCircle, CheckCircle2, ExternalLink, Download } from "lucide-react";

const ResumeUpload = ({ auth, resume_path }) => {
  const fileInput = useRef();
  const { props } = usePage();
  const flash = props?.flash || {};

  const { data, setData, post, processing, errors, progress } = useForm({
    resume: null,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.resume) return;

    post('/resume/upload', {
        forceFormData: true,
        preserveScroll: true,
        onSuccess: () => {
            setData('resume', null);
            if (fileInput.current) {
                fileInput.current.value = ""; 
            }
        },
    });
  };

  // Extract filename for display
  const currentFileName = resume_path?.split('/').pop() || "Your Resume";

  return (
    <MainLayout auth={auth}>
      <div className="max-w-2xl mx-auto mt-10 px-4">
        <Card className="border-gray-200 shadow-sm overflow-hidden">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Upload Resume</CardTitle>
            <CardDescription>
              Keep your profile up to date with your latest experience.
            </CardDescription>

            {flash?.success && (
              <Alert className="bg-emerald-50 border-emerald-200 text-emerald-800 mt-4">
                <CheckCircle2 className="h-4 w-4 stroke-emerald-600" />
                <AlertDescription>{flash.success}</AlertDescription>
              </Alert>
            )}

            {(flash?.error || errors?.resume) && (
              <Alert variant="destructive" className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {flash?.error || errors?.resume}
                </AlertDescription>
              </Alert>
            )}
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6"> 
              <div className="grid w-full items-center gap-1.5 pt-2">
                <Label htmlFor="resume" className="text-gray-700 font-medium">
                  {resume_path ? 'Upload New Version' : 'Select Resume File'}
                </Label>
                <Input 
                  id="resume" 
                  type="file" 
                  ref={fileInput}
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setData('resume', e.target.files[0])}
                  className="cursor-pointer file:text-indigo-600"
                />
                <p className="text-[10px] text-gray-400">PDF, DOC, or DOCX up to 2MB</p>
              </div>

              {progress && (
                <div className="space-y-2">
                    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div 
                            className="bg-indigo-600 h-full transition-all duration-300" 
                            style={{ width: `${progress.percentage}%` }}
                        />
                    </div>
                    <p className="text-xs text-center text-gray-500">{progress.percentage}% uploaded</p>
                </div>
              )}
            </CardContent>

            <CardFooter className="bg-gray-50/80 p-6 flex justify-between items-center border-t border-gray-100">
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="mr-2 h-4 w-4 text-gray-400" />
                <span className="truncate max-w-[200px]">
                    {data.resume ? data.resume.name : "Waiting for file..."}
                </span>
              </div>
              <Button 
                type="submit" 
                disabled={processing || !data.resume}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 transition-all active:scale-95"
              >
                {processing ? "Uploading..." : "Upload Resume"}
              </Button>

              
            </CardFooter>
            {/* CURRENT RESUME PREVIEW SECTION */}
            {resume_path ? (
            <div className="rounded-lg border border-indigo-100 bg-indigo-50/40 p-4 mx-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white border border-indigo-100 text-indigo-600 shadow-sm">
                    <FileText size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        Last Resume You Uploaded
                    </p>
                    <p className="text-sm font-medium text-gray-900 truncate">
                        {currentFileName}
                    </p>
                    </div>
                </div>
                
                <div className="flex shrink-0">
                    <Button 
                    variant="outline" 
                    size="sm" 
                    asChild 
                    className="w-full sm:w-auto h-8 bg-white hover:bg-indigo-50 border-indigo-200 text-indigo-600"
                    >
                    <a href={`/storage/${resume_path}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={14} className="mr-1.5" /> View
                    </a>
                    </Button>
                </div>
                </div>
            </div>
            ) : (
            <div className="rounded-lg border-2 border-dashed border-gray-200 p-6 text-center">
                <p className="text-sm text-gray-500">No resume uploaded yet.</p>
            </div>
            )}
          </form>
        </Card>
      </div>
    </MainLayout>
  );
};

export default ResumeUpload;