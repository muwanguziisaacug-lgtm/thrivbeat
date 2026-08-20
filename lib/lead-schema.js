import { z } from "zod";

const optionalText = z.string().trim().max(500).optional().or(z.literal(""));
const common = {
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(100).optional().or(z.literal("")),
  organisation: z.string().trim().max(160).optional().or(z.literal("")),
  location: z.string().trim().max(160).optional().or(z.literal("")),
  preferredContact: z.enum(["EMAIL", "PHONE", "VIDEO_CALL"]).optional(),
  message: optionalText,
  website: z.string().max(0).optional().or(z.literal("")),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  consentVersion: z.literal("2026-08-20"),
};

export const leadSchema = z.discriminatedUnion("kind", [
  z.object({ ...common, kind: z.literal("ASSESSMENT"), goals: z.array(z.string().max(80)).min(1), mobilitySupport: z.enum(["NONE", "SOME", "REGULAR", "UNSURE"]) }),
  z.object({ ...common, kind: z.literal("CARE_HOME"), residentCount: optionalText, supportTypes: z.array(z.string().max(80)).default([]) }),
  z.object({ ...common, kind: z.literal("WORKPLACE"), employeeCount: optionalText, tierInterest: z.enum(["STARTER", "PLUS", "PREMIUM", "UNSURE"]).optional() }),
  z.object({ ...common, kind: z.literal("COMMUNITY"), groupSize: optionalText, sessionTypes: z.array(z.string().max(80)).default([]) }),
  z.object({ ...common, kind: z.literal("GENERAL"), subject: z.string().trim().min(2).max(160) }),
]);

export function splitLeadData(data) {
  const { kind, name, email, phone, country, organisation, location, preferredContact, message, consentVersion, website, consent, ...details } = data;
  return { kind, name, email, phone: phone || null, country: country || null, organisation: organisation || null, location: location || null, preferredContact: preferredContact || null, message: message || null, consentVersion, consentedAt: new Date(), details };
}
