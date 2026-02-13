import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов." }),
  email: z.string().email({ message: "Некорректный email адрес." }),
  message: z.string().min(10, { message: "Сообщение должно содержать не менее 10 символов." }),
});

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CREDENTIALS_BASE64 = process.env.GOOGLE_CREDENTIALS_BASE64;

type GoogleCredentials = {
  client_email: string;
  private_key: string;
};

function getUserFriendlyGoogleError(error: unknown): string {
  const responseStatus =
    typeof (error as { response?: { status?: unknown } })?.response?.status === "number"
      ? ((error as { response: { status: number } }).response.status as number)
      : undefined;
  const errorMessage = error instanceof Error ? error.message : "Неизвестная ошибка";

  if (responseStatus === 403) {
    return "Нет доступа к Google Sheets. Проверьте, что таблица расшарена на сервисный аккаунт.";
  }

  if (responseStatus === 404) {
    return "Google таблица не найдена. Проверьте GOOGLE_SHEET_ID.";
  }

  if (errorMessage.includes("invalid_grant")) {
    return "Ошибка авторизации Google API. Проверьте ключ сервисного аккаунта и системное время сервера.";
  }

  if (errorMessage.includes("DECODER routines")) {
    return "Некорректный private_key в GOOGLE_CREDENTIALS_BASE64.";
  }

  return `Ошибка Google Sheets API: ${errorMessage}`;
}

function parseGoogleCredentials(encodedCredentials: string): GoogleCredentials {
  const decoded = Buffer.from(encodedCredentials, "base64").toString("utf-8");
  const parsed = JSON.parse(decoded) as Partial<GoogleCredentials>;

  if (!parsed.client_email || !parsed.private_key) {
    throw new Error("В кредах отсутствуют client_email или private_key");
  }

  return {
    client_email: parsed.client_email,
    private_key: parsed.private_key,
  };
}

export async function POST(req: NextRequest) {
  if (!SHEET_ID || !GOOGLE_CREDENTIALS_BASE64) {
    return NextResponse.json(
      {
        success: false,
        error: "Ошибка конфигурации сервера: не заданы GOOGLE_SHEET_ID или GOOGLE_CREDENTIALS_BASE64.",
      },
      { status: 500 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Некорректный JSON в запросе." },
      { status: 400 }
    );
  }

  const validation = contactSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Пожалуйста, исправьте ошибки в форме.",
        details: validation.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  const { name, email, message } = validation.data;

  try {
    const credentials = parseGoogleCredentials(GOOGLE_CREDENTIALS_BASE64);
    const auth = new google.auth.JWT(
      credentials.client_email,
      undefined,
      credentials.private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        values: [[`${day}.${month}.${year}`, name, email, message]],
      },
    });

    return NextResponse.json({
      success: true,
      message: "Сообщение успешно отправлено!",
    });
  } catch (error) {
    const userMessage = getUserFriendlyGoogleError(error);
    console.error("Ошибка отправки формы в Google Sheets:", error);

    return NextResponse.json(
      {
        success: false,
        error: userMessage,
      },
      { status: 500 }
    );
  }
}
