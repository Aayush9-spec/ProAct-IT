import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Scene3D } from "@/components/3d/Scene3D";
import { DashboardVisualization } from "@/components/3d/DashboardVisualization";
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  User, 
  Bot,
  ArrowRight,
  Zap,
  Timer
} from "lucide-react";
import { useState, useEffect } from "react";

const LiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  const demoSteps = [
    {
      title: "New Ticket Received",
      description: "Password reset request from Sarah Johnson",
      status: "received",
      icon: User,
      color: "text-warning"
    },
    {
      title: "AI Analysis & Triage",
      description: "Analyzing content, priority, and technician availability",
      status: "processing", 
      icon: Bot,
      color: "text-primary"
    },
    {
      title: "Auto-Response Sent",
      description: "Instant reply with password reset link generated",
      status: "completed",
      icon: CheckCircle,
      color: "text-accent"
    },
    {
      title: "Time Automatically Logged",
      description: "2 minutes tracked and categorized for billing",
      status: "completed",
      icon: Timer,
      color: "text-emerald-600"
    }
  ];

  const ticketData = {
    id: "TK-2024-001247",
    customer: "Acme Corp",
    issue: "Employee password reset - Sarah Johnson",
    priority: "Medium",
    category: "Account Access",
    assignedTo: "Auto-Agent",
    timeSpent: "2m 15s",
    status: "Resolved"
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
      setProgress((prev) => (prev + 25) % 101);
    }, 2500);

    return () => clearInterval(interval);
  }, [demoSteps.length]);

  return (
    <section className="py-24 theme-demo relative overflow-hidden">
      {/* 3D Dashboard Visualization */}
      <Scene3D className="absolute inset-0 -z-10 opacity-40" enableControls={false}>
        <DashboardVisualization />
      </Scene3D>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="outline" className="text-primary border-primary/20 mb-6">
            Live Automation Demo
          </Badge>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Watch AI in Action
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our Proactive IT Agent handles real tickets from start to finish, 
            automatically processing and resolving common IT requests.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Demo Process */}
          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Bot className="w-6 h-6 text-primary" />
                  Agent Workflow
                </CardTitle>
                <CardDescription>
                  Real-time processing of incoming service request
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <Progress value={progress} className="h-2" />
                
                <div className="space-y-4">
                  {demoSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isActive = index === currentStep;
                    const isCompleted = index < currentStep;
                    
                    return (
                      <div key={index} className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-500 ${
                        isActive ? 'border-primary/50 bg-primary/5 shadow-glow' : 
                        isCompleted ? 'border-accent/50 bg-accent/5' : 
                        'border-border'
                      }`}>
                        <div className={`p-2 rounded-full ${
                          isActive ? 'bg-primary/20 animate-pulse' :
                          isCompleted ? 'bg-accent/20' :
                          'bg-muted'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            isActive ? 'text-primary' :
                            isCompleted ? 'text-accent' :
                            'text-muted-foreground'
                          }`} />
                        </div>
                        
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{step.title}</h4>
                          <p className="text-sm text-muted-foreground">{step.description}</p>
                        </div>
                        
                        {isActive && <Zap className="w-5 h-5 text-primary animate-pulse" />}
                        {isCompleted && <CheckCircle className="w-5 h-5 text-accent" />}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ticket Preview */}
          <div className="space-y-6">
            <Card className="shadow-elegant">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Ticket Details</CardTitle>
                  <Badge variant="outline" className="text-accent border-accent/20">
                    {ticketData.status}
                  </Badge>
                </div>
                <CardDescription className="font-mono text-sm">
                  {ticketData.id}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Issue Description</h4>
                    <p className="text-muted-foreground">{ticketData.issue}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Customer</h4>
                      <p className="text-muted-foreground">{ticketData.customer}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Priority</h4>
                      <Badge variant="secondary">{ticketData.priority}</Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Category</h4>
                      <p className="text-muted-foreground">{ticketData.category}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Time Spent</h4>
                      <p className="text-accent font-medium">{ticketData.timeSpent}</p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="font-medium text-foreground mb-3">Assigned Agent</h4>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Bot className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-foreground">{ticketData.assignedTo}</p>
                      <p className="text-sm text-muted-foreground">AI Assistant</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-primary text-primary-foreground border-0">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-3">Automation Impact</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold">0s</div>
                    <div className="text-primary-foreground/80">Wait Time</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">100%</div>
                    <div className="text-primary-foreground/80">Automated</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="hero" 
            size="lg" 
            className="shadow-glow"
            onClick={() => window.open('#signup', '_self')}
          >
            Experience the Platform
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LiveDemo;