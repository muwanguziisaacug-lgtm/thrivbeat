import { describe, expect, it } from "vitest";
import sitemap from "../app/sitemap.js";
import robots from "../app/robots.js";
import nextConfig from "../next.config.mjs";
import { resources } from "../lib/resources.js";

describe("public SEO configuration",()=>{
 it("uses the canonical origin and includes all approved public routes",()=>{const urls=sitemap().map(x=>x.url);expect(urls).toContain("https://www.thrivbeats.com/exercise");expect(urls).toContain("https://www.thrivbeats.com/workplace-wellbeing");expect(urls.some(x=>x.endsWith("/exercises"))).toBe(false)});
 it("keeps private and API routes out of crawling",()=>{const result=robots();expect(result.sitemap).toBe("https://www.thrivbeats.com/sitemap.xml");expect(result.rules.disallow).toContain("/admin/");expect(result.rules.disallow).toContain("/api/")});
 it("permanently redirects the legacy exercise URL",async()=>{const redirects=await nextConfig.redirects();expect(redirects).toContainEqual({source:"/exercises",destination:"/exercise",permanent:true})});
 it("defines four uniquely titled, referenced health guides",()=>{expect(resources).toHaveLength(4);expect(new Set(resources.map(x=>x.title)).size).toBe(4);for(const resource of resources){expect(resource.refs.length).toBeGreaterThan(0);expect(resource.sections.length).toBeGreaterThanOrEqual(3)}});
});
