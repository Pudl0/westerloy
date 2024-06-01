'use client';

import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoginButton from '@/components/ui/loginbutton';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';

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
});

const EintragBearbeiten = ({
  params,
}: {
  params: { newsentryid: number; title: string; description: string; shortDescription: string };
}) => {
  const session = useSession();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: params.title,
      description: params.description,
      shortDescription: params.shortDescription,
    },
  });
  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    fetch(`/api/newsentries`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        newid: params.newsentryid,
        newtitle: values.title,
        newdescription: values.description,
        newshortdescription: values.shortDescription,
      }),
    });
    router.push('/');
    router.refresh();
  }
  function onDeleteSubmit() {
    fetch(`/api/newsentries/delete`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: params.newsentryid,
      }),
    });
    router.push('/');
    router.refresh();
  }
  if (session.status === 'authenticated') {
    return (
      <div>
        {
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschreibung der Nachricht</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Bitte Beschreibung der Nachricht eingeben..." {...field} />
                      </FormControl>
                      <FormDescription>Hier bitte die Beschreibung der Nachricht eintragen</FormDescription>
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
                        <Textarea placeholder="Bitte Kurzbeschreibung einfügen.." {...field} />
                      </FormControl>
                      <FormDescription>Hier bitte die Kurzbeschreibung eintragen</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        }
        <Button onClick={() => onDeleteSubmit()}>Eintrag entfernen</Button>
      </div>
    );
  } else {
    return <LoginButton />;
  }
};

export default function Neuigkeit({
  params,
}: {
  params: { newsentryid: number; title: string; description: string; shortDescription: string };
}) {
  return (
    <SessionProvider>
      <EintragBearbeiten params={params} />
    </SessionProvider>
  );
}
