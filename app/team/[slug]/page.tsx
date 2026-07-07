import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, Check } from "lucide-react";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getTeam, getTeamMemberBySlug } from "@/lib/content";
import { COACHES } from "@/lib/site";
import { whatsappLink } from "@/lib/whatsapp";
import { personLd, breadcrumbLd } from "@/lib/seo";
import WhatsAppCTA from "@/components/WhatsAppCTA";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getTeam().map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) return {};
  return {
    title: member.name,
    description: `${member.name} — ${member.role}. חלק מהמטריה המשפחתית.`,
    alternates: { canonical: `/team/${slug}` },
  };
}

export default async function TeamPage({ params }: PageProps) {
  const { slug } = await params;
  const member = getTeamMemberBySlug(slug);
  if (!member) notFound();

  const { content: body } = await compileMDX({
    source: member.content,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });

  const coach = COACHES[member.coachKey];
  const wa = whatsappLink({
    message: `היי ${member.name.split(" ")[0]}, הגעתי דרך האתר ואשמח לשוחח.`,
    service: member.coachKey === "eden" ? "finance" : "couples",
  });

  // The other coach — cross-linked at the bottom of the bio.
  const other = getTeam().find((m) => m.slug !== slug);

  const crumbs = breadcrumbLd([
    { name: "בית", path: "/" },
    { name: member.name, path: `/team/${slug}` },
  ]);

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd(member)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbs) }} />

      <nav className="flex items-center gap-1 text-ink-soft text-sm mb-8">
        <Link href="/" className="hover:text-sage-700">בית</Link>
        <ChevronLeft className="w-4 h-4 rtl:rotate-180" />
        <span className="text-forest-900 font-semibold">{member.name}</span>
      </nav>

      <div className="flex flex-col sm:flex-row items-start gap-6 mb-10">
        {member.photo ? (
          <span className="relative w-24 h-24 rounded-3xl overflow-hidden flex-shrink-0 bg-sage-100">
            <Image
              src={member.photo}
              alt={member.name}
              fill
              sizes="96px"
              className="object-cover"
            />
          </span>
        ) : (
          <span className="w-24 h-24 rounded-3xl bg-sage-100 text-sage-700 flex items-center justify-center text-4xl font-extrabold flex-shrink-0">
            {member.name.charAt(0)}
          </span>
        )}
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-forest-900 mb-1 leading-tight">
            {member.name}
          </h1>
          <p className="text-lg text-ink-soft">{member.role}</p>
          {member.credentials && member.credentials.length > 0 && (
            <ul className="flex flex-wrap gap-2 mt-4">
              {member.credentials.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center gap-1.5 text-sm bg-sand text-forest-900 px-3 py-1 rounded-full font-medium"
                >
                  <Check className="w-3.5 h-3.5 text-sage-600" />
                  {c}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="prose-rtl max-w-prose mb-10">{body}</div>

      {/* Meet the other coach */}
      {other && (
        <div className="mb-10">
          <p className="section-label">הכירו גם את</p>
          <Link
            href={`/team/${other.slug}`}
            className="group flex items-center gap-4 bg-white rounded-[20px] border border-sand shadow-soft hover:shadow-lift transition-all p-5"
          >
            {other.photo ? (
              <span className="relative w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-sage-100">
                <Image
                  src={other.photo}
                  alt={other.name}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </span>
            ) : (
              <span className="w-20 h-20 rounded-2xl bg-sage-100 text-sage-700 flex items-center justify-center text-3xl font-extrabold flex-shrink-0">
                {other.name.charAt(0)}
              </span>
            )}
            <div>
              <h2 className="font-extrabold text-forest-900 group-hover:text-sage-700 transition-colors">
                {other.name}
              </h2>
              <p className="text-ink-soft text-sm leading-snug">{other.role}</p>
              {other.tagline && (
                <p className="mt-1.5 text-sage-700 text-sm font-medium leading-snug">
                  {other.tagline}
                </p>
              )}
            </div>
            <ChevronLeft className="w-5 h-5 text-sage-600 mr-auto group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>
      )}

      <div className="bg-sage-100 rounded-[20px] p-8 text-center">
        <p className="text-forest-900 font-semibold mb-5">
          רוצים לדבר ישירות עם {member.name.split(" ")[0]}?
        </p>
        <WhatsAppCTA href={wa} label={`וואטסאפ עם ${member.name.split(" ")[0]}`} />
      </div>
    </article>
  );
}
