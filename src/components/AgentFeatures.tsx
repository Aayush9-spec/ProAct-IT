import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Bot, 
  Filter, 
  Clock, 
  MessageSquare, 
  BookOpen, 
  Cog,
  TrendingUp,
  Users,
  Zap,
  Shield,
  MonitorSpeaker,
  FileText,
  DollarSign,
  AlertTriangle,
  BarChart3,
  Workflow,
  Globe,
  Database,
  CheckCircle,
  Target,
  Gauge
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Scene3D } from "@/components/3d/Scene3D";
import { Feature3D } from "@/components/3d/Feature3D";

const coreFeatures = [
  {
    icon: Filter,
    title: "Intelligent Ticket Triage",
    description: "Automatically analyze, categorize and route tickets to the right technicians based on skills, workload and availability.",
    benefits: ["Faster routing", "Better matching", "Load balancing"],
    color: "text-primary",
    bgColor: "bg-primary/10"
  },
  {
    icon: Clock,
    title: "Automated Time Tracking",
    description: "AI monitors ticket activities and automatically logs time spent on tasks for accurate billing and performance insights.",
    benefits: ["Accurate billing", "No manual logging", "Performance data"],
    color: "text-accent",
    bgColor: "bg-accent/10"
  },
  {
    icon: MessageSquare,
    title: "First-Response Generation",
    description: "Generate instant, personalized responses for common issues while technicians focus on complex problems.",
    benefits: ["Instant responses", "Customer satisfaction", "Reduced workload"],
    color: "text-warning",
    bgColor: "bg-warning/10"
  },
  {
    icon: BookOpen,
    title: "Knowledge Base Integration",
    description: "Automatically suggest relevant solutions from your knowledge base for faster problem resolution.",
    benefits: ["Faster solutions", "Knowledge sharing", "Reduced research time"],
    color: "text-purple-600",
    bgColor: "bg-purple-600/10"
  },
  {
    icon: Cog,
    title: "Task Automation",
    description: "Execute predefined maintenance scripts and remediation tasks automatically before escalating to technicians.",
    benefits: ["Auto-remediation", "Fewer escalations", "Proactive fixes"],
    color: "text-orange-600",
    bgColor: "bg-orange-600/10"
  },
  {
    icon: TrendingUp,
    title: "Performance Analytics",
    description: "Real-time insights into team productivity, ticket patterns, and service delivery metrics.",
    benefits: ["Data-driven decisions", "Performance tracking", "Optimization insights"],
    color: "text-emerald-600",
    bgColor: "bg-emerald-600/10"
  }
];

const advancedFeatures = [
  {
    icon: Target,
    title: "SLA Management & Monitoring",
    description: "Automatically track SLA compliance, send alerts for potential breaches, and generate compliance reports.",
    benefits: ["SLA compliance", "Breach prevention", "Automated reporting"],
    color: "text-red-600",
    bgColor: "bg-red-600/10"
  },
  {
    icon: MonitorSpeaker,
    title: "Remote Monitoring & Management",
    description: "Proactive monitoring of client systems with automated patch management and maintenance scheduling.",
    benefits: ["Proactive monitoring", "Automated patching", "System health"],
    color: "text-blue-600",
    bgColor: "bg-blue-600/10"
  },
  {
    icon: DollarSign,
    title: "Billing & Invoicing Automation",
    description: "Automatic time-to-billing conversion with customizable rates, contract management, and invoice generation.",
    benefits: ["Automated billing", "Contract tracking", "Revenue optimization"],
    color: "text-green-600",
    bgColor: "bg-green-600/10"
  },
  {
    icon: Globe,
    title: "Client Portal Integration",
    description: "Self-service portal for clients to submit tickets, track progress, access documentation, and view reports.",
    benefits: ["Self-service options", "Client satisfaction", "Reduced admin work"],
    color: "text-indigo-600",
    bgColor: "bg-indigo-600/10"
  },
  {
    icon: AlertTriangle,
    title: "Escalation Management",
    description: "Smart escalation workflows with customizable triggers, notification chains, and resolution tracking.",
    benefits: ["Automated escalation", "Priority handling", "Resolution tracking"],
    color: "text-yellow-600",
    bgColor: "bg-yellow-600/10"
  },
  {
    icon: Database,
    title: "Asset Management & Discovery",
    description: "Comprehensive IT asset tracking with automated discovery, lifecycle management, and compliance monitoring.",
    benefits: ["Asset visibility", "Lifecycle tracking", "Compliance monitoring"],
    color: "text-cyan-600",
    bgColor: "bg-cyan-600/10"
  }
];

