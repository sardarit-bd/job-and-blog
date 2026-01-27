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

    // Client-side error state
    const [clientError, setClientError] = useState({ profile: null, resume: null });

    const [imagePreview, setImagePreview] = useState(
        auth.user.image_url || null
    );

    const profileForm = useForm({
        name: auth.user.name || '',
        linkedin: auth.user.linkedin || '',
        image: null,
    });

    const resumeForm = useForm({
        resume: null,
    });

    // Constants for validation
    const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
    const MAX_RESUME_SIZE = 2 * 1024 * 1024; // 2MB

    // Validate image file
    const validateImage = (file) => {
        if (!file) return null;
        
        if (file.size > MAX_IMAGE_SIZE) {
            return 'Image size cannot exceed 5MB.';
        }
        
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return 'Image must be JPEG, PNG, JPG, GIF, or WebP format.';
        }
        
        return null; // No error
    };

    // Validate resume file
    const validateResume = (file) => {
        if (!file) return null;
        
        if (file.size > MAX_RESUME_SIZE) {
            return 'Resume size cannot exceed 2MB.';
        }
        
        const allowedTypes = [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];
        if (!allowedTypes.includes(file.type)) {
            return 'Resume must be PDF, DOC, or DOCX format.';
        }
        
        return null; // No error
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // Validate and set error (but still allow selection)
            const error = validateImage(file);
            setClientError(prev => ({ ...prev, profile: error }));
            
            // Always set the file and show preview
            profileForm.setData('image', file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleResumeChange = (e) => {
        const file = e.target.files[0];
        
        if (file) {
            // Validate and set error (but still allow selection)
            const error = validateResume(file);
            setClientError(prev => ({ ...prev, resume: error }));
            
            // Always set the file
            resumeForm.setData('resume', file);
        }
    };

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        
        // Check for client-side errors before submitting
        if (clientError.profile) {
            return; // Don't submit if there's an error
        }
        
        profileForm.post('/profile/update', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                setClientError(prev => ({ ...prev, profile: null }));
            },
        });
    };

    const handleResumeSubmit = (e) => {
        e.preventDefault();
        
        if (!resumeForm.data.resume) return;
        
        // Check for client-side errors before submitting
        if (clientError.resume) {
            return; // Don't submit if there's an error
        }

        resumeForm.post('/resume/upload', {
            forceFormData: true,
            preserveScroll: true,
            onSuccess: () => {
                resumeForm.setData('resume', null);
                setClientError(prev => ({ ...prev, resume: null }));
                if (resumeFileInput.current) resumeFileInput.current.value = "";
            },
        });
    };

    // Helper to format file size
    const formatFileSize = (bytes) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const currentFileName = resume_path?.split('/').pop() || "Your Resume";

    const fullResumeUrl = resume_path 
        ? (resume_path.startsWith('http') ? resume_path : `${window.location.origin}${resume_path}`)
        : null;

    return (
        <MainLayout auth={auth}>
            <div className="mx-auto py-5 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT SIDE: Profile Section */}
                    <div className="lg:col-span-5 space-y-6">
                        <Card className="border-none shadow-xl bg-white overflow-hidden ring-1 ring-slate-100 p-0">
                            <div className="h-28 bg-gradient-to-br from-[#eb620c] to-[#f79f68]" />
                            <CardContent className="relative pt-0 px-6 pb-8">
                                <form onSubmit={handleProfileSubmit}>
                                    {/* Avatar Upload */}
                                    <div className="flex flex-col items-center -mt-14 mb-6">
                                        <div 
                                            className="relative group cursor-pointer" 
                                            onClick={() => profileImageInput.current.click()}
                                        >
                                            <div className={`h-28 w-28 rounded-2xl border-4 ${clientError.profile ? 'border-red-400' : 'border-white'} bg-slate-100 overflow-hidden shadow-md flex items-center justify-center`}>
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
                                        <p className="mt-2 text-xs font-medium text-slate-800">
                                            Click to change photo (up to 5MB). Supported: JPEG, JPG, PNG, GIF, WEBP
                                        </p>
                                        
                                        {/* Show selected file info */}
                                        {profileForm.data.image && (
                                            <p className={`mt-1 text-xs ${clientError.profile ? 'text-red-500' : 'text-green-600'}`}>
                                                Selected: {profileForm.data.image.name} ({formatFileSize(profileForm.data.image.size)})
                                            </p>
                                        )}
                                    </div>

                                    {/* Success Message */}
                                    {flash.success?.scope === "profile" && (
                                        <Alert className="mb-4 bg-emerald-50 border-emerald-100">
                                            <AlertDescription>{flash.success.message}</AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Client-side Error */}
                                    {clientError.profile && (
                                        <Alert variant="destructive" className="mb-4 text-red-500 py-1">
                                            <AlertDescription>{clientError.profile}</AlertDescription>
                                        </Alert>
                                    )}

                                    {/* Server-side Error */}
                                    {flash.error?.scope === "profile" && !clientError.profile && (
                                        <Alert variant="destructive" className="mb-4 text-red-500 py-1">
                                            <AlertDescription>{flash.error.message}</AlertDescription>
                                        </Alert>
                                    )}

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
                                            disabled={profileForm.processing || !!clientError.profile}
                                            className={`w-full text-white rounded-xl h-11 cursor-pointer ${
                                                clientError.profile 
                                                    ? 'bg-gray-400 cursor-not-allowed' 
                                                    : 'bg-[#fb721b]'
                                            }`}
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
                        <Card className="border-none shadow-lg bg-white ring-1 ring-slate-100 py-0">
                            <CardHeader className="bg-gradient-to-br from-[#eb620c] to-[#f79f68] py-7 rounded-t-xl">
                                <CardTitle className="text-xl font-bold flex items-center text-gray-50">
                                    <FileUp className="mr-3 h-6 w-6 text-gray-50" />
                                    Upload Resume
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                
                                {/* Success Message */}
                                {flash.success?.scope === "resume" && (
                                    <Alert className="mb-4 bg-emerald-50 border-emerald-100">
                                        <AlertDescription>{flash.success.message}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Client-side Error */}
                                {clientError.resume && (
                                    <Alert variant="destructive" className="mb-4 text-red-500">
                                        <AlertDescription>{clientError.resume}</AlertDescription>
                                    </Alert>
                                )}

                                {/* Server-side Error */}
                                {flash.error?.scope === "resume" && !clientError.resume && (
                                    <Alert variant="destructive" className="mb-4 text-red-500">
                                        <AlertDescription>{flash.error.message}</AlertDescription>
                                    </Alert>
                                )}

                                <form onSubmit={handleResumeSubmit} className="space-y-4">
                                    <div 
                                        onClick={() => resumeFileInput.current.click()}
                                        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-all cursor-pointer group ${
                                            clientError.resume 
                                                ? 'border-red-300 bg-red-50/50 hover:bg-red-50' 
                                                : 'border-slate-200 bg-slate-50/50 hover:bg-indigo-50/30 hover:border-indigo-300'
                                        }`}
                                    >
                                        <input 
                                            type="file" 
                                            ref={resumeFileInput}
                                            className="hidden" 
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleResumeChange}
                                        />
                                        <div className={`h-16 w-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${
                                            clientError.resume ? 'text-red-500' : 'text-[#fb721b]'
                                        }`}>
                                            <UploadCloud className="h-8 w-8" />
                                        </div>
                                        <p className={`text-sm font-semibold ${clientError.resume ? 'text-red-600' : 'text-slate-700'}`}>
                                            {resumeForm.data.resume 
                                                ? `${resumeForm.data.resume.name} (${formatFileSize(resumeForm.data.resume.size)})` 
                                                : "Upload new resume version"
                                            }
                                        </p>
                                        <p className="text-xs text-slate-400 mt-1 font-medium">
                                            Supporting PDF and DOCX (Max 2MB)
                                        </p>
                                    </div>

                                    {resumeForm.progress && (
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-indigo-500 transition-all" 
                                                style={{ width: `${resumeForm.progress.percentage}%` }} 
                                            />
                                        </div>
                                    )}

                                    <Button 
                                        type="submit" 
                                        disabled={resumeForm.processing || !resumeForm.data.resume || !!clientError.resume}
                                        className={`w-full h-11 rounded-xl shadow-lg shadow-indigo-100 cursor-pointer ${
                                            clientError.resume 
                                                ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
                                                : 'text-gray-100 bg-[#fb721b]'
                                        }`}
                                    >
                                        {resumeForm.processing ? "Uploading File..." : "Confirm Upload"}
                                    </Button>
                                </form>

                                {/* Last Uploaded Preview Section */}
                                <div className="py-6 border-t border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                                        Current Active Resume
                                    </h4>
                                    {resume_path ? (
                                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-200 group">
                                            <div className="flex items-center space-x-4 min-w-0">
                                                <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[#fb721b] shadow-sm">
                                                    <FileText size={20} />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-slate-900 truncate">{currentFileName}</p>
                                                    <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tight">Standard CV Format</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" asChild className="text-[#fb721b] border hover:bg-white hover:shadow-sm rounded-lg">
                                                <a href={fullResumeUrl} target="_blank" rel="noopener noreferrer">
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