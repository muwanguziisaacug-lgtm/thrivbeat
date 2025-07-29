import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import LoginForm from "./_components/LoginForm";

const Login = async () => {
  const headersList = await headers();
  const cookie = headersList.get('cookie');

  const session = await auth.api.getSession({
    headers: { cookie }
  });

  if (session) {
    return redirect('/');
  }

  return <LoginForm />;
};

export default Login;