const enterpriseFeatures = [
  {
    icon: Shield,
    title: "Security & Compliance Monitoring",
    description: "Continuous security monitoring with compliance reporting for GDPR, HIPAA, SOC 2, and other standards.",
    benefits: ["Security monitoring", "Compliance reporting", "Risk assessment"],
    color: "text-rose-600",
    bgColor: "bg-rose-600/10"
  },
  {
    icon: Workflow,
    title: "Service Request Workflow",
    description: "Customizable workflow automation for service requests with approval chains and status tracking.",
    benefits: ["Workflow automation", "Approval chains", "Status tracking"],
    color: "text-violet-600",
    bgColor: "bg-violet-600/10"
  },
  {
    icon: BarChart3,
    title: "Business Intelligence Dashboard",
    description: "Executive dashboards with KPI tracking, trend analysis, and predictive insights for better decision making.",
    benefits: ["Executive insights", "KPI tracking", "Predictive analytics"],
    color: "text-teal-600",
    bgColor: "bg-teal-600/10"
  },
  {
    icon: Gauge,
    title: "Performance Benchmarking",
    description: "Compare your team's performance against industry standards and identify optimization opportunities.",
    benefits: ["Industry benchmarks", "Performance comparison", "Optimization insights"],
    color: "text-amber-600",
    bgColor: "bg-amber-600/10"
  },
  {
    icon: FileText,
    title: "Documentation & Compliance",
    description: "Automated documentation generation for processes, changes, and compliance requirements.",
    benefits: ["Auto documentation", "Compliance tracking", "Process recording"],
    color: "text-lime-600",
    bgColor: "bg-lime-600/10"
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance & CSAT",
    description: "Automated customer satisfaction surveys, quality scoring, and continuous improvement recommendations.",
    benefits: ["Quality scoring", "CSAT tracking", "Improvement insights"],
    color: "text-pink-600",
    bgColor: "bg-pink-600/10"
  }
];

