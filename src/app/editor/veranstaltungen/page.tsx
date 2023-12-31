'use client';

import BackToDashboardButton from '@/components/ui/back-to-dashboard-button';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoginButton from '@/components/ui/loginbutton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { ImagePicker } from '@/lib/utils/ImagePicker';
import { cn } from '@/lib/utils/utils';
import { getBase64 } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
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
  timeOfEvent: z.date(),
  location: z
    .string()
    .min(2, {
      message: 'Der Ort muss mindestens 2 Zeichen lang sein.',
    })
    .max(5100, { message: 'Der Ort darf maximal 100 Zeichen lang sein.' }),
  image: z.instanceof(FileList).refine((val) => val.length > 0, 'File is required'),
});

const NeuerEintrag = () => {
  const session = useSession();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      location: '',
    },
  });
  const router = useRouter();

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (typeof window !== 'undefined' && values.image) {
      getBase64(values.image[0]).then((response) => {
        fetch(`/api/evententries`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: values.title,
            description: values.description,
            timeOfEvent: values.timeOfEvent,
            location: values.location,
            pictureString: response,
          }),
        });
      });
    }
    router.push('/eventdashboard');
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
                      <FormDescription>Hier bitte den Titel des Events eintragen</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="timeOfEvent"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Zeitpunkt der Veranstaltung</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-[240px] pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? format(field.value, 'PPP') : <span>Bitte Zeitpunkt auswählen</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Der Zeitpunkt der Veranstaltung</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Beschreibung des Events</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Bitte Beschreibung des Events eingeben..." {...field} />
                      </FormControl>
                      <FormDescription>Hier bitte die Beschreibung des Events eintragen</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Der Ort der Veranstaltung</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Bitte den Ort eingeben..." {...field} />
                      </FormControl>
                      <FormDescription>Hier bitte den Ort der Veranstaltung eintragen</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <ImagePicker name="image" errors={form.formState.errors} control={form.control} />
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        }
      </div>
    );
  } else {
    return <LoginButton />;
  }
};

export default function Veranstaltung() {
  return (
    <SessionProvider>
      <NeuerEintrag />
    </SessionProvider>
  );
}
