import React from 'react';
import { Target, User, ArrowRight, Github, Twitter, Linkedin, Heart, Zap, Globe, Clock, CheckCircle2, Briefcase, Users, TrendingUp } from 'lucide-react';
import AppLayout from '../layouts/AppLayout';
import { Head } from '@inertiajs/react';

export default function About({ aboutData }) {
  return (
    <AppLayout>
      <Head title="About Us | Job Board" />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-orange-50 pt-20 pb-24">
        <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-orange-100 blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-100 blur-3xl opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 mb-6 leading-tight">
              We're on a <span className="text-[#FB721B]">Mission</span> to Transform Hiring
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Connecting talented professionals with opportunities that matter. Building bridges between ambition and achievement, one job at a time.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#about-me" className="px-8 py-3 bg-white text-slate-700 font-semibold rounded-full hover:bg-slate-50 transition-all shadow-md border border-slate-200">
                About Me
              </a>

              <a href="#mission" className="px-8 py-3 bg-[#FB721B] text-white font-semibold rounded-full hover:bg-[#e5661a] transition-all shadow-lg hover:shadow-xl active:scale-95">
                Our Mission
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section className="py-20 bg-white" id="about-me">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-[#FB721B] font-semibold text-sm mb-6">
                <User className="w-4 h-4" />
                About the Founder
              </div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                {aboutData?.title || 'Turning Job Search Frustration into Innovation'}
              </h2>
              <div 
                className="space-y-4 text-slate-600 leading-relaxed [&>p]:mb-4 [&_strong]:text-slate-900"
                dangerouslySetInnerHTML={{ 
                  __html: aboutData?.description || `
                    <p>Hi, I'm <strong>Sarah Johnson</strong>, and I founded this platform after experiencing firsthand the challenges of modern job searching. After spending 15 years in HR and talent acquisition, I witnessed the disconnect between exceptional candidates and great opportunities.</p>
                    <p>The traditional hiring process felt broken—lengthy applications, ghosting, and endless waiting. I knew there had to be a better way. That's when Job Board was born.</p>
                    <p>Our platform is built on the belief that finding the right job shouldn't be a soul-crushing experience. It should be transparent, efficient, and empowering for both job seekers and employers.</p>
                    <p>Today, we're proud to help thousands of professionals find roles where they can truly thrive, while helping companies build diverse, talented teams.</p>
                  `
                }}
              />
              <div className="mt-8 flex gap-4">
                {aboutData?.x_link && (
                  <a href={aboutData.x_link} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full hover:bg-[#FB721B] hover:text-white transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
                {aboutData?.linkedin_link && (
                  <a href={aboutData.linkedin_link} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-100 rounded-full hover:bg-[#FB721B] hover:text-white transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutData?.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800'} 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-[#FB721B] text-white p-6 rounded-2xl shadow-xl max-w-xs">
                <div className="flex items-start gap-3">
                  <Clock className="w-6 h-6 flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-bold text-lg mb-1">{aboutData?.experience || '15+ Years'}</div>
                    <div className="text-sm text-orange-100">Industry Experience</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section id="mission" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-full text-[#FB721B] font-semibold text-sm mb-6">
              <Target className="w-4 h-4" />
              Our Mission
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">
              Empowering Careers, Building Futures
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              We're committed to creating a world where everyone has access to meaningful work, and companies can easily find the talent they need to succeed.
            </p>
          </div>

          {/* Mission Statement */}
          <div className="mt-16 bg-gradient-to-br from-[#FB721B] to-orange-600 rounded-3xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 opacity-10">
              <svg className="w-64 h-64" viewBox="0 0 200 200" fill="currentColor">
                <circle cx="100" cy="100" r="80" />
              </svg>
            </div>
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-3xl font-bold mb-4">What Drives Us Every Day</h3>
              <p className="text-xl text-orange-50 leading-relaxed mb-6">
                We believe that meaningful work is the foundation of a fulfilling life. Our mission is to eliminate barriers between talent and opportunity, making the hiring process faster, fairer, and more human.
              </p>
              <div className="flex items-center gap-3 text-orange-100">
                <CheckCircle2 className="w-5 h-5" />
                <span>Committed to transparency and fairness</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}