const AgentFeatures = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [coreVisible, setCoreVisible] = useState(false);
  const [advancedVisible, setAdvancedVisible] = useState(false);
  const [enterpriseVisible, setEnterpriseVisible] = useState(false);
  const [animatedCoreCards, setAnimatedCoreCards] = useState<boolean[]>(new Array(6).fill(false));
  const [animatedAdvancedCards, setAnimatedAdvancedCards] = useState<boolean[]>(new Array(6).fill(false));
  const [animatedEnterpriseCards, setAnimatedEnterpriseCards] = useState<boolean[]>(new Array(6).fill(false));
  const sectionRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  const advancedRef = useRef<HTMLDivElement>(null);
  const enterpriseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          
          if (entry.isIntersecting) {
            if (target === sectionRef.current) {
              setIsVisible(true);
            } else if (target === coreRef.current) {
              setCoreVisible(true);
              setAnimatedCoreCards(new Array(6).fill(false));
              setTimeout(() => {
                coreFeatures.forEach((_, index) => {
                  setTimeout(() => {
                    setAnimatedCoreCards(prev => {
                      const newState = [...prev];
                      newState[index] = true;
                      return newState;
                    });
                  }, index * 150);
                });
              }, 200);
            } else if (target === advancedRef.current) {
              setAdvancedVisible(true);
              setAnimatedAdvancedCards(new Array(6).fill(false));
              setTimeout(() => {
                advancedFeatures.forEach((_, index) => {
                  setTimeout(() => {
                    setAnimatedAdvancedCards(prev => {
                      const newState = [...prev];
                      newState[index] = true;
                      return newState;
                    });
                  }, index * 150);
                });
              }, 200);
            } else if (target === enterpriseRef.current) {
              setEnterpriseVisible(true);
              setAnimatedEnterpriseCards(new Array(6).fill(false));
              setTimeout(() => {
                enterpriseFeatures.forEach((_, index) => {
                  setTimeout(() => {
                    setAnimatedEnterpriseCards(prev => {
                      const newState = [...prev];
                      newState[index] = true;
                      return newState;
                    });
                  }, index * 150);
                });
              }, 200);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const refs = [sectionRef.current, coreRef.current, advancedRef.current, enterpriseRef.current];
    refs.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 theme-features relative overflow-hidden">
      {/* 3D Background Features */}
      <Scene3D className="absolute inset-0 -z-10 opacity-20">
        <Feature3D position={[-8, 4, -5]} icon="automation" isActive={coreVisible} />
        <Feature3D position={[8, -2, -8]} icon="analytics" isActive={advancedVisible} />
        <Feature3D position={[-6, -4, -10]} icon="security" isActive={enterpriseVisible} />
        <Feature3D position={[6, 6, -6]} icon="integration" isActive={isVisible} />
      </Scene3D>
      <div className={`container mx-auto px-4 transition-all duration-1000 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`}>
        <div className={`text-center mb-16 transition-all duration-800 delay-300 transform ${
          isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-95'
        }`}>
          <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-600 delay-500 ${
            isVisible ? 'animate-bounce' : ''
          }`}>
            <Bot className="w-8 h-8 text-primary" />
            <Badge variant="outline" className="text-primary border-primary/20">
              AI-Powered Features
            </Badge>
          </div>
          
          <h2 className={`text-4xl lg:text-5xl font-bold text-foreground mb-6 transition-all duration-800 delay-700 transform ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-6 opacity-0'
          }`}>
            Complete IT Automation Suite
          </h2>
          
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-800 delay-900 transform ${
            isVisible 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}>
            Our Proactive IT Agent transforms how MSPs and IT teams handle service delivery 
            through intelligent automation and real-time insights.
          </p>
        </div>

        {/* Core Features Section */}
        <div ref={coreRef} className="mb-24">
          <div className={`text-center mb-12 transition-all duration-800 delay-300 transform ${
            coreVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <Badge variant="outline" className="text-primary border-primary/20 mb-4">
              Core AI Features
            </Badge>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Essential Automation Tools
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Foundation features that every MSP and IT team needs to streamline operations
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {coreFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isCardVisible = animatedCoreCards[index];
              return (
                <Card 
                  key={index} 
                  className={`group hover:shadow-elegant transition-all duration-700 border-border hover:border-primary/20 transform ${
                    isCardVisible 
                      ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                      : 'translate-y-12 opacity-0 scale-95 -rotate-1'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    transform: isCardVisible ? 'translateY(0) scale(1) rotate(0deg)' : 'translateY(48px) scale(0.95) rotate(-1deg)'
                  }}
                >
                  <CardHeader>
                    <div className={`p-4 rounded-xl ${feature.bgColor} w-fit mb-4 group-hover:scale-110 transition-all duration-300 ${
                      isCardVisible ? 'animate-pulse' : ''
                    }`}>
                      <Icon className={`w-8 h-8 ${feature.color} transition-all duration-500 ${
                        isCardVisible ? 'rotate-0' : 'rotate-12'
                      }`} />
                    </div>
                    
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                    
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground text-sm">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Advanced Features Section */}
        <div ref={advancedRef} className="mb-24">
          <div className={`text-center mb-12 transition-all duration-800 delay-300 transform ${
            advancedVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <Badge variant="outline" className="text-accent border-accent/20 mb-4">
              Advanced MSP Tools
            </Badge>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Professional Service Management
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced features for MSPs managing multiple clients with complex service requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {advancedFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isCardVisible = animatedAdvancedCards[index];
              return (
                <Card 
                  key={index} 
                  className={`group hover:shadow-elegant transition-all duration-700 border-border hover:border-accent/20 transform ${
                    isCardVisible 
                      ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                      : 'translate-y-12 opacity-0 scale-95 rotate-1'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    transform: isCardVisible ? 'translateY(0) scale(1) rotate(0deg)' : 'translateY(48px) scale(0.95) rotate(1deg)'
                  }}
                >
                  <CardHeader>
                    <div className={`p-4 rounded-xl ${feature.bgColor} w-fit mb-4 group-hover:scale-110 transition-all duration-300 ${
                      isCardVisible ? 'animate-bounce' : ''
                    }`}>
                      <Icon className={`w-8 h-8 ${feature.color} transition-all duration-500 ${
                        isCardVisible ? 'rotate-0' : '-rotate-12'
                      }`} />
                    </div>
                    
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                    
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground text-sm">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Enterprise Features Section */}
        <div ref={enterpriseRef} className="mb-16">
          <div className={`text-center mb-12 transition-all duration-800 delay-300 transform ${
            enterpriseVisible 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <Badge variant="outline" className="text-warning border-warning/20 mb-4">
              Enterprise Features
            </Badge>
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
              Enterprise-Grade Capabilities
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features for large enterprises and MSPs with complex compliance and reporting needs
            </p>
          </div>

          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {enterpriseFeatures.map((feature, index) => {
              const Icon = feature.icon;
              const isCardVisible = animatedEnterpriseCards[index];
              return (
                <Card 
                  key={index} 
                  className={`group hover:shadow-elegant transition-all duration-700 border-border hover:border-warning/20 transform ${
                    isCardVisible 
                      ? 'translate-y-0 opacity-100 scale-100 rotate-0' 
                      : 'translate-y-12 opacity-0 scale-95 rotate-2'
                  }`}
                  style={{ 
                    transitionDelay: `${index * 100}ms`,
                    transform: isCardVisible ? 'translateY(0) scale(1) rotate(0deg)' : 'translateY(48px) scale(0.95) rotate(2deg)'
                  }}
                >
                  <CardHeader>
                    <div className={`p-4 rounded-xl ${feature.bgColor} w-fit mb-4 group-hover:scale-110 transition-all duration-300 ${
                      isCardVisible ? 'animate-pulse' : ''
                    }`}>
                      <Icon className={`w-8 h-8 ${feature.color} transition-all duration-500 ${
                        isCardVisible ? 'rotate-0' : 'rotate-45'
                      }`} />
                    </div>
                    
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {feature.title}
                    </CardTitle>
                    
                    <CardDescription className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground text-sm">Key Benefits:</h4>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Zap className="w-4 h-4 text-accent flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <Card className={`bg-gradient-primary text-primary-foreground border-0 shadow-glow transition-all duration-1000 delay-1000 transform ${
          isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-8 opacity-0 scale-98'
        }`}>
          <CardContent className="p-12 text-center">
            <div className="max-w-2xl mx-auto space-y-6">
              <h3 className={`text-3xl font-bold transition-all duration-800 delay-1200 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              }`}>
                Ready to Transform Your IT Operations?
              </h3>
              
              <p className={`text-primary-foreground/80 text-lg transition-all duration-800 delay-1400 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              }`}>
                Join hundreds of MSPs and IT teams already saving time and improving service delivery 
                with our AI-powered automation platform.
              </p>
              
              <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-800 delay-1600 transform ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-6 opacity-0'
              }`}>
                <Button 
                  variant="hero" 
                  size="lg" 
                  className={`bg-primary-foreground text-primary hover:bg-primary-foreground/90 transition-all duration-500 hover:scale-105 ${
                    isVisible ? 'hover:animate-pulse' : ''
                  }`}
                  onClick={() => window.open('#signup', '_self')}
                >
                  <Users className="w-5 h-5 mr-2" />
                  Start Free Trial
                </Button>
                
                <Button 
                  variant="outline-hero" 
                  size="lg" 
                  className={`border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 transition-all duration-500 hover:scale-105 ${
                    isVisible ? 'hover:animate-bounce' : ''
                  }`}
                  onClick={() => window.open('#demo', '_self')}
                >
                  Schedule Demo
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default AgentFeatures;