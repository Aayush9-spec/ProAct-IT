import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Bot, Zap, Target, Clock, Play, CheckCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-dashboard.jpg";
import { Scene3D } from "@/components/3d/Scene3D";
import { FloatingCubes } from "@/components/3d/FloatingCubes";
import { AnimatedBackground } from "@/components/3d/AnimatedBackground";

const HeroSection = () => {
  return (
    <section className="min-h-screen theme-hero relative overflow-hidden">,
      {/* 3D Background */}
      <Scene3D className="absolute inset-0 -z-20">
        <AnimatedBackground />
        <FloatingCubes />
      </Scene3D>
      
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-30 -z-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='rgba(255,255,255,0.03)' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`
      }}></div>
      
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-left space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary/20 rounded-xl animate-pulse-glow">
                  <Bot className="w-8 h-8 text-primary-foreground" />
                </div>
                <span className="text-primary-foreground/80 font-medium tracking-wide">
                  PROACTIVE IT AGENT
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight">
                Automate Your
                <span className="block bg-gradient-to-r from-primary-foreground to-primary-glow bg-clip-text text-transparent animate-float">
                  IT Operations
                </span>
              </h1>
              
              <p className="text-xl text-primary-foreground/80 max-w-lg leading-relaxed">
                Enhance technician productivity with AI-powered automation. 
                Handle routine tasks, intelligent triage, and real-time insights 
                for MSPs and IT teams.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="lg" 
                className="group shadow-glow"
                onClick={() => window.open('#signup', '_self')}
              >
                Get Started
                <Zap className="w-5 h-5 ml-2 group-hover:animate-pulse" />
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline-hero" size="lg">
                    <Play className="w-5 h-5 mr-2" />
                    Watch Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-2xl">
                      <Bot className="w-8 h-8 text-primary" />
                      Proactive IT Agent Demo
                    </DialogTitle>
                  </DialogHeader>
                  
                  <div className="space-y-6">
                    {/* Demo Video Placeholder */}
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 rounded-xl flex items-center justify-center border border-border">
                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                          <Play className="w-10 h-10 text-primary" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-foreground">Interactive Demo</h3>
                          <p className="text-muted-foreground">See AI automation in action</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Key Features */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Smart Ticket Triage</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              AI automatically categorizes and routes tickets to the right technician
                            </p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Auto Time Tracking</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Precise time logging with AI-powered activity monitoring
                            </p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
                            <Zap className="w-5 h-5 text-warning" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Instant Responses</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Generate automated first responses for common issues
                            </p>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-emerald-500/10 rounded-lg flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-emerald-600" />
                          </div>
                          <div>
                            <h4 className="font-medium text-foreground">Task Automation</h4>
                            <p className="text-sm text-muted-foreground mt-1">
                              Execute routine maintenance and remediation tasks
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    
                    {/* CTA */}
                    <div className="text-center pt-4 border-t border-border">
                      <Button 
                        variant="hero" 
                        size="lg" 
                        className="shadow-glow"
                        onClick={() => window.open('#signup', '_self')}
                      >
                        Start Free Trial
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-primary-foreground/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground">85%</div>
                <div className="text-sm text-primary-foreground/70">Less Manual Tasks</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground">2x</div>
                <div className="text-sm text-primary-foreground/70">Faster Resolution</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-foreground">50%</div>
                <div className="text-sm text-primary-foreground/70">Cost Reduction</div>
              </div>
            </div>
          </div>

          {/* Right content - Dashboard preview */}
          <div className="relative">
            <div className="relative z-10">
              <img 
                src={heroImage} 
                alt="AI Dashboard Preview" 
                className="rounded-2xl shadow-elegant w-full h-auto animate-float"
              />
              
              {/* Floating feature cards */}
              <Card className="absolute -bottom-6 -left-6 p-4 bg-card/95 backdrop-blur-sm shadow-elegant">
                <div className="flex items-center gap-3">
                  <Target className="w-6 h-6 text-accent" />
                  <div>
                    <div className="font-semibold text-card-foreground">Auto Triage</div>
                    <div className="text-sm text-muted-foreground">Real-time classification</div>
                  </div>
                </div>
              </Card>
              
              <Card className="absolute -top-6 -right-6 p-4 bg-card/95 backdrop-blur-sm shadow-elegant">
                <div className="flex items-center gap-3">
                  <Clock className="w-6 h-6 text-warning" />
                  <div>
                    <div className="font-semibold text-card-foreground">Smart Tracking</div>
                    <div className="text-sm text-muted-foreground">Automated logging</div>
                  </div>
                </div>
              </Card>
            </div>
            
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-primary opacity-20 blur-3xl rounded-full scale-110 -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;