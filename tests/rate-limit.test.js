import { beforeEach, describe, expect, it } from "vitest";
import { clearLeadRateLimits, consumeLeadRateLimit } from "../lib/rate-limit.js";

describe("lead rate limiting",()=>{
 beforeEach(()=>clearLeadRateLimits());
 it("allows five requests and rejects the sixth in a window",()=>{for(let i=0;i<5;i++)expect(consumeLeadRateLimit("1.2.3.4",1000+i)).toBe(true);expect(consumeLeadRateLimit("1.2.3.4",1006)).toBe(false)});
 it("allows requests again after the window expires",()=>{expect(consumeLeadRateLimit("1.2.3.4",0,1,100)).toBe(true);expect(consumeLeadRateLimit("1.2.3.4",50,1,100)).toBe(false);expect(consumeLeadRateLimit("1.2.3.4",101,1,100)).toBe(true)});
});
