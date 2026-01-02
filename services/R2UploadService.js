/**
 * Cloudflare R2 Upload Logic
 * 
 * [GÜVENLİK UYARISI]: Kanka, bu anahtarların uygulama içinde durması risklidir. 
 * Birisi uygulamayı decompile ederse şifrelerini çalabilir. 
 * İleride bir 'Cloudflare Worker' kurup şifreleri orada saklamalıyız. 
 * Şimdilik sistemi ayağa kaldırmak için böyle yapıyoruz.
 */

const R2_CONFIG = {
    // Kanka senin Worker URL'i (Hem yükleme hem izleme için kullanacağız)
    // Çünkü R2'nin kendi 'public.r2.dev' domaininde SSL sorunları yaşanabiliyor.
    workerUrl: 'https://takva-uploader.dev-400.workers.dev',
};

export const R2UploadService = {
    async uploadFile(uri, fileName, contentType) {
        try {
            // 1. Dosyayı blob formatına çeviriyoruz
            const response = await fetch(uri);
            const blob = await response.blob();

            // 2. Worker üzerinden R2'ye PUT yapıyoruz
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 300000); // 5 dakika timeout

            const uploadResponse = await fetch(`${R2_CONFIG.workerUrl}/${fileName}`, {
                method: 'PUT',
                body: blob,
                headers: {
                    'Content-Type': contentType || 'video/mp4'
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                throw new Error(`Yükleme hatası (${uploadResponse.status}): ${errorText || 'Server bir hata döndürdü.'}`);
            }

            // 3. Videonun Worker üzerinden herkese açık URL'ini döndürüyoruz
            return `${R2_CONFIG.workerUrl}/${fileName}`;
        } catch (error) {
            if (error.name === 'AbortError') {
                throw new Error('Yükleme zaman aşımına uğradı (5 dakika). Lütfen internetinizi kontrol edin.');
            }
            // console.error('[R2] Critical Upload Error:', error);
            throw error;
        }
    }
};
