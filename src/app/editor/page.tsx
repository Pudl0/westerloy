'use client';

import { format } from 'date-fns';
import { CalendarPlus, FileText, ImagePlus, Loader2, PenSquare, Upload } from 'lucide-react';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoginButton from '@/components/ui/loginbutton';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { ImagePicker } from '@/lib/utils/ImagePicker';
import { MultipleImagePicker } from '@/lib/utils/MultipleImagePicker';
import { cn, getBase64 } from '@/lib/utils/utils';
import { zodResolver } from '@hookform/resolvers/zod';

const newsFormSchema = z.object({
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

const eventFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Der Titel muss mindestens 2 Zeichen lang sein.' })
    .max(50, { message: 'Der Titel darf maximal 50 Zeichen lang sein.' }),
  description: z
    .string()
    .min(2, { message: 'Der Text muss mindestens 2 Zeichen lang sein.' })
    .max(5000, { message: 'Der Nachrichtentext darf maximal 5000 Zeichen lang sein.' }),
  timeOfEvent: z.date({ required_error: 'Bitte wählen Sie ein Datum aus.' }),
  location: z
    .string()
    .min(2, { message: 'Der Ort muss mindestens 2 Zeichen lang sein.' })
    .max(100, { message: 'Der Ort darf maximal 100 Zeichen lang sein.' }),
  image: z.custom<FileList>((v) => v instanceof FileList && v.length > 0, {
    message: 'Bitte wählen Sie ein Bild aus.',
  }),
});

const newspaperFormSchema = z.object({
  pdf: z.custom<FileList>((v) => v instanceof FileList && v.length > 0 && v[0].type === 'application/pdf', {
    message: 'Bitte wählen Sie eine gültige PDF-Datei aus.',
  }),
});

const recapFormSchema = z.object({
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
  imagelist: z.custom<FileList>((v) => v instanceof FileList && v.length > 0, {
    message: 'Bitte wählen Sie mindestens ein Bild aus.',
  }),
});

function ActionCard({
  onClick,
  title,
  description,
  icon: Icon,
}: {
  onClick: () => void;
  title: string;
  description: string;
  icon: React.ElementType;
}) {
  return (
    <Card className="cursor-pointer transition-all hover:shadow-lg" onClick={onClick}>
      <CardHeader>
        <Icon className="mb-2 h-8 w-8 text-primary" />
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
}

function NewsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof newsFormSchema>>({
    resolver: zodResolver(newsFormSchema),
    defaultValues: { title: '', description: '', shortDescription: '', image: undefined },
  });

  async function onSubmit(values: z.infer<typeof newsFormSchema>) {
    setIsSubmitting(true);
    try {
      const imageBase64 = await getBase64(values.image[0]);
      const response = await fetch(`/api/newsentries`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          shortDescription: values.shortDescription,
          pictureString: imageBase64,
        }),
      });

      if (!response.ok) throw new Error('Fehler beim Erstellen des Eintrags');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            'Absenden'
          )}
        </Button>
      </form>
    </Form>
  );
}

function EventForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: { title: '', description: '', location: '' },
  });

  async function onSubmit(values: z.infer<typeof eventFormSchema>) {
    setIsSubmitting(true);
    try {
      const imageBase64 = await getBase64(values.image[0]);
      const response = await fetch(`/api/evententries`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          timeOfEvent: values.timeOfEvent,
          location: values.location,
          pictureString: imageBase64,
        }),
      });

      if (!response.ok) throw new Error('Fehler beim Erstellen des Events');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
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
                      className={cn('w-[240px] pl-3 text-left font-normal', !field.value && 'text-muted-foreground')}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Bitte Zeitpunkt auswählen</span>}
                      <CalendarPlus className="ml-auto h-4 w-4 opacity-50" />
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
                <Input placeholder="Bitte den Ort eingeben..." {...field} />
              </FormControl>
              <FormDescription>Hier bitte den Ort der Veranstaltung eintragen</FormDescription>
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
                <ImagePicker name="image" control={form.control} label="Bild für das Event auswählen" />
              </FormControl>
              <FormDescription>Hier bitte ein Bild für das Event auswählen</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            'Absenden'
          )}
        </Button>
      </form>
    </Form>
  );
}

function NewspaperForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof newspaperFormSchema>>({
    resolver: zodResolver(newspaperFormSchema),
    defaultValues: { pdf: undefined },
  });

  async function onSubmit(values: z.infer<typeof newspaperFormSchema>) {
    setIsSubmitting(true);
    try {
      const pdfBase64 = await getBase64(values.pdf[0]);
      const response = await fetch(`/api/newspaper`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.pdf[0].name,
          pdfString: pdfBase64,
        }),
      });

      if (!response.ok) throw new Error('Fehler beim Hochladen der Datei');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="pdf"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PDF-Datei</FormLabel>
              <FormControl>
                <div className="flex w-full items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                      <Upload className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400" />
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">Klicken Sie zum Hochladen</span> oder ziehen Sie die Datei hier
                        hin
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 10MB)</p>
                    </div>
                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      accept=".pdf"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                  </label>
                </div>
              </FormControl>
              <FormDescription>Hier bitte die PDF-Datei für die Dorfzeitung auswählen</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird hochgeladen...
            </>
          ) : (
            'Absenden'
          )}
        </Button>
      </form>
    </Form>
  );
}

function RecapForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof recapFormSchema>>({
    resolver: zodResolver(recapFormSchema),
    defaultValues: { title: '', description: '', shortDescription: '', imagelist: undefined },
  });

  async function onSubmit(values: z.infer<typeof recapFormSchema>) {
    setIsSubmitting(true);
    try {
      const promises = Array.from(values.imagelist).map((image) => getBase64(image));
      const responses = await Promise.all(promises);
      const response = await fetch(`/api/recap`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: values.title,
          description: values.description,
          shortDescription: values.shortDescription,
          pictureStrings: responses.map((response) => ({ response })),
        }),
      });

      if (!response.ok) throw new Error('Fehler beim Erstellen des Rückblicks');

      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
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
              <FormDescription>Hier bitte den Titel des Rückblicks eintragen</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="shortDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kurzbeschreibung des Rückblicks</FormLabel>
              <FormControl>
                <Textarea placeholder="Bitte Kurzbeschreibung eingeben..." {...field} />
              </FormControl>
              <FormDescription>Hier bitte die Kurzbeschreibung des Rückblicks eintragen</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text des Rückblicks</FormLabel>
              <FormControl>
                <Textarea placeholder="Bitte Text des Rückblicks eingeben..." {...field} />
              </FormControl>
              <FormDescription>Hier bitte den vollständigen Text des Rückblicks eintragen</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imagelist"
          render={({}) => (
            <FormItem>
              <FormLabel>Bilder</FormLabel>
              <FormControl>
                <MultipleImagePicker name="imagelist" errors={form.formState.errors} control={form.control} />
              </FormControl>
              <FormDescription>Hier bitte die Bilder für den Rückblick auswählen</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Wird gesendet...
            </>
          ) : (
            'Absenden'
          )}
        </Button>
      </form>
    </Form>
  );
}

function HomeContent() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto flex h-screen items-center justify-center px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Willkommen</CardTitle>
            <CardDescription>Bitte melden Sie sich an, um fortzufahren.</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <LoginButton className="w-full" />
          </CardContent>
          <CardFooter className="justify-center">
            <p className="text-sm text-gray-500">Bei Problemen kontaktieren Sie bitte den Administrator.</p>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">Willkommen im Dashboard</CardTitle>
          <CardDescription className="text-lg">
            Angemeldet als {session?.user?.name} ({session?.user?.email})
          </CardDescription>
        </CardHeader>
        <CardContent>
          <h2 className="mb-6 text-2xl font-semibold">Aktionen</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Dialog>
              <DialogTrigger asChild>
                <ActionCard
                  onClick={() => {}}
                  title="Nachrichtenbeitrag"
                  description="Fügen Sie einen neuen Nachrichtenbeitrag hinzu"
                  icon={PenSquare}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Neuen Nachrichtenbeitrag erstellen</DialogTitle>
                  <DialogDescription>
                    Fügen Sie hier die Details für den neuen Nachrichtenbeitrag ein.
                  </DialogDescription>
                </DialogHeader>
                <NewsForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <ActionCard
                  onClick={() => {}}
                  title="Veranstaltung"
                  description="Erstellen Sie eine neue Veranstaltung"
                  icon={CalendarPlus}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Neue Veranstaltung erstellen</DialogTitle>
                  <DialogDescription>Fügen Sie hier die Details für die neue Veranstaltung ein.</DialogDescription>
                </DialogHeader>
                <EventForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <ActionCard
                  onClick={() => {}}
                  title="Dorfzeitung"
                  description="Fügen Sie eine neue Ausgabe der Dorfzeitung hinzu"
                  icon={FileText}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Neue Dorfzeitung hochladen</DialogTitle>
                  <DialogDescription>Laden Sie hier die neue Ausgabe der Dorfzeitung hoch.</DialogDescription>
                </DialogHeader>
                <NewspaperForm />
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <ActionCard
                  onClick={() => {}}
                  title="Rückblick"
                  description="Erstellen Sie einen neuen Rückblick"
                  icon={ImagePlus}
                />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Neuen Rückblick erstellen</DialogTitle>
                  <DialogDescription>Fügen Sie hier die Details für den neuen Rückblick ein.</DialogDescription>
                </DialogHeader>
                <RecapForm />
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-sm text-gray-500">Letzte Anmeldung: {new Date().toLocaleString('de-DE')}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function Home() {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  );
}
