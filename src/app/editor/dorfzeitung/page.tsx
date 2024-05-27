'use client';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import LoginButton from '@/components/ui/loginbutton';
import { ImagePicker } from '@/lib/utils/ImagePicker';
import { getBase64 } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  pdf: z.custom<FileList>((v) => v instanceof FileList),
});

const NeuerEintrag = () => {
  // 1. Define your form.
  const session = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pdf: undefined,
    },
  });
  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (typeof window !== 'undefined' && values.pdf) {
      getBase64(values.pdf[0]).then((response) => {
        fetch(`/api/newspaper`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.pdf[0].name,
            pdfString: response,
          }),
        });
      });
    }
    router.push('/');
    router.refresh();
  }
  if (session.status === 'authenticated') {
    return (
      <div className="my-12 flex min-h-screen flex-col items-center gap-y-12">
        <BackToDashboardButton></BackToDashboardButton>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <ImagePicker name="pdf" errors={form.formState.errors} control={form.control} />
            <Button type="submit">Absenden</Button>
          </form>
        </Form>
      </div>
    );
  } else {
    return <LoginButton />;
  }
};

export default function Dorfzeitung() {
  return (
    <SessionProvider>
      <NeuerEintrag />
    </SessionProvider>
  );
}
