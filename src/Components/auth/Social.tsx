import { useRouter } from 'next/navigation';
import { FcGoogle } from 'react-icons/fc';
import { Button } from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';

export const Social = () => {
    const { data: session } = useSession();


    const handleGoogleSignIn = async () => {
        await signIn('google', {callbackUrl: "http://localhost:3000/user/PrincipalPage"});
    };

    

    return (
        <div className="flex items-center w-full gap-x-2">
            <Button
                size="lg"
                className="w-full bg-transparent border-2"
                onClick={handleGoogleSignIn}
            >
                <FcGoogle className="h-5 w-5" />
            </Button>
        </div>
    );
};
