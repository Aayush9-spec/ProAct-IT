import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Scene3D } from "@/components/3d/Scene3D";
import { FloatingCubes } from "@/components/3d/FloatingCubes";
import { AnimatedFrames } from "@/components/3d/AnimatedFrames";
import { 
  UserPlus, 
  CheckCircle, 
  Clock, 
  Users, 
  Shield,
  Zap,
  ArrowRight,
  Mail,
  Building2,
  User
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const signupSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters"),
});

type SignupFormData = z.infer<typeof signupSchema>;

const benefits = [
  {
    icon: Clock,
    title: "30-Day Free Trial",
    description: "Full access to all features",
    color: "text-accent"
  },
  {
    icon: Shield,
    title: "No Credit Card Required",
    description: "Start immediately without payment",
    color: "text-primary"
  },
  {
    icon: Users,
    title: "Expert Support",
    description: "Dedicated onboarding assistance",
    color: "text-warning"
  },
  {
    icon: Zap,
    title: "Instant Setup",
    description: "Deploy in under 10 minutes",
    color: "text-purple-600"
  }
];

const SignupSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { toast } = useToast();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
    },
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onSubmit = async (data: SignupFormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Welcome to Proactive IT Agent! 🎉",
      description: `Thank you ${data.firstName}! Check your email for next steps.`,
    });
    
    setIsSubmitting(false);
    form.reset();
  };

  return (
    <section 
      id="signup" 
      ref={sectionRef} 
      className="py-24 theme-signup relative overflow-hidden"
    >
      {/* 3D Background */}
      <Scene3D className="absolute inset-0 -z-20 opacity-40">
        <FloatingCubes />
        <AnimatedFrames />
      </Scene3D>
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 opacity-50 -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl opacity-30 animate-pulse -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl opacity-30 animate-pulse -z-10" />
      
      <div className={`container mx-auto px-4 relative transition-all duration-1000 transform ${
        isVisible 
          ? 'translate-y-0 opacity-100' 
          : 'translate-y-12 opacity-0'
      }`}>
        
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-800 delay-300 transform ${
          isVisible 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}>
          <div className="flex items-center justify-center gap-3 mb-6">
            <UserPlus className="w-8 h-8 text-primary animate-pulse" />
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              Start Your Free Trial
            </Badge>
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Transform Your IT Operations Today
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Join hundreds of MSPs and IT teams already saving time with our AI-powered platform.
            Get started in minutes with our 30-day free trial.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch max-w-7xl mx-auto px-4">
          
          {/* Benefits */}
          <div className={`space-y-8 transition-all duration-800 delay-500 transform ${
            isVisible 
              ? 'translate-x-0 opacity-100' 
              : '-translate-x-8 opacity-0'
          }`}>
            <h3 className="text-2xl font-semibold text-foreground mb-8">
              Why Choose Our Platform?
            </h3>
            
            <div className="space-y-6">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div 
                    key={index}
                    className={`flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:shadow-elegant transition-all duration-500 hover:scale-105 ${
                      isVisible ? 'animate-pulse' : ''
                    }`}
                    style={{ animationDelay: `${index * 200}ms` }}
                  >
                    <div className={`p-3 rounded-lg bg-${benefit.color.split('-')[1]}/10 flex-shrink-0`}>
                      <Icon className={`w-6 h-6 ${benefit.color}`} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">{benefit.title}</h4>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <Card className="bg-gradient-primary text-primary-foreground border-0 shadow-glow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-6 h-6 text-primary-foreground" />
                  <h4 className="font-semibold">What You Get:</h4>
                </div>
                <ul className="space-y-2 text-primary-foreground/90">
                  <li>• Full access to all AI automation features</li>
                  <li>• Unlimited ticket processing</li>
                  <li>• Complete analytics dashboard</li>
                  <li>• Priority customer support</li>
                  <li>• Custom integrations available</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Signup Form */}
          <Card className={`shadow-elegant border-border transition-all duration-800 delay-700 transform ${
            isVisible 
              ? 'translate-x-0 opacity-100 scale-100' 
              : 'translate-x-8 opacity-0 scale-95'
          }`}>
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Start Your Free Trial</CardTitle>
              <CardDescription>
                No credit card required. Setup takes less than 5 minutes.
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="w-4 h-4 text-muted-foreground" />
                            First Name
                          </FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="John" 
                              {...field} 
                              className="transition-all duration-300 focus:shadow-glow"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Doe" 
                              {...field} 
                              className="transition-all duration-300 focus:shadow-glow"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          Work Email
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="email" 
                            placeholder="john@company.com" 
                            {...field} 
                            className="transition-all duration-300 focus:shadow-glow"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="company"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-muted-foreground" />
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your Company" 
                            {...field} 
                            className="transition-all duration-300 focus:shadow-glow"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-hero hover:opacity-90 transition-all duration-500 hover:scale-105 shadow-glow"
                    size="lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                        Setting Up Your Trial...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        Start Free Trial
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    )}
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    By signing up, you agree to our Terms of Service and Privacy Policy.
                    Cancel anytime during your trial period.
                  </p>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SignupSection;