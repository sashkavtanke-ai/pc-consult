// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import { z } from "zod";

// Схема валидации Zod остаётся прежней
const contactSchema = z.object({
  name: z.string().min(2, { message: "Имя должно содержать не менее 2 символов." }),
  email: z.string().email({ message: "Некорректный email адрес." }),
  message: z.string().min(10, { message: "Сообщение должно содержать не менее 10 символов." }),
});

// Получаем переменные окружения
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CREDENTIALS_BASE64 = process.env.GOOGLE_CREDENTIALS_BASE64;

export async function POST(req: NextRequest) {
  console.log("Получен новый запрос на /api/contact");

  // 1. Проверяем наличие ключевых переменных
  if (!SHEET_ID || !GOOGLE_CREDENTIALS_BASE64) {
    console.error("Ошибка: GOOGLE_SHEET_ID или GOOGLE_CREDENTIALS_BASE64 не установлены.");
    return NextResponse.json(
      { success: false, error: "Ошибка конфигурации сервера. Обратитесь к администратору." },
      { status: 500 }
    );
  }

  try {
    // 2. Декодируем и парсим Base64 креды
    console.log("Декодирование Base64 кредов...");
    const credentialsJson = Buffer.from(GOOGLE_CREDENTIALS_BASE64, 'base64').toString('utf-8');
    const credentials = JSON.parse(credentialsJson);
    const { client_email, private_key } = credentials;

    if (!client_email || !private_key) {
        console.error("Ошибка: client_email или private_key отсутствуют в JSON-кредах.");
        return NextResponse.json({ success: false, error: "Некорректные креды Google API." }, { status: 500 });
    }
    console.log("Креды успешно раскодированы и распарсены.");

    const body = await req.json();
    console.log("Тело запроса (body):", body);

    // 3. Валидация входящих данных
    const validation = contactSchema.safeParse(body);
    if (!validation.success) {
      console.error("Ошибка валидации Zod:", validation.error.flatten());
      return NextResponse.json(
        { 
          success: false, 
          error: "Пожалуйста, исправьте ошибки в форме.", // Более общее сообщение
          details: validation.error.flatten().fieldErrors // Отдаём только ошибки полей
        },
        { status: 400 }
      );
    }
    
    const { name, email, message } = validation.data;
    console.log("Данные прошли валидацию.");

    // 4. Авторизация и работа с Google Sheets API
    console.log("Попытка авторизации в Google API...");
    const auth = new google.auth.JWT(
      client_email,
      undefined,
      private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );
    const sheets = google.sheets({ version: "v4", auth });
    console.log("Авторизация успешна. Попытка записи в таблицу...");

    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Месяцы начинаются с 0
    const day = now.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`; // ISO YYYY-MM-DD

    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: "A1",
      valueInputOption: "USER_ENTERED",
      insertDataOption: "INSERT_ROWS",
      requestBody: {
        // Дата в формате, который виден в UI таблицы (ДД.ММ.ГГГГ)
        values: [[
          `${day}.${month}.${year}`,
          name,
          email,
          message
        ]],
      },
    });
    console.log("Данные успешно записаны в Google Sheets.");

    return NextResponse.json({ success: true, message: "Сообщение успешно отправлено!" });
  } catch (error) {
    console.error("КРИТИЧЕСКАЯ ОШИБКА:", error);
    return NextResponse.json(
      { success: false, error: "Произошла ошибка на сервере при отправке сообщения." },
      { status: 500 }
    );
  }
}
