'use client'
import { loginSchema, LoginSchema } from "@/lib/schemas/loginSchema";
import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInUser } from "@/app/actions/authActions";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";


const LoginForm = () => {
    const router = useRouter();
    const {register, handleSubmit, formState: {errors, isValid, isSubmitting}} = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data:LoginSchema) => {
        const resp = await signInUser(data);
        if (resp.status === 'success') {
            router.push('/members');
            router.refresh();
        }else {
            toast.error(resp.error as string)
        }
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className="flex flex-col gap-2 items-center text-neutral-600">
                    <div className="flex flex-col gap-3 items-center">
                        <GiPadlock size={30} />
                        <h1 className="text-3xl font-semibold">Login</h1>
                    </div>
                    <p className="text-neutral-500">Welcome back to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                        <Input
                            label='Email'
                            variant='bordered'
                            autoComplete="email"
                            {...register('email')}
                            isInvalid={!!errors.email}
                            errorMessage={errors.email?.message as string}
                        />
                        <Input
                            label='Password'
                            variant='bordered'
                            type="password"
                            autoComplete="current-password"
                            {...register('password')}
                            isInvalid={!!errors.password}
                            errorMessage={errors.password?.message as string}
                         />
                         <Button
                            isLoading={isSubmitting}
                            fullWidth
                            type="submit"
                            className="bg-slate-500 text-white"
                            isDisabled = {!isValid}
                        >
                                Login
                         </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};
export default LoginForm;