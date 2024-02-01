'use client';

import { cn } from '@/lib/utils';
import { signIn } from '../_actions';
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Input from '@/components/ui/inputs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { signInSchema } from '@/schemas';
import { buttonVariants } from '@/components/ui/buttons';

const buttonClassName = buttonVariants();

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;

  return <p className="mt-2 text-sm text-red-400">{message}</p>;
};

export default function Form() {
  const [error, setError] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const {
    formState: { errors },
  } = form;

  const onSubmit = (values: z.infer<typeof signInSchema>) => {
    setError('');

    startTransition(async () => {
      const result = await signIn(values);

      if (!result.isSuccess) {
        setError(result.error.message);
        return;
      }

      toast.success(result.message);
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
          <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
          <div className="w-full">
            <div>
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="email"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                {...form.register('email')}
                placeholder="Enter your email address"
                Icon={AtSymbolIcon}
              />
              <ErrorMessage message={errors.email?.message} />
            </div>
            <div className="mt-4">
              <label
                className="mb-3 mt-5 block text-xs font-medium text-gray-900"
                htmlFor="password"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                {...form.register('password')}
                placeholder="Enter password"
                Icon={KeyIcon}
              />
              <ErrorMessage message={errors.password?.message} />
            </div>
          </div>
          {error && (
            <div className="mt-4 flex items-center justify-center">
              <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
              <span className="ml-2 text-sm text-red-400">{error}</span>
            </div>
          )}
          <div className="mt-6">
            <button
              className={cn(buttonClassName, 'w-full')}
              disabled={isPending}
              type="submit"
            >
              Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
            </button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}