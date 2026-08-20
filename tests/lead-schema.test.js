import { describe, expect, it } from "vitest";
import { leadSchema, splitLeadData } from "../lib/lead-schema.js";

const common={name:"Alex Morgan",email:"alex@example.com",phone:"",country:"Scotland",preferredContact:"EMAIL",message:"Please contact me",website:"",consent:true,consentVersion:"2026-08-20"};
describe("public lead schema",()=>{
 it("accepts the five supported lead variants",()=>{const variants=[{...common,kind:"ASSESSMENT",goals:["Build strength"],mobilitySupport:"SOME"},{...common,kind:"CARE_HOME",organisation:"Rose House",residentCount:"40",supportTypes:[]},{...common,kind:"WORKPLACE",organisation:"Acme",employeeCount:"80",tierInterest:"PLUS"},{...common,kind:"COMMUNITY",organisation:"Local group",groupSize:"25",sessionTypes:[]},{...common,kind:"GENERAL",subject:"A question"}];for(const variant of variants)expect(leadSchema.safeParse(variant).success).toBe(true)});
 it("requires explicit current-version consent",()=>{expect(leadSchema.safeParse({...common,kind:"GENERAL",subject:"Question",consent:false}).success).toBe(false)});
 it("rejects an assessment without a goal",()=>{expect(leadSchema.safeParse({...common,kind:"ASSESSMENT",goals:[],mobilitySupport:"NONE"}).success).toBe(false)});
 it("separates type-specific details from contact data",()=>{const parsed=leadSchema.parse({...common,kind:"WORKPLACE",organisation:"Acme",employeeCount:"80",tierInterest:"STARTER"});const stored=splitLeadData(parsed);expect(stored.details).toEqual({employeeCount:"80",tierInterest:"STARTER"});expect(stored.consentVersion).toBe("2026-08-20")});
});
