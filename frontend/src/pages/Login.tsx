import { AuthButton } from '@/components/AuthButton';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Login = () => {
  return (
    <div className='flex h-[calc(100vh-4rem)] justify-center items-center p-4'>
      <Card className='w-full max-w-2xl h-full flex flex-col'>
        <CardHeader>
          <CardTitle className='text-xl font-semibold'>
            Login to Chat Buddy
          </CardTitle>
        </CardHeader>

        <CardContent className='flex '>
          <AuthButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
