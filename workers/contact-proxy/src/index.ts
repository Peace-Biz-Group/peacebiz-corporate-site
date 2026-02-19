interface Env {
  WEB3FORMS_ACCESS_KEY?: string;
  REACT_APP_WEB3FORMS_ACCESS_KEY?: string;
  WEB3_FORMS_ACCESS_KEY?: string;
  ALLOWED_ORIGINS?: string;
}

type ContactPayload = {
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  inquiryType?: string;
  services?: string[];
  message?: string;
  honeypot?: string;
};

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeField = (value: unknown, maxLength: number) => {
  if (typeof value !== 'string') return '';
  return value.replace(/\r\n?/g, '\n').trim().slice(0, maxLength);
};

const sanitizeServiceList = (services: unknown) => {
  if (!Array.isArray(services)) return [] as string[];
  return services
    .filter((item) => typeof item === 'string')
    .map((item) => sanitizeField(item, 64))
    .filter((item) => item.length > 0)
    .slice(0, 20);
};

const normalizeOrigin = (value: string) => value.trim().toLowerCase().replace(/\/+$/, '');

const normalizeAllowedEntry = (entry: string) => {
  const trimmed = normalizeOrigin(entry);
  if (!trimmed) return '';
  if (trimmed.startsWith('*.')) {
    return `*.${trimmed.slice(2)}`;
  }
  if (!trimmed.includes('://')) {
    return trimmed;
  }
  try {
    return new URL(trimmed).origin.toLowerCase();
  } catch {
    return trimmed;
  }
};

const parseAllowedOrigins = (raw: string | undefined) =>
  (raw || '')
    .split(',')
    .map((item) => normalizeAllowedEntry(item))
    .filter(Boolean);

const resolveWeb3FormsAccessKey = (env: Env) =>
  [
    env.WEB3FORMS_ACCESS_KEY,
    env.REACT_APP_WEB3FORMS_ACCESS_KEY,
    env.WEB3_FORMS_ACCESS_KEY,
  ]
    .map((value) => (typeof value === 'string' ? value.trim() : ''))
    .find((value) => value.length > 0) || '';

const buildCandidateOrigins = (origin: string) => {
  const normalized = normalizeOrigin(origin);
  try {
    const url = new URL(normalized);
    const host = url.hostname.toLowerCase();
    const protocol = url.protocol;
    const candidates = new Set<string>([normalized, host]);
    if (host.startsWith('www.')) {
      const noWww = host.slice(4);
      candidates.add(noWww);
      candidates.add(`${protocol}//${noWww}`);
    } else {
      candidates.add(`www.${host}`);
      candidates.add(`${protocol}//www.${host}`);
    }
    return { normalized, host, candidates };
  } catch {
    return { normalized, host: '', candidates: new Set<string>([normalized]) };
  }
};

const isAllowedOrigin = (origin: string | null, allowlist: string[]) => {
  if (!origin) return false;
  if (allowlist.length === 0) return false;

  const { host, candidates } = buildCandidateOrigins(origin);

  return allowlist.some((allowed) => {
    if (allowed.startsWith('*.')) {
      const wildcardBase = allowed.slice(2);
      return host === wildcardBase || host.endsWith(`.${wildcardBase}`);
    }
    return candidates.has(allowed);
  });
};

const buildCorsHeaders = (origin: string, allowCredentials = false) => ({
  'Access-Control-Allow-Origin': origin,
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
  ...(allowCredentials ? { 'Access-Control-Allow-Credentials': 'true' } : {}),
  Vary: 'Origin',
});

const buildCommonHeaders = () => ({
  'Cache-Control': 'no-store',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
});

