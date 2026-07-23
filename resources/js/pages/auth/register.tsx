import { Head, useForm } from '@inertiajs/react';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        role: 'Customer',
        password: '',
        password_confirmation: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <div className=" flex-col items-center justify-center bg-zinc-950 p-6 text-zinc-100">
            <Head title="Register" />
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl">
                <div className="mb-6 text-center space-y-1">
                    <h1 className="text-2xl font-bold tracking-tight text-white">Create an Account</h1>
                    <p className="text-sm text-zinc-400">Join AutoTech Hub and manage your workshop flow</p>
                </div>

                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name" className="text-zinc-300">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                required
                                autoFocus
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Full name"
                                className="rounded-xl border-zinc-800 bg-zinc-950 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <InputError message={errors.name} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email" className="text-zinc-300">Email address</Label>
                            <Input
                                id="email"
                                type="email"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="email@example.com"
                                className="rounded-xl border-zinc-800 bg-zinc-950 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Forced Role Selection Dropdown */}
                        <div className="grid gap-2">
                            <Label htmlFor="role" className="text-zinc-300">Register As</Label>
                            <select
                                id="role"
                                value={data.role}
                                onChange={(e) => setData('role', e.target.value)}
                                className="flex h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            >
                                <option value="Customer" className="bg-zinc-900 text-white">Customer</option>
                                <option value="Service Advisor" className="bg-zinc-900 text-white">Service Advisor</option>
                                <option value="Mechanic" className="bg-zinc-900 text-white">Mechanic</option>
                            </select>
                            <InputError message={errors.role} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password" className="text-zinc-300">Password</Label>
                            <PasswordInput
                                id="password"
                                required
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Password"
                                passwordrules={passwordRules}
                                className="rounded-xl border-zinc-800 bg-zinc-950 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <InputError message={errors.password} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="password_confirmation" className="text-zinc-300">Confirm password</Label>
                            <PasswordInput
                                id="password_confirmation"
                                required
                                value={data.password_confirmation}
                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                placeholder="Confirm password"
                                passwordrules={passwordRules}
                                className="rounded-xl border-zinc-800 bg-zinc-950 text-white placeholder-zinc-600 focus:border-indigo-500 focus:ring-indigo-500"
                            />
                            <InputError message={errors.password_confirmation} />
                        </div>

                        <Button type="submit" className="mt-2 w-full rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition" disabled={processing}>
                            {processing && <Spinner />}
                            Create account
                        </Button>
                    </div>

                    <div className="text-center text-sm text-zinc-400 mt-2">
                        Already have an account?{' '}
                        <TextLink href="/login" className="text-indigo-400 hover:text-indigo-300 font-medium">Log in</TextLink>
                    </div>
                </form>
            </div>
        </div>
    );
}
