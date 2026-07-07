import { Hammer, Code2, Stethoscope, Scale, Umbrella, type LucideIcon } from "lucide-react";

const STATIONS: { icon: LucideIcon; title: string; text: string; accent: string }[] = [
  {
    icon: Hammer,
    title: "בנאי",
    text: "הכול התחיל בעבודת כפיים, בבנייה. שם למדנו את השיעור הראשון: שום דבר לא מחזיק בלי יסודות. בית — כמו משפחה — עומד או נופל על הבסיס שעליו בנו אותו.",
    accent: "bg-sand text-forest-900",
  },
  {
    icon: Code2,
    title: "מתכנת",
    text: "אחר כך הגיע עולם התוכנה. למדנו לחשוב במערכות: איך לוקחים כאוס והופכים אותו להיגיון מסודר שעובד שוב ושוב. זו בדיוק הגישה שאנחנו מביאים — לא טיפים נקודתיים, אלא מערכת שלמה.",
    accent: "bg-sage-100 text-sage-700",
  },
  {
    icon: Stethoscope,
    title: "רופא",
    text: "בעולם הרפואה למדנו לחפש את השורש. חום הוא לא המחלה — הוא סימפטום. רוב הקשיים במשפחה עובדים בדיוק כך: מטפלים בתסמין, והשורש נשאר ומחזיר את הבעיה.",
    accent: "bg-terracotta-100 text-terracotta-500",
  },
  {
    icon: Scale,
    title: "עורך דין",
    text: "כעורכי דין למדנו להקשיב לשני הצדדים, לנהל קונפליקט, ולהגיע להסכמות שמחזיקות. בכל זוגיות ובכל משפחה יש יותר מנקודת מבט אחת — והמפתח הוא לגשר, לא לנצח.",
    accent: "bg-sage-100 text-sage-700",
  },
  {
    icon: Umbrella,
    title: "ועכשיו — המטריה המשפחתית",
    text: "כל התחנות האלה התחברו למקום אחד: יסודות איתנים, חשיבה מערכתית, טיפול בשורש וגישור בין צדדים. זה בדיוק מה שאנחנו מביאים לכל משפחה שנכנסת מתחת למטריה.",
    accent: "bg-sage-600 text-white",
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
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${s.accent}`}
              >
                <Icon className="w-6 h-6" aria-hidden="true" />
              </span>
              {!last && <span className="w-0.5 flex-1 bg-sand mt-1" aria-hidden="true" />}
            </div>
            <div className={`pb-2 ${last ? "" : "pt-1"}`}>
              <h3 className="text-lg font-extrabold text-forest-900 mb-1">
                {s.title}
              </h3>
              <p className="text-ink-soft leading-relaxed">{s.text}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
