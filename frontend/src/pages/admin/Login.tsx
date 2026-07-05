import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <Card className="w-full max-w-md border-slate-200 shadow-sm">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-semibold text-slate-900">Admin Login</CardTitle>
          <CardDescription className="text-sm text-slate-500">
            Sign in to the internal content management workspace.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="name@techvistar.com" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="Enter password" />
          </div>
          <Button className="w-full">Continue</Button>
          <p className="text-center text-sm text-slate-500">
            Authentication is not implemented yet.
          </p>
          <div className="pt-2 text-center">
            <Link to="/admin/dashboard" className="text-sm font-medium text-slate-700 hover:text-slate-900">
              Go to dashboard preview
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
