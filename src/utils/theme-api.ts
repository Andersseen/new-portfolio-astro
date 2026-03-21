export type ThemeMode = "light" | "dark";
export type ThemeHarmony =
  | "analogous"
  | "complementary"
  | "split-complementary"
  | "triadic";

export interface ThemeRequestParams {
  mode?: ThemeMode;
  seed?: string | number;
  baseHue?: number;
  harmony?: ThemeHarmony;
}

export interface ThemeCreatePayload {
  mode: ThemeMode;
  seed?: string | number;
  baseHue?: number;
  harmony?: ThemeHarmony;
}

export interface ThemeScale {
  "50": string;
  "100": string;
  "200": string;
  "300": string;
  "400": string;
  "500": string;
  "600": string;
  "700": string;
  "800": string;
  "900": string;
  "950": string;
  DEFAULT: string;
  foreground: string;
}

export interface ThemeApiTheme {
  bg: string;
  fg: string;
  primary: ThemeScale;
  secondary: ThemeScale;
}

export interface ThemeApiMeta {
  mode: ThemeMode;
  baseHue: number;
  secondaryHue: number;
  harmony: ThemeHarmony;
  seeded: boolean;
}

export interface ThemeApiSuccessResponse {
  ok: true;
  theme: ThemeApiTheme;
  meta: ThemeApiMeta;
}

interface ThemeApiErrorBody {
  ok?: false;
  error?: string;
  message?: string;
}

export class ThemeApiError extends Error {
  status?: number;
  isConfigError: boolean;
  isNetworkError: boolean;

  constructor(
    message: string,
    options: {
      status?: number;
      isConfigError?: boolean;
      isNetworkError?: boolean;
    } = {},
  ) {
    super(message);
    this.name = "ThemeApiError";
    this.status = options.status;
    this.isConfigError = options.isConfigError ?? false;
    this.isNetworkError = options.isNetworkError ?? false;
  }
}

const DEFAULT_TIMEOUT_MS = 9000;
const THEME_PROXY_PATH = "/api/theme";

function buildUrl(params?: ThemeRequestParams): string {
  const origin =
    typeof window !== "undefined" ? window.location.origin : "http://localhost";
  const url = new URL(THEME_PROXY_PATH, origin);

  if (!params) {
    return url.toString();
  }

  if (params.mode) {
    url.searchParams.set("mode", params.mode);
  }

  if (params.seed !== undefined) {
    url.searchParams.set("seed", String(params.seed));
  }

  if (params.baseHue !== undefined) {
    url.searchParams.set("baseHue", String(params.baseHue));
  }

  if (params.harmony) {
    url.searchParams.set("harmony", params.harmony);
  }

  return url.toString();
}

function isThemeApiSuccessResponse(
  value: unknown,
): value is ThemeApiSuccessResponse {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<ThemeApiSuccessResponse>;
  return (
    candidate.ok === true &&
    typeof candidate.theme?.bg === "string" &&
    typeof candidate.theme?.fg === "string" &&
    typeof candidate.theme?.primary?.DEFAULT === "string" &&
    typeof candidate.theme?.secondary?.DEFAULT === "string" &&
    typeof candidate.meta?.mode === "string"
  );
}

function withTimeout(timeoutMs: number): AbortSignal {
  const controller = new AbortController();
  setTimeout(() => controller.abort(), timeoutMs);
  return controller.signal;
}

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const body = (await response.json()) as ThemeApiErrorBody;
    return body.error || body.message || `Theme API error (${response.status})`;
  } catch {
    return `Theme API error (${response.status})`;
  }
}

async function requestTheme(
  method: "GET" | "POST",
  options: {
    params?: ThemeRequestParams;
    payload?: ThemeCreatePayload;
    timeoutMs?: number;
  } = {},
): Promise<ThemeApiSuccessResponse> {
  const timeoutMs = options.timeoutMs ?? DEFAULT_TIMEOUT_MS;

  try {
    const init: RequestInit = {
      method,
      signal: withTimeout(timeoutMs),
    };

    if (method === "POST") {
      init.headers = {
        "Content-Type": "application/json",
      };
      init.body = JSON.stringify(options.payload ?? {});
    }

    const response = await fetch(buildUrl(options.params), {
      ...init,
    });

    if (!response.ok) {
      throw new ThemeApiError(await parseErrorMessage(response), {
        status: response.status,
      });
    }

    const parsed = (await response.json()) as unknown;

    if (!isThemeApiSuccessResponse(parsed)) {
      throw new ThemeApiError("Theme API returned an invalid response shape.");
    }

    return parsed;
  } catch (error) {
    if (error instanceof ThemeApiError) {
      throw error;
    }

    if (error instanceof DOMException && error.name === "AbortError") {
      throw new ThemeApiError("Theme API request timed out.", {
        isNetworkError: true,
      });
    }

    throw new ThemeApiError("Could not reach Theme API.", {
      isNetworkError: true,
    });
  }
}

export function getTheme(
  params: ThemeRequestParams,
): Promise<ThemeApiSuccessResponse> {
  return requestTheme("GET", { params });
}

export function createTheme(
  payload: ThemeCreatePayload,
): Promise<ThemeApiSuccessResponse> {
  return requestTheme("POST", { payload });
}
