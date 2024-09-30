import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { FORM_VALIDATION } from '@/components/calender/constants';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  title: z.string().min(FORM_VALIDATION.TITLE_MIN_LENGTH, {
    message: `Titel muss mindestens ${FORM_VALIDATION.TITLE_MIN_LENGTH} Zeichen lang sein.`,
  }),
  date: z.date({
    required_error: 'Ein Datum ist erforderlich.',
  }),
  isAvailable: z.boolean().default(true),
  details: z.string().min(FORM_VALIDATION.DETAILS_MIN_LENGTH, {
    message: `Details müssen mindestens ${FORM_VALIDATION.DETAILS_MIN_LENGTH} Zeichen lang sein.`,
  }),
});

interface EventFormProps {
  onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
  initialDate?: Date;
}

export function EventForm({ onSubmit, initialDate }: EventFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      date: initialDate || new Date(),
      isAvailable: true,
      details: '',
    },
  });

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
                <Input placeholder="Titel des Eintrags" {...field} />
              </FormControl>
              <FormDescription>Geben Sie einen Titel für den Kalendereintrag ein.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Datum</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={`w-[240px] pl-3 text-left font-normal ${!field.value && 'text-muted-foreground'}`}
                    >
                      {field.value ? format(field.value, 'PPP') : <span>Datum auswählen</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Wählen Sie das Datum für den Kalendereintrag.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isAvailable"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Verfügbar</FormLabel>
                <FormDescription>Ist dieser Termin verfügbar?</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="details"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Details</FormLabel>
              <FormControl>
                <Textarea placeholder="Geben Sie hier weitere Details ein..." className="resize-none" {...field} />
              </FormControl>
              <FormDescription>Fügen Sie zusätzliche Informationen zum Kalendereintrag hinzu.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Kalendereintrag erstellen</Button>
      </form>
    </Form>
  );
}
