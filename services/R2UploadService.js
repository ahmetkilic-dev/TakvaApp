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
            console.log(`[R2] Starting upload: ${fileName}`);
            console.log(`[R2] Local URI: ${uri}`);

            // 1. Dosyayı blob formatına çeviriyoruz
            console.log(`[R2] Converting file to blob...`);
            const response = await fetch(uri);
            const blob = await response.blob();
            const sizeInMB = (blob.size / (1024 * 1024)).toFixed(2);
            console.log(`[R2] File converted. Size: ${sizeInMB} MB`);

            // 2. Worker üzerinden R2'ye PUT yapıyoruz
            console.log(`[R2] Sending PUT request to Worker...`);

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
            console.log(`[R2] Worker response received: ${uploadResponse.status}`);

            if (!uploadResponse.ok) {
                const errorText = await uploadResponse.text();
                console.error(`[R2] Server error details:`, errorText);
                throw new Error(`Yükleme hatası (${uploadResponse.status}): ${errorText || 'Server bir hata döndürdü.'}`);
            }

            console.log(`[R2] Upload successful: ${fileName}`);

            // 3. Videonun Worker üzerinden herkese açık URL'ini döndürüyoruz
            return `${R2_CONFIG.workerUrl}/${fileName}`;
        } catch (error) {
            if (error.name === 'AbortError') {
                console.error('[R2] Upload timed out after 5 minutes');
                throw new Error('Yükleme zaman aşımına uğradı (5 dakika). Lütfen internetinizi kontrol edin.');
            }
            console.error('[R2] Critical Upload Error:', error);
            throw error;
        }
    }
};
