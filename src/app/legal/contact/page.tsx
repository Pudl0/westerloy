import ContactCard from '@/components/cards/contact-card';

export default function Contact() {
  return (
    <div className="p-5">
      <div className="flex w-full flex-col items-center">
        <p className="mb-8 mt-3 self-center text-center text-2xl tracking-tight text-gray-800 dark:text-white">
          Ihre Ansprechpartner beim OBV&nbsp;Westerloy
        </p>
        <div className="flex flex-col items-center gap-x-24 gap-y-12 lg:flex-row">
          <ContactCard name='Katja Rottmann' title='Erste Vorsitzende' phoneNumber='04488-8609020' mailAddress='katja.rottmann@westerloy.de'></ContactCard>
          <ContactCard name='Sven Siefken' title='Zweiter Vorsitzender' phoneNumber='04488-123456' mailAddress='sven.siefken@westerloy.de'></ContactCard>
        </div>
      </div>
    </div>
  );
}