const json = (body: Record<string, unknown>, status: number, headers: Record<string, string>) =>
  new Response(JSON.stringify(body), { status, headers });

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    const allowlist = parseAllowedOrigins(env.ALLOWED_ORIGINS);
    const origin = request.headers.get('Origin');
    const allowedOrigin = origin && isAllowedOrigin(origin, allowlist) ? normalizeOrigin(origin) : null;
    const web3FormsAccessKey = resolveWeb3FormsAccessKey(env);

    if (request.method === 'GET' && pathname === '/health') {
      return json(
        {
          ok: Boolean(web3FormsAccessKey),
          configured: {
            accessKey: Boolean(web3FormsAccessKey),
            allowlistCount: allowlist.length,
          },
          endpoint: 'contact-proxy',
        },
        web3FormsAccessKey ? 200 : 503,
        {
          ...buildCommonHeaders(),
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type',
          Vary: 'Origin',
        }
      );
    }

    if (request.method === 'OPTIONS') {
      if (!allowedOrigin) {
        return new Response(null, { status: 403 });
      }
      return new Response(null, {
        status: 204,
        headers: {
          ...buildCorsHeaders(allowedOrigin),
          ...buildCommonHeaders(),
        },
      });
    }

    if (request.method !== 'POST') {
      return json(
        { success: false, message: 'Method Not Allowed' },
        405,
        buildCommonHeaders()
      );
    }

    if (!allowedOrigin) {
      return json(
        { success: false, message: 'Forbidden' },
        403,
        {
          ...buildCommonHeaders(),
          ...(origin ? buildCorsHeaders(normalizeOrigin(origin)) : {}),
        }
      );
    }

    if (!web3FormsAccessKey) {
      return json(
        { success: false, message: 'Server Misconfigured' },
        500,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(allowedOrigin),
        }
      );
    }

    let payload: ContactPayload;
    try {
      payload = (await request.json()) as ContactPayload;
    } catch {
      return json(
        { success: false, message: 'Invalid JSON' },
        400,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(allowedOrigin),
        }
      );
    }

    if (sanitizeField(payload.honeypot, 256) !== '') {
      return json(
        { success: true },
        200,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(allowedOrigin),
        }
      );
    }

    const safeName = sanitizeField(payload.name, 100);
    const safeCompany = sanitizeField(payload.company, 120);
    const safeEmail = sanitizeField(payload.email, 254).toLowerCase();
    const safePhone = sanitizeField(payload.phone, 32);
    const safeInquiryType = sanitizeField(payload.inquiryType, 100);
    const safeMessage = sanitizeField(payload.message, 3000);
    const safeServices = sanitizeServiceList(payload.services);

    if (!safeName || !safeEmail || !safeInquiryType || !safeMessage) {
      return json(
        { success: false, message: 'Required fields are missing' },
        400,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(allowedOrigin),
        }
      );
    }

    if (!EMAIL_PATTERN.test(safeEmail)) {
      return json(
        { success: false, message: 'Invalid email' },
        400,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(allowedOrigin),
        }
      );
    }

    const submitData = new FormData();
    submitData.append('access_key', web3FormsAccessKey);
    submitData.append('subject', `【Peace Biz】お問い合わせ: ${safeInquiryType}`);
    submitData.append('name', safeName);
    submitData.append('email', safeEmail);
    if (safeCompany) submitData.append('company', safeCompany);
    if (safePhone) submitData.append('phone', safePhone);
    submitData.append('inquiry_type', safeInquiryType);
    if (safeServices.length > 0) {
      submitData.append('services', safeServices.join(', '));
    }
    submitData.append('message', safeMessage);
    submitData.append('botcheck', '');

    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      body: submitData,
    });

    if (!upstream.ok) {
      return json(
        { success: false, message: 'Provider request failed' },
        502,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(allowedOrigin),
        }
      );
    }

    let upstreamResult: { success?: boolean } = {};
    try {
      upstreamResult = (await upstream.json()) as { success?: boolean };
    } catch {
      // Ignore parse failure and treat as error.
    }

    if (!upstreamResult.success) {
      return json(
        { success: false, message: 'Submission failed' },
        400,
        {
          ...buildCommonHeaders(),
          ...buildCorsHeaders(allowedOrigin),
        }
      );
    }

    return json(
      { success: true },
      200,
      {
        ...buildCommonHeaders(),
        ...buildCorsHeaders(allowedOrigin),
      }
    );
  },
};
