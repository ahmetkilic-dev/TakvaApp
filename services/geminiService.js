
const API_KEY = 'AIzaSyCF8P9laxKwemZvE7GG5u6KGRjXVwny5G4';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export const askHoca = async (question) => {
    try {
        const response = await fetch(`${API_URL}?key=${API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {
                                text: `Sen Takva uygulamasının yardımcı yapay zeka asistanı "Hoca AI"sın. İslam dini, fıkıh, ibadetler ve ahlak konularında kullanıcılara samimi, kucaklayıcı, doğru ve kaynaklara dayalı bilgiler veriyorsun. Asla yargılayıcı olma. Kısa, öz ve anlaşılır cevaplar ver. Emoji kullanabilirsin. Soru: ${question}`
                            }
                        ]
                    }
                ]
            })
        });

        const data = await response.json();

        if (data.error) {
            console.error('Gemini API Error Detail:', JSON.stringify(data.error, null, 2));
            return `Hata: ${data.error.message || "Bilinmeyen bir hata oluştu."}`;
        }

        const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
        return answer || "Cevap anlaşılamadı.";

    } catch (error) {
        console.error('Network Error:', error);
        return "Bağlantı hatası oluştu. İnternetini kontrol edip tekrar dener misin?";
    }
};
