import 'server-only';

import { Resend } from 'resend';

// A placeholder keeps public pages buildable when mail is intentionally not
// configured in a local or preview environment. Delivery routes still fail
// safely until a real production key is supplied.
export const resend = new Resend(process.env.RESEND_API_KEY || "re_not_configured")
