import { Hammer, Code2, Stethoscope, Scale, Umbrella, type LucideIcon } from "lucide-react";

const STATIONS: { icon: LucideIcon; title: string; text: string; accent: string }[] = [
  {
    icon: Hammer,
    title: "בנאי",
    text: "הכול התחיל בעבודת כפיים, בבנייה. שם למדנו את השיעור הראשון: שום דבר לא מחזיק בלי יסודות. בית — כמו משפחה — עומד או נופל על הבסיס שעליו בנו אותו.",
    accent: "bg-veil text-ink",
  },
  {
    icon: Code2,
    title: "מתכנת",
    text: "אחר כך הגיע עולם התוכנה. למדנו לחשוב במערכות: איך לוקחים כאוס והופכים אותו להיגיון מסודר שעובד שוב ושוב. זו בדיוק הגישה שאנחנו מביאים — לא טיפים נקודתיים, אלא מערכת שלמה.",
    accent: "bg-ember-50 text-ember-700",
  },
  {
    icon: Stethoscope,
    title: "רופא",
    text: "בעולם הרפואה למדנו לחפש את השורש. חום הוא לא המחלה — הוא סימפטום. רוב הקשיים במשפחה עובדים בדיוק כך: מטפלים בתסמין, והשורש נשאר ומחזיר את הבעיה.",
    accent: "bg-champagne-100 text-champagne-600",
  },
  {
    icon: Scale,
    title: "עורך דין",
    text: "כעורכי דין למדנו להקשיב לשני הצדדים, לנהל קונפליקט, ולהגיע להסכמות שמחזיקות. בכל זוגיות ובכל משפחה יש יותר מנקודת מבט אחת — והמפתח הוא לגשר, לא לנצח.",
    accent: "bg-ember-50 text-ember-700",
  },
  {
    icon: Umbrella,
    title: "ועכשיו — המטריה המשפחתית",
    text: "כל התחנות האלה התחברו למקום אחד: יסודות איתנים, חשיבה מערכתית, טיפול בשורש וגישור בין צדדים. זה בדיוק מה שאנחנו מביאים לכל משפחה שנכנסת מתחת למטריה.",
    accent: "bg-ember-600 text-white",
  },
];

export default function JourneyStations() {
  return (
    <ol className="not-prose relative space-y-5 my-8">
      {STATIONS.map((s, i) => {
        const Icon = s.icon;
        const last = i === STATIONS.length - 1;
        return (
          <li key={s.title} className="flex gap-4">
            <div className="flex flex-col items-center flex-shrink-0">
              <span
                className={`w-12 h-12 rounded-[10px] flex items-center justify-center ${s.accent}`}
              >
                <Icon className="w-6 h-6" strokeWidth={1.5} aria-hidden="true" />
              </span>
              {!last && <span className="w-px flex-1 bg-line mt-1" aria-hidden="true" />}
            </div>
            <div className={`pb-2 ${last ? "" : "pt-1"}`}>
              <h3 className="text-lg font-bold text-ink mb-1">
                {s.title}
              </h3>
              <p className="text-mauve leading-relaxed">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
