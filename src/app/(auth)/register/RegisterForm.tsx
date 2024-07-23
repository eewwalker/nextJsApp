'use client'

import { Button, Card, CardBody, CardHeader, Input } from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterSchema } from "@/lib/schemas/registerSchema";
import { PiHandWavingDuotone } from "react-icons/pi";
import { registerUser } from "@/app/actions/authActions";


const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors, isValid}} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        mode: 'onTouched'
    });

    const onSubmit = async (data:RegisterSchema) => {
        const result = await registerUser(data)
        console.log(result)
    }

    return (
        <Card className="w-2/5 mx-auto">
            <CardHeader className='flex flex-col items-center justify-center'>
                <div className="flex flex-col gap-2 items-center text-neutral-600">
                    <div className="flex flex-col gap-3 items-center">
                        <PiHandWavingDuotone size={30} />
                        <h1 className="text-3xl font-semibold">Register</h1>
                    </div>
                    <p className="text-neutral-500">Welcome to NextMatch</p>
                </div>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="space-y-4">
                    <Input
                            label='Name'
                            variant='bordered'
                            autoComplete="name"
                            {...register('name')}
                            isInvalid={!!errors.name}
                            errorMessage={errors.name?.message as string}
                        />
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
                            fullWidth
                            type="submit"
                            className="bg-slate-500 text-white"
                            isDisabled = {!isValid}
                        >
                                Register
                         </Button>
                    </div>
                </form>
            </CardBody>
        </Card>
    );
};
export default RegisterForm;