'use client';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoginButton from '@/components/ui/loginbutton';
import { Textarea } from '@/components/ui/textarea';
import { ImagePicker } from '@/lib/utils/ImagePicker';
import { getBase64 } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const formSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Der Titel muss mindestens 2 Zeichen lang sein.',
    })
    .max(50, {
      message: 'Der Titel darf maximal 50 Zeichen lang sein.',
    }),
  description: z
    .string()
    .min(2, {
      message: 'Der Text muss mindestens 2 Zeichen lang sein.',
    })
    .max(5000, { message: 'Der Nachrichtentext darf maximal 5000 Zeichen lang sein.' }),
  shortDescription: z
    .string()
    .min(2, {
      message: 'Die Kurzbeschreibung muss mindestens 2 Zeichen lang sein.',
    })
    .max(250, { message: 'Die Kurzbeschreibung darf maximal 250 Zeichen lang sein.' }),
  image: z.instanceof(FileList).refine((val) => val.length > 0, 'File is required'),
});

export const NeuerEintrag = () => {
  // 1. Define your form.
  const session = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      shortDescription: '',
      image: undefined,
    },
  });
  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (typeof window !== 'undefined' && values.image) {
      getBase64(values.image[0]).then((response) => {
        fetch(`/api/newsentries`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            shortDescription: values.shortDescription,
            pictureString: response,
          }),
        });
      });
    }
    router.push('/');
  }
  if (session.status === 'authenticated') {
    return (
      <div className="my-12 flex min-h-screen flex-col items-center gap-y-12">
        <BackToDashboardButton></BackToDashboardButton>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Titel</FormLabel>
                  <FormControl>
                    <Input placeholder="Bitte Titel eingeben..." {...field} />
                  </FormControl>
                  <FormDescription>Hier bitte den Titel der Nachricht eintragen</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kurzbeschreibung der Nachricht</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Bitte Kurzbeschreibung eingeben..." {...field} />
                  </FormControl>
                  <FormDescription>Hier bitte die Kurzbeschreibung der Nachricht eintragen</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Text der Nachricht</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Bitte Nachrichtentext eingeben..." {...field} />
                  </FormControl>
                  <FormDescription>Hier bitte den Text der Nachricht eintragen</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <ImagePicker name="image" errors={form.formState.errors} control={form.control} />
            <Button type="submit">Absenden</Button>
          </form>
        </Form>
      </div>
    );
  } else {
    return <LoginButton />;
  }
};

export default function News() {
  return (
    <SessionProvider>
      <NeuerEintrag />
    </SessionProvider>
  );
}
