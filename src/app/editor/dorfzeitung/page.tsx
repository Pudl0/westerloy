'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import LoginButton from '@/components/ui/loginbutton';
import { toast } from '@/hooks/use-toast';
import { ImagePicker } from '@/lib/utils/ImagePicker';
import { getBase64 } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  pdf: z.custom<FileList>((v) => v instanceof FileList && v.length > 0, {
    message: 'Bitte wählen Sie eine PDF-Datei aus.',
  }),
});

const NeuerEintrag = () => {
  const { status } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pdf: undefined,
    },
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (typeof window !== 'undefined' && values.pdf && values.pdf.length > 0) {
      try {
        const pdfBase64 = await getBase64(values.pdf[0]);
        const response = await fetch(`/api/newspaper`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.pdf[0].name,
            pdfString: pdfBase64,
          }),
        });

        if (!response.ok) {
          throw new Error('Fehler beim Hochladen der Datei');
        }

        toast({
          title: 'Erfolg!',
          description: 'Die Dorfzeitung wurde erfolgreich hochgeladen.',
        });

        router.push('/');
        router.refresh();
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Fehler',
          description: 'Beim Hochladen der Dorfzeitung ist ein Fehler aufgetreten.',
          variant: 'destructive',
        });
      }
    }
  }

  if (status === 'loading') {
    return <div>Laden...</div>;
  }

  if (status === 'unauthenticated') {
    return (
      <Card className="mx-auto mt-8 w-[350px]">
        <CardHeader>
          <CardTitle>Nicht autorisiert</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">Bitte melden Sie sich an, um fortzufahren.</p>
          <LoginButton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-auto my-8 w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Neue Dorfzeitung hochladen</CardTitle>
      </CardHeader>
      <CardContent>
        <BackToDashboardButton />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
            <FormField
              control={form.control}
              name="pdf"
              render={({}) => (
                <FormItem>
                  <FormLabel>PDF-Datei</FormLabel>
                  <FormControl>
                    <ImagePicker name="pdf" control={form.control} label="PDF-Datei für die Dorfzeitung auswählen" />
                  </FormControl>
                  <FormDescription>Hier bitte die PDF-Datei für die Dorfzeitung auswählen</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Absenden</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default function Dorfzeitung() {
  return (
    <SessionProvider>
      <NeuerEintrag />
    </SessionProvider>
  );
}
