import React, { useRef, useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import MainLayout from '../../layouts/MainLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    FileText, 
    CheckCircle2, 
    ExternalLink, 
    UploadCloud, 
    Mail, 
    Linkedin, 
    User,
    Camera,
    Save,
    FileUp
} from "lucide-react";

const ResumeUpload = ({ auth, resume_path }) => {
    const resumeFileInput = useRef();
    const profileImageInput = useRef();
    const { props } = usePage();
    const flash = props?.flash || {};

    const [imagePreview, setImagePreview] = useState(
        auth.user.image ? `/storage/${auth.user.image}` : null
    );

    const profileForm = useForm({
        name: auth.user.name || '',
        linkedin: auth.user.linkedin || '',
        image: null,
    });

    const resumeForm = useForm({
        resume: null,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            profileForm.setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        profileForm.post('/profile/update', {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    const handleResumeSubmit = (e) => {
        e.preventDefault();
        if (!resumeForm.data.resume) return;

        resumeForm.post('/resume/upload', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                resumeForm.setData('resume', null);
                if (resumeFileInput.current) resumeFileInput.current.value = "";
            },
        });
    };

    const currentFileName = resume_path?.split('/').pop() || "Your Resume";

    return (
        <MainLayout auth={auth}>
            <div className="mx-auto py-5 px-4 sm:px-6 lg:px-8 ">
              {flash.success && (
                  <Alert className="mb-6 bg-emerald-50 border-emerald-100 text-emerald-800 rounded-xl">
                      <CheckCircle2 className="h-4 w-4 stroke-emerald-600" />
                      <AlertDescription>{flash.success}</AlertDescription>
                  </Alert>
              )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ">
                    {/* LEFT SIDE: Profile Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-none shadow-xl bg-white overflow-hidden ring-1 ring-slate-100 p-0">
                            <div className="h-28 bg-gradient-to-br from-indigo-600 via-indigo-500 to-purple-600" />
                            <CardContent className="relative pt-0 px-6 pb-8">
                                {/* Flash Message for Profile */}
                                {flash.error && (
                                    <Alert variant="destructive" className="mb-6 rounded-xl">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{flash.error}</AlertDescription>
                                    </Alert>
                                )}
                                <form onSubmit={handleProfileSubmit}>
                                    {/* Avatar Upload */}
                                    <div className="flex flex-col items-center -mt-14 mb-6">
                                        <div className="relative group cursor-pointer" onClick={() => profileImageInput.current.click()}>
                                            <div className="h-28 w-28 rounded-2xl border-4 border-white bg-slate-100 overflow-hidden shadow-md flex items-center justify-center">
                                                {imagePreview ? (
                                                    <img 
                                                        src={imagePreview} 
                                                        alt="Profile preview" 
                                                        className="h-full w-full object-cover" 
                                                    />
                                                ) : (
                                                    <User className="h-14 w-14 text-slate-300" />
                                                )}
                                            </div>
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl">
                                                <Camera className="text-white h-8 w-8" />
                                            </div>
                                            <input 
                                                type="file" 
                                                ref={profileImageInput} 
                                                className="hidden" 
                                                accept="image/*"
                                                onChange={handleImageChange}
                                            />
                                        </div>
                                        <p className="mt-2 text-xs font-medium text-indigo-600">Click to change photo</p>
                                    </div>

                                    <div className="space-y-5">
                                        {/* Name Input */}
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Full Name</Label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                <Input 
                                                    value={profileForm.data.name} 
                                                    onChange={e => profileForm.setData('name', e.target.value)}
                                                    className="pl-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" 
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                        </div>

                                        {/* Email (Read Only) */}
                                        <div className="space-y-2 opacity-70">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">Email Address (Locked)</Label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                                                <Input 
                                                    value={auth.user.email} 
                                                    disabled 
                                                    className="pl-10 bg-slate-100 border-slate-200 cursor-not-allowed" 
                                                />
                                            </div>
                                        </div>

                                        {/* LinkedIn Input */}
                                        <div className="space-y-2">
                                            <Label className="text-xs font-bold uppercase tracking-wider text-slate-500">LinkedIn Profile</Label>
                                            <div className="relative">
                                                <Linkedin className="absolute left-3 top-2.5 h-4 w-4 text-blue-500" />
                                                <Input 
                                                    value={profileForm.data.linkedin} 
                                                    onChange={e => profileForm.setData('linkedin', e.target.value)}
                                                    className="pl-10 bg-slate-50/50 border-slate-200 focus:bg-white transition-all" 
                                                    placeholder="linkedin.com/in/username"
                                                />
                                            </div>
                                        </div>

                                        <Button 
                                            type="submit" 
                                            disabled={profileForm.processing}
                                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl h-11 cursor-pointer"
                                        >
                                            <Save className="mr-2 h-4 w-4" />
                                            {profileForm.processing ? "Saving..." : "Update Profile"}
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* RIGHT SIDE: Resume Section */}
                    <div className="lg:col-span-7 space-y-6">
                        <Card className="border-none shadow-lg bg-white ring-1 ring-slate-100">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-bold flex items-center text-slate-800">
                                    <FileUp className="mr-3 h-6 w-6 text-indigo-600" />
                                    Upload Resume
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {/* Flash Message for Resume */}
                                {flash.error && (
                                    <Alert variant="destructive" className="mb-6 rounded-xl">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{flash.error}</AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleResumeSubmit} className="space-y-4">
                                    <div 
                                        onClick={() => resumeFileInput.current.click()}
                                        className="border-2 border-dashed border-slate-200 rounded-2xl p-10 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-300 transition-all cursor-pointer group"
                                    >
                                        <input 
                                            type="file" 
                                            ref={resumeFileInput}
                                            className="hidden" 
                                            accept=".pdf,.doc,.docx"
                                            onChange={(e) => resumeForm.setData('resume', e.target.files[0])}
                                        />
                                        <div className="h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                            <UploadCloud className="h-8 w-8 text-indigo-500" />
                                        </div>
                                        <p className="text-sm font-semibold text-slate-700">
                                            {resumeForm.data.resume ? resumeForm.data.resume.name : "Upload new resume version"}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1 font-medium">Supporting PDF and DOCX (Max 2MB)</p>
                                    </div>

                                    {resumeForm.progress && (
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div className="h-full bg-indigo-500 transition-all" style={{ width: `${resumeForm.progress.percentage}%` }} />
                                        </div>
                                    )}

                                    <Button 
                                        type="submit" 
                                        disabled={resumeForm.processing || !resumeForm.data.resume}
                                        className="w-full text-gray-100 bg-indigo-600 hover:bg-indigo-700 h-11 rounded-xl shadow-lg shadow-indigo-100"
                                    >
                                        {resumeForm.processing ? "Uploading File..." : "Confirm Upload"}
                                    </Button>
                                </form>

                                {/* Last Uploaded Preview Section */}
                                <div className="pt-6 border-t border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Current Active Resume</h4>
                                    {resume_path ? (
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 group">
                                            <div className="flex items-center space-x-4 min-w-0">
                                                <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shadow-sm">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-slate-900 truncate">{currentFileName}</p>
                                                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Standard CV Format</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild className="text-indigo-600 border hover:bg-white hover:shadow-sm rounded-lg">
                                                <a href={`/storage/${resume_path}`} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink size={16} className="mr-2" />
                                                    View
                                                </a>
                                            </Button>
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 px-2 rounded-xl border border-dashed border-slate-200">
                                            <p className="text-sm text-slate-400 italic">No document uploaded yet</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default ResumeUpload;