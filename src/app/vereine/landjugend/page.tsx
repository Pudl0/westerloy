import GroupPage from '@/components/group-page';

export default function Landjugend() {
  const content = [
    '"Landjugend Westeroly 3.0" das sind wir, 48 (Stand 03/2023) Mitglieder, zusammengesetzt aus Jugendlichen und jungen Erwachsenen im Alter von 14 bis 30 Jahren. Wir haben uns es auf die Fahne geschrieben den hiesigen Zusammenhalt der Dorfjugend zu stärken. Neben regelmäßigen Treffen und gemeinsamen Unternehmungen wie Kohlfahrten, Grillabende oder die Teilnahme an den Deutschen Landjugendtagen (DLT) unterstützen wir auch Aktionen des Ortsbürgervereins und versuchen uns im Dorfgeschehen mit einzubringen.',
    'Gegründet haben wir uns am 17.04.2015 und bei der Gründungsveranstaltung damals waren bereits schon 25 Personen dabei. Wir sind Teil der NLJ (Niedersächsische Landjugend – Landesgemeinschaft e.V.) und wer sich nun fragt, warum der Name „Landjugend Westerloy 3.0"? Bereits vor uns hat es zwei Landjugendgenerationen in Westerloy gegeben: Mitte bis Ende der 50er Jahre und um die Zeit um 1975. Recht schnell war deshalb auch ein Name gefunden: „Landjugend Westerloy 3.0"!',
    'Willst du mehr über uns erfahren? Dann folge uns bei Facebook und Instagram.',
  ];

  return (
    <GroupPage
      title="Landjugend 3.0"
      imageSrc="/Landjugend.jpg"
      content={content}
      facebookUrl="https://www.facebook.com/LJWesterloy"
      instagramUrl="https://www.instagram.com/landjugendwesterloy3.0/"
    />
  );
}
