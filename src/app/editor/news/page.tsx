'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoginButton from '@/components/ui/loginbutton';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import { ImagePicker } from '@/lib/utils/ImagePicker';
import { getBase64 } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Der Titel muss mindestens 2 Zeichen lang sein.' })
    .max(50, { message: 'Der Titel darf maximal 50 Zeichen lang sein.' }),
  description: z
    .string()
    .min(2, { message: 'Der Text muss mindestens 2 Zeichen lang sein.' })
    .max(5000, { message: 'Der Nachrichtentext darf maximal 5000 Zeichen lang sein.' }),
  shortDescription: z
    .string()
    .min(2, { message: 'Die Kurzbeschreibung muss mindestens 2 Zeichen lang sein.' })
    .max(250, { message: 'Die Kurzbeschreibung darf maximal 250 Zeichen lang sein.' }),
  image: z.custom<FileList>((v) => v instanceof FileList && v.length > 0, {
    message: 'Bitte wählen Sie ein Bild aus.',
  }),
});

const NeuerEintrag = () => {
  const { status } = useSession();
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (typeof window !== 'undefined' && values.image && values.image.length > 0) {
      try {
        const imageBase64 = await getBase64(values.image[0]);
        const response = await fetch(`/api/newsentries`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            shortDescription: values.shortDescription,
            pictureString: imageBase64,
          }),
        });

        if (!response.ok) {
          throw new Error('Fehler beim Erstellen des Eintrags');
        }

        toast({
          title: 'Erfolg!',
          description: 'Der Nachrichtenbeitrag wurde erfolgreich erstellt.',
        });

        router.push('/');
        router.refresh();
      } catch (error) {
        console.error('Error:', error);
        toast({
          title: 'Fehler',
          description: 'Beim Erstellen des Nachrichtenbeitrags ist ein Fehler aufgetreten.',
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
        <CardTitle>Neuen Nachrichtenbeitrag erstellen</CardTitle>
      </CardHeader>
      <CardContent>
        <BackToDashboardButton />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-8">
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
            <FormField
              control={form.control}
              name="image"
              render={({}) => (
                <FormItem>
                  <FormLabel>Bild</FormLabel>
                  <FormControl>
                    <ImagePicker name="image" control={form.control} label="Bild für die Nachricht auswählen" />
                  </FormControl>
                  <FormDescription>Hier bitte ein Bild für die Nachricht auswählen</FormDescription>
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

export default function News() {
  return (
    <SessionProvider>
      <NeuerEintrag />
    </SessionProvider>
  );
}
