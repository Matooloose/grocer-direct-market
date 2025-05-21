
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Brackets, ArrowLeft } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';

// Form validation schema
const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form definition
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // Form submission handler
  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    
    try {
      // Mock successful login for now
      console.log('Login with:', data);
      
      // Show success toast
      toast({
        title: "Login Successful",
        description: "Welcome back! You've been logged in.",
      });
      
      // Redirect to homepage after login
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      
      // Show error toast
      toast({
        title: "Login Failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <PageLayout>
      <div className="flex flex-col items-center justify-center px-4 py-12 md:py-24">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center justify-center mb-6">
              <div className="flex items-center">
                <Brackets className="h-8 w-8 text-market-primary mr-1" />
                <span className="text-market-dark text-2xl font-bold font-poppins">farmers</span>
                <span className="text-market-primary text-2xl font-bold font-poppins">bracket</span>
              </div>
              <div className="flex items-center ml-2 text-xs text-market-brown">
                <ArrowLeft className="h-3 w-3 mr-1" />
                <span>shop left</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Welcome back</h1>
            <p className="mt-2 text-gray-600">
              Sign in to continue to your account
            </p>
          </div>

          <div className="mt-8 bg-white p-8 shadow-md rounded-lg border">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="you@example.com"
                          type="email"
                          autoComplete="email"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input
                            placeholder="••••••••"
                            type={showPassword ? 'text' : 'password'}
                            autoComplete="current-password"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <button
                          type="button"
                          onClick={togglePasswordVisibility}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" aria-hidden="true" />
                          ) : (
                            <Eye className="h-5 w-5" aria-hidden="true" />
                          )}
                          <span className="sr-only">
                            {showPassword ? 'Hide password' : 'Show password'}
                          </span>
                        </button>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <Link
                      to="/forgot-password"
                      className="text-market-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-market-primary hover:bg-market-primary/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Button>
              </form>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="text-market-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default LoginPage